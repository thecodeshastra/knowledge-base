---
title: XML Config
---

# XML

Full form - eXtensible Markup Language
**Structured, verbose, schema validation. Enterprise standard.**

---

## Syntax

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <app>MyApp</app>
    <version>1.0.0</version>
    <debug>true</debug>
    <port>8080</port>

    <database>
        <host>localhost</host>
        <port>5432</port>
        <name>mydb</name>
    </database>

    <features>
        <feature>auth</feature>
        <feature>logging</feature>
        <feature>cache</feature>
    </features>

    <!-- Comment -->
    <timeout>30</timeout>
</configuration>
```

---

## Attributes vs Elements

```xml
<!-- As attributes -->
<server host="localhost" port="8080" debug="true"/>

<!-- As elements -->
<server>
    <host>localhost</host>
    <port>8080</port>
    <debug>true</debug>
</server>
```

**Best practice:** Use elements (more structured, easier to parse).

---

## Special Features

### CDATA (for special characters)

```xml
<query>
    <![CDATA[
        SELECT * FROM users WHERE name = 'O'Brien'
    ]]>
</query>
```

### Namespaces (avoid unless required)

```xml
<config xmlns:db="http://example.com/database">
    <db:connection>localhost:5432</db:connection>
</config>
```

---

## Pros ✅

- Self-documenting
- Schema validation (XSD)
- Comments allowed
- Namespaces for organization
- Industry standard (enterprise)

---

## Cons ❌

- **Verbose** (much larger files)
- Slow to parse
- Complex syntax
- Not human-friendly
- Overkill for simple configs

---

## When to Use

- **Enterprise applications**
- **Legacy system integration**
- **Complex data + validation required**
- **SOAP web services**
- **When schema (XSD) is critical**

---

## Python Usage

```python
import xml.etree.ElementTree as ET

# Read
tree = ET.parse('config.xml')
root = tree.getroot()

# Access values
app = root.find('app').text
host = root.find('database/host').text

# Access attributes
port = root.find('server').get('port')

# Write
root = ET.Element('configuration')
ET.SubElement(root, 'app').text = 'MyApp'
ET.SubElement(root, 'port').text = '8080'

tree = ET.ElementTree(root)
tree.write('config.xml', encoding='utf-8', xml_declaration=True)
```

---

## Iterate Elements

```python
# Loop through features
for feature in root.findall('features/feature'):
    print(feature.text)

# Loop with attributes
for server in root.findall('server'):
    name = server.get('name')
    host = server.get('host')
    print(f"{name}: {host}")
```

---

## Common Mistakes

❌ **Missing XML declaration**

```xml
<configuration>
    ...
</configuration>
```

✅ **Always include declaration**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    ...
</configuration>
```

❌ **Forgetting to close tags**

```xml
<host>localhost
```

✅ **Always close tags**

```xml
<host>localhost</host>
```

---

## Validation (XSD)

```python
# Read with validation
from lxml import etree

schema = etree.XMLSchema(file='schema.xsd')
doc = etree.parse('config.xml')

if schema.validate(doc):
    print("Valid!")
else:
    print(schema.error_log)
```

---

## Tools

```bash
# Pretty print
xmllint --format config.xml

# Validate against schema
xmllint --schema schema.xsd config.xml

# Extract value
xmllint --xpath '//database/host/text()' config.xml
```

---

## Size Comparison

Same config in 3 formats:

**JSON (0.1 KB):** `{"host":"localhost","port":5432}`

**YAML (0.15 KB):**

```yaml
host: localhost
port: 5432
```

**XML (0.3 KB):**

```xml
<?xml version="1.0"?>
<config>
    <host>localhost</host>
    <port>5432</port>
</config>
```

**Verdict:** XML is 3x larger for same data.
