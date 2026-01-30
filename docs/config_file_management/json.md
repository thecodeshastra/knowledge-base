---
title: JSON Config
---

# JSON

Full form - JavaScript Object Notation
**Lightweight, fast, web standard. NO comments.**

---

## Syntax

```json
{
  "app": "MyApp",
  "version": "1.0.0",
  "debug": true,
  "port": 8080,
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "mydb"
  },
  "features": ["auth", "logging", "cache"],
  "timeout": null
}
```

###

#### Data types

```json
{
  "string": "Hello World",
  "number": 42,
  "float": 3.14,
  "boolean": true,
  "null_value": null,
  "array": [1, 2, 3],
  "object": {"key": "value"}
}
```

---

## Pros ✅

- Fast parsing
- Wide language support
- No comments (sometimes good, sometimes bad)
- Small file size
- Web API standard

---

## Cons ❌

- NO comments allowed
- NO multi-line strings
- NO trailing commas (breaks)
- Strict syntax

---

## When to Use

- **API configs**
- **package.json, tsconfig.json**
- **Simple, flat data**
- **Mobile apps** (size matters)
- **Web applications**

---

## Python Usage

```python
import json

# Read
with open('config.json') as f:
    config = json.load(f)

# Write
config = {'host': 'localhost', 'port': 8080}
with open('config.json', 'w') as f:
    json.dump(config, f, indent=2)

# Access
port = config['database']['port']
```

---

## Common Mistake

❌ **Trailing commas break JSON:**

```json
{
  "key": "value",  // ← Will break parser
}
```

✅ **Remove trailing commas:**

```json
{
  "key": "value"
}
```

---

## Validation

```python
from pydantic import BaseModel

class Config(BaseModel):
    host: str
    port: int
    debug: bool = False

# This will validate on load
config = Config(**json.load(f))
```

---

## Tools

```bash
# Pretty print
jq '.' config.json

# Query values
jq '.database.host' config.json

# Validate
python -m json.tool config.json
```
