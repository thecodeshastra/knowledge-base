---
title: Config Management
---

# Config Management

**Config files** = settings separate from code. Modify behavior without recompiling.

---

## Why It Matters

- ✅ Dev/test/prod different configs
- ✅ Change behavior instantly
- ✅ Store secrets separately
- ✅ Users can customize

---

## Three Main Formats

| Format | Best For | Speed | Size | Comments |
| -------- | ---------- | ------- | ------ | ---------- |
| **JSON** | APIs, web apps | Fast | Small | ❌ |
| **YAML** | Kubernetes, Docker, complex hierarchies | Medium | Medium | ✅ |
| **XML** | Enterprise, legacy, validation | Slow | Large | ✅ |

---

## Quick Decision

- **API configuration?** → JSON
- **Human-readable config?** → YAML
- **Enterprise/legacy?** → XML
- **Secrets?** → Use `.env` files (see below)

---

## Loading Config in Python

```python
# JSON
import json
with open('config.json') as f:
    config = json.load(f)

# YAML
import yaml
with open('config.yaml') as f:
    config = yaml.safe_load(f)

# ENV variables
import os
from dotenv import load_dotenv
load_dotenv()
db_host = os.getenv('DB_HOST')
```

---

## Best Practices

✅ **Commit structure, not secrets**

- Commit `config.example.json`
- Don't commit `config.json` with secrets
- Use `.env` for secrets

✅ **Validate on load**

```python
from pydantic import BaseSettings

class Settings(BaseSettings):
    database_url: str
    debug: bool = False
```

✅ **Environment-specific configs**

```bash
config/
├── default.yaml
├── development.yaml
├── testing.yaml
└── production.yaml
```

❌ **Don't store secrets in code**
❌ **Don't commit `.env` files**
❌ **Don't parse untrusted YAML** (security risk)

---

## Config Hierarchy (Recommended)

1. **Code defaults** (hardcoded sensible defaults)
2. **Config file** (user/environment specific)
3. **Environment variables** (override everything)

```python
# Example
config = {
    'debug': os.getenv('DEBUG', 'false').lower() == 'true',
    'port': int(os.getenv('PORT', 8080)),
    'db_url': os.getenv('DB_URL', 'sqlite:///app.db')
}
```

---

## See Also

- [JSON](./json.md)
- [YAML](./yaml.md)
- [XML](./xml.md)
