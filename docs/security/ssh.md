---
title: SSH
---

# SSH (Secure Shell)

**Secure way to connect to remote computers. No passwords needed—use keys.**

---

## What It Is

- Client-server protocol (your computer ↔ remote server)
- Encrypted communication (unreadable if intercepted)
- Public key authentication (no passwords)

---

## Why SSH?

| Method | Security | Flexibility |
| -------- | ---------- | ------------- |
| **Telnet** | ❌ Plain text (passwords exposed) | Basic |
| **SSH** | ✅ Encrypted + key-based | Full control |
| **VPN** | ✅ Secure but broad | Entire network access |
| **RDP** | ✅ Secure but GUI only | Graphical only |

**SSH wins for:** Terminal access, automation, Git, servers

---

## How It Works

```bash
Your Computer (SSH Client)
    ↓
    [Encrypted Connection]
    ↓
Remote Server (SSH Server)
    ↓
    Authenticate with key pair
    ↓
    Access granted
```

---

## Key Concepts

### Public Key

- Share with everyone
- Used by servers to verify you
- Like a lock

### Private Key

- Keep SECRET
- Never share, never commit to code
- Like the key that opens the lock
- If leaked → regenerate immediately

---

## Basic Commands

### Connect to a server

```bash
ssh user@hostname
ssh user@192.168.1.100

# With custom port
ssh -p 2222 user@hostname

# With specific key
ssh -i ~/.ssh/my_key user@hostname
```

### Copy files (SCP)

```bash
# Local to remote
scp file.txt user@hostname:/path/

# Remote to local
scp user@hostname:/path/file.txt .
```

### Tunnel / Port Forward

```bash
# Forward local port 8000 to remote 3000
ssh -L 8000:localhost:3000 user@hostname
```

---

## SSH Config File

Location: `~/.ssh/config`

Simplify SSH commands:

```config
Host github
    Hostname github.com
    User git
    IdentityFile ~/.ssh/github_key
    IdentitiesOnly yes

Host myserver
    Hostname 192.168.1.100
    User ubuntu
    IdentityFile ~/.ssh/server_key
    Port 2222
```

Now use:

```bash
ssh github  # Instead of ssh -i ~/.ssh/github_key git@github.com
ssh myserver
```

---

## Security Rules 🚨

✅ **DO:**

- Generate strong keys (4096-bit RSA or Ed25519)
- Use passphrases for private keys
- Store keys in `~/.ssh/` with `chmod 600`
- Keep private key on your machine only
- Rotate keys periodically

❌ **DON'T:**

- Share private keys
- Commit private keys to Git
- Use default key names (makes you predictable)
- Leave passphrases blank (if key stolen, entire system compromised)
- Use key for multiple purposes

---

## Common Issues

### "Permission denied (publickey)"

```bash
# Check SSH agent running
ssh-add -l

# Add key to agent
ssh-add ~/.ssh/my_key

# Debug
ssh -v user@hostname  # Verbose output
```

### "Too many authentication failures"

```bash
# Reset with specific key
ssh -i ~/.ssh/my_key -o IdentitiesOnly=yes user@hostname
```

### Known hosts issues

```bash
# Clear specific host
ssh-keygen -R hostname

# Accept new host key
ssh-keyscan -t rsa hostname >> ~/.ssh/known_hosts
```

---

## SSH Agent (Remember Your Keys)

Avoid typing passphrase repeatedly:

```bash
# Start SSH agent
eval "$(ssh-agent -s)"

# Add key (will ask for passphrase once)
ssh-add ~/.ssh/my_key

# List loaded keys
ssh-add -l

# Remove key
ssh-add -d ~/.ssh/my_key

# Remove all keys
ssh-add -D
```

**On macOS/Linux:** Add to `~/.bashrc` or `~/.zshrc`:

```bash
eval "$(ssh-agent -s)" 2>/dev/null
ssh-add ~/.ssh/my_key 2>/dev/null
```

---

## Files & Permissions

```bash
# Directory permissions
chmod 700 ~/.ssh

# Private key permissions
chmod 600 ~/.ssh/id_rsa

# Public key permissions
chmod 644 ~/.ssh/id_rsa.pub

# Config permissions
chmod 600 ~/.ssh/config
```

---

## Verify SSH Setup

```bash
# Test GitHub connection
ssh -T git@github.com
# Output: Hi username! You've successfully authenticated...

# Test server connection
ssh -T user@hostname
```

---

## Key Algorithms

| Algorithm | Key Size | Speed | Security | Use |
| ----------- | ---------- | ------- | ---------- | ----- |
| **RSA** | 4096 | Slow | Good | Legacy (still fine) |
| **Ed25519** | 256 | Fast | Excellent | New standard |
| **ECDSA** | 256 | Medium | Good | Emerging |

**Recommendation:** Use Ed25519 for new keys.
