---
title: SSH Key Generation
---

# SSH Key Generation & Setup

**Step-by-step: Generate keys, add to GitHub, configure.**

---

## Step 1: Generate Key Pair

```bash
# Generate Ed25519 key (modern, recommended)
ssh-keygen -t ed25519 -C "your.email@example.com"

# OR RSA 4096 (if ed25519 not available)
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
```

**Prompts:**

```bash
Enter file in which to save the key: ~/.ssh/github_key
Enter passphrase (empty for no passphrase): [secure_passphrase]
Enter same passphrase again: [secure_passphrase]
```

**Result:**

- Private key: `~/.ssh/github_key`
- Public key: `~/.ssh/github_key.pub`

---

## Step 2: Copy Public Key to Clipboard

### Linux/macOS

```bash
cat ~/.ssh/github_key.pub | pbcopy
```

### Windows (Git Bash)

```bash
clip < ~/.ssh/github_key.pub
```

### Any OS

```bash
cat ~/.ssh/github_key.pub
# Then manually copy the output
```

---

## Step 3: Add Key to GitHub

1. Go to **GitHub → Settings → SSH and GPG keys**
2. Click **New SSH key**
3. **Title:** "My MacBook" (or whatever)
4. **Key type:** Authentication key
5. **Key:** Paste your public key
6. Click **Add SSH key**

Verify:

```bash
ssh -T git@github.com
# Output: Hi username! You've successfully authenticated...
```

---

## Step 4: Create SSH Config (Optional but Recommended)

Create `~/.ssh/config`:

```config
Host github
    Hostname github.com
    User git
    IdentityFile ~/.ssh/github_key
    IdentitiesOnly yes

Host gitlab
    Hostname gitlab.com
    User git
    IdentityFile ~/.ssh/gitlab_key
    IdentitiesOnly yes

Host myserver
    Hostname 192.168.1.100
    User ubuntu
    IdentityFile ~/.ssh/server_key
    Port 2222
```

Set permissions:

```bash
chmod 600 ~/.ssh/config
```

Now use:

```bash
git clone git@github:username/repo.git
```

---

## Step 5: Add Key to SSH Agent (Remember Passphrase)

Avoid typing passphrase repeatedly:

```bash
# Start agent (if not running)
eval "$(ssh-agent -s)"

# Add key
ssh-add ~/.ssh/github_key
# Asks for passphrase once

# Verify
ssh-add -l
```

**Permanent (add to shell startup):**

`~/.bashrc` or `~/.zshrc`:

```bash
# Start SSH agent automatically
if [ -z "$SSH_AUTH_SOCK" ]; then
  eval "$(ssh-agent -s)" > /dev/null
  ssh-add ~/.ssh/github_key 2>/dev/null
fi
```

---

## Step 6: Test Connection

```bash
# GitHub
ssh -T git@github.com

# GitLab
ssh -T git@gitlab.com

# Custom server
ssh ubuntu@myserver
```

---

## Multiple Keys (Advanced)

If you have multiple keys (GitHub, GitLab, server, etc.):

```bash
# Generate each key
ssh-keygen -t ed25519 -f ~/.ssh/github_key
ssh-keygen -t ed25519 -f ~/.ssh/gitlab_key
ssh-keygen -t ed25519 -f ~/.ssh/server_key
```

Add all to agent:

```bash
ssh-add ~/.ssh/github_key
ssh-add ~/.ssh/gitlab_key
ssh-add ~/.ssh/server_key

# List all
ssh-add -l
```

---

## Rotate Old Keys

When it's time to replace an old key:

```bash
# Generate new key
ssh-keygen -t ed25519 -f ~/.ssh/github_key_new

# Add new key to GitHub (GitHub → Settings → SSH keys)

# Remove old key from agent
ssh-add -d ~/.ssh/github_key_old

# Delete old key file
rm ~/.ssh/github_key_old*

# Update config to use new key
# ~/.ssh/config → IdentityFile ~/.ssh/github_key_new
```

---

## Backup Keys (Important!)

```bash
# Copy keys to secure location
cp -r ~/.ssh ~/backups/ssh_keys_backup_2026-01-26

# Encrypt backup (optional)
tar czf ssh_keys_backup.tar.gz ~/.ssh/
gpg --encrypt ssh_keys_backup.tar.gz
```

⚠️ **Never upload backups to cloud or public repos.**

---

## Common Issues

### "Permission denied (publickey)"

```bash
# 1. Check if key is added to agent
ssh-add -l

# 2. Add it
ssh-add ~/.ssh/github_key

# 3. Verify permissions (should be 600)
ls -la ~/.ssh/github_key
chmod 600 ~/.ssh/github_key

# 4. Debug
ssh -v git@github.com  # Verbose, shows what's happening
```

### "Too many authentication failures"

```bash
# Happens when SSH agent tries too many keys
# Force specific key
ssh -i ~/.ssh/github_key -o IdentitiesOnly=yes git@github.com
```

### "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!"

```bash
# Server key changed (might be legitimate)
ssh-keygen -R github.com

# Or manually edit
nano ~/.ssh/known_hosts  # Remove the line for github.com
```

---

## Security Checklist

- ✅ Private key permissions: `chmod 600`
- ✅ SSH dir permissions: `chmod 700`
- ✅ Use passphrase (not empty)
- ✅ Add to SSH agent (don't type passphrase every time)
- ✅ Don't commit keys to Git
- ✅ Rotate keys annually
- ✅ One key per service (best practice)

---

## Quick Commands Cheatsheet

```bash
# Generate key
ssh-keygen -t ed25519 -f ~/.ssh/my_key

# Copy to clipboard
cat ~/.ssh/my_key.pub | pbcopy

# Add to agent
ssh-add ~/.ssh/my_key

# List loaded keys
ssh-add -l

# Remove from agent
ssh-add -d ~/.ssh/my_key

# Test connection
ssh -T git@github.com

# Debug
ssh -v git@github.com
```
