---
title: YAML Config
---

# YAML

Full form - YAML Ain't Markup Language
**Human-readable, comments allowed, complex hierarchies. Indentation-sensitive.**

Previously we had `.yml` extention but since 2006 official website recommendation suggested to use `.yaml` extension
The `.yml` extension was originally a workaround for the filename limit in older systems like MS-DOS and early Windows.

---

## Syntax

```yaml
app: MyApp
version: "1.0.0"
debug: true
port: 8080

database:
  host: localhost
  port: 5432
  name: mydb

features:
  - auth
  - logging
  - cache

# This is a comment
timeout: 30
```

**Data types:** string, number, boolean, null, array (lists), object (maps)

---

## Advanced Features

### Multi-line strings

```yaml
# Literal (preserves line breaks)
description: |
  Line 1
  Line 2
  Line 3

# Folded (becomes single line)
summary: >
  This is a very long string
  that spans multiple lines
  but becomes one line.
```

### Anchors & Aliases (DRY)

```yaml
defaults: &defaults
  timeout: 30
  retries: 3

production:
  <<: *defaults
  host: prod.example.com

development:
  <<: *defaults
  host: localhost
```

### Environment variables

```yaml
database_url: ${DATABASE_URL:-sqlite:///app.db}
api_key: ${API_KEY}  # Required, will error if not set
```

---

## Pros ✅

- Human-readable
- Comments supported
- Multi-line strings
- Anchors & aliases (DRY)
- Works with Docker/Kubernetes

---

## Cons ❌

- Indentation sensitive (2 or 4 spaces!)
- Slower to parse than JSON
- Edge cases can be confusing
- Security risk with untrusted input (use `yaml.safe_load`)

---

## When to Use

- **Docker Compose files**
- **Kubernetes manifests**
- **CI/CD pipelines** (GitHub Actions)
- **Configuration with documentation**
- **Complex hierarchical data**

---

## Python Usage

```python
import yaml

# Read (ALWAYS use safe_load)
with open('config.yaml') as f:
    config = yaml.safe_load(f)

# Write
config = {'host': 'localhost', 'port': 5432}
with open('config.yaml', 'w') as f:
    yaml.dump(config, f, default_flow_style=False)

# Access
host = config['database']['host']
```

---

## Common Mistakes

❌ **Using `yaml.load()` with untrusted input** (security risk)

```python
# WRONG
config = yaml.load(f)  # Can execute code!
```

✅ **Always use `yaml.safe_load()`**

```python
# RIGHT
config = yaml.safe_load(f)
```

❌ **Inconsistent indentation**

```yaml
database:
  host: localhost
    port: 5432  # ← Wrong! 4 spaces when parent is 2
```

✅ **Consistent 2-space indentation**

```yaml
database:
  host: localhost
  port: 5432
```

---

## Validation

```python
from pydantic import BaseModel

class Config(BaseModel):
    app: str
    port: int
    debug: bool = False

config = Config(**yaml.safe_load(f))
```

---

## Tools

```bash
# Pretty print / format
yq '.' config.yaml

# Query values
yq '.database.host' config.yaml

# Lint YAML
yamllint config.yaml

# Validate
python -c "import yaml; yaml.safe_load(open('config.yaml'))"
```

---

## YAML vs JSON Example

**Same config, different formats:**

YAML (readable):

```yaml
database:
  host: localhost
  port: 5432
```

JSON (compact):

```json
{
  "database": {
    "host": "localhost",
    "port": 5432
  }
}
```

Both load to same Python dict.
