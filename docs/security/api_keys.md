---
title: API Keys
---

# API Keys

**Digital credentials to authenticate requests. Different from SSH keys.**

---

## What They Are

- Digital tokens that prove who you are to a service
- Every request to an API includes the key
- Each key is unique to your account/project

---

## How They Work

Request to API:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.example.com/data
```

Or in code:

```python
import requests

headers = {"Authorization": f"Bearer {api_key}"}
response = requests.get("https://api.example.com/data", headers=headers)
```

---

## Difference: API Keys vs SSH Keys

| Feature | SSH Key | API Key |
| --------- | --------- | --------- |
| **Purpose** | SSH connections, Git | HTTP API requests |
| **Transport** | TCP connection | HTTP header/query |
| **Typical use** | `ssh user@host` | `curl -H "Auth: key"` |
| **Rotation** | Occasionally | Frequently |
| **Services** | GitHub, servers | Stripe, OpenAI, AWS |

---

## Where to Get API Keys

### GitHub

```bash
# Personal access token
# GitHub → Settings → Developer settings → Personal access tokens
# Scopes: repo, read:user, delete:repo (be specific)
```

### Stripe

```bash
# Dashboard → Developers → API keys
# Publishable key (public) + Secret key (keep private)
```

### OpenAI

```bash
# https://platform.openai.com/account/api-keys
# Create new secret key
```

---

## Best Practices 🚨

✅ **DO:**

- Store in environment variables (`.env` file)
- Rotate keys periodically (monthly/quarterly)
- Use specific scopes (don't request all permissions)
- Create keys per environment (dev/staging/prod)
- Revoke unused keys immediately
- Use short-lived tokens when possible

❌ **DON'T:**

- Commit keys to Git
- Share keys via Slack/email
- Use one key for all services
- Store in plain text
- Use keys with overly broad permissions
- Keep old/unused keys active

---

## Store API Keys Safely

### Environment Variables (.env file)

`.env` (don't commit):

```env
STRIPE_SECRET_KEY=sk_live_xxxxx
OPENAI_API_KEY=sk-xxxxx
GITHUB_TOKEN=ghp_xxxxx
```

Python code:

```python
import os
from dotenv import load_dotenv

load_dotenv()

stripe_key = os.getenv("STRIPE_SECRET_KEY")
openai_key = os.getenv("OPENAI_API_KEY")

# Never:
# stripe_key = "sk_live_xxxxx"  # ❌ DON'T DO THIS
```

### .gitignore

```gitignore
.env
.env.local
.env.*.local
secrets/
*.key
```

---

## Rotate Keys

When to rotate:

- Key exposed (leaked to Git, Slack, etc.)
- Team member leaves
- Regular schedule (quarterly)

How to rotate:

1. Create new key in dashboard
2. Update environment variable
3. Test that everything works
4. Revoke old key in dashboard
5. Wait a few hours, verify no failures
6. Delete old key permanently

---

## Handle API Key Errors

```python
import requests

try:
    response = requests.get(
        "https://api.example.com/data",
        headers={"Authorization": f"Bearer {api_key}"}
    )
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 401:
        print("Invalid API key")
    elif e.response.status_code == 403:
        print("Insufficient permissions")
    elif e.response.status_code == 429:
        print("Rate limited")
```

---

## API Key Scopes (Least Privilege)

Always request minimum permissions:

```markdown
✅ Good:
  - Stripe: "write:charges" only

✅ Good:
  - GitHub: "repo" (not "admin:repo_hook")

✅ Good:
  - AWS: Limited IAM policy with specific actions

❌ Bad:
  - "admin" for everything
  - "write:all" when you only need read
  - "super_admin" if not necessary
```

---

## Detect Leaked Keys

Check if your key was exposed:

```bash
# GitHub token leaked
git log -p --all | grep "ghp_"

# Stripe key leaked
grep -r "sk_live_" .

# General secrets scanner
pip install detect-secrets
detect-secrets scan --baseline .secrets.baseline
```

**If key leaked:**

1. Revoke immediately in dashboard
2. Search code history for usage
3. Check API logs for unauthorized access
4. Create new key
5. Rotate in environment

---

## Rate Limiting with API Keys

Most APIs limit requests per key:

```python
import time
import requests
from functools import wraps

def rate_limit(calls_per_minute=60):
    min_interval = 60 / calls_per_minute
    
    def decorator(func):
        last_call = [0]
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_call[0]
            wait = min_interval - elapsed
            if wait > 0:
                time.sleep(wait)
            result = func(*args, **kwargs)
            last_call[0] = time.time()
            return result
        return wrapper
    return decorator

@rate_limit(calls_per_minute=60)
def api_call(endpoint):
    return requests.get(endpoint)
```

---

## Multi-Environment Keys

Setup:

```bash
config/
├── .env.development    (local test keys)
├── .env.staging        (staging keys)
├── .env.production     (production keys - never commit)
└── .env.example        (template, commit this)
```

Load based on environment:

```python
import os
from dotenv import load_dotenv

env = os.getenv("ENVIRONMENT", "development")
load_dotenv(f".env.{env}")

api_key = os.getenv("API_KEY")
```

---

## Monitoring API Key Usage

Track usage in most services:

```bash
# GitHub
# Settings → Developer settings → Personal access tokens → See tokens

# Stripe
# Dashboard → Developers → API activity

# AWS
# IAM → Users → [user] → Access Advisor

# Google Cloud
# APIs & Services → Credentials → See API usage
```

Delete unused keys found.

---

## Common Mistakes

❌ **Hardcoding keys:**

```python
# WRONG
response = requests.get(url, headers={"key": "sk_live_xxxxx"})
```

✅ **Use environment:**

```python
# RIGHT
api_key = os.getenv("STRIPE_KEY")
response = requests.get(url, headers={"key": api_key})
```

❌ **One key for everything:**

```bash
# WRONG - if this key leaks, everything is exposed
UNIVERSAL_API_KEY=xxxx
```

✅ **Separate keys:**

```bash
STRIPE_KEY=xxxx
OPENAI_KEY=yyyy
GITHUB_TOKEN=zzzz
```

---

## Quick Checklist

- ✅ Keys in `.env`, not in code
- ✅ `.env` in `.gitignore`
- ✅ Different keys per environment
- ✅ Minimum required permissions
- ✅ Rotation schedule set
- ✅ Monitoring enabled
- ✅ Leaked keys revoked immediately
