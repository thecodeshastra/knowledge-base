---
title: Linux
---

# Linux: The Operating System for Developers & Builders

**Free, open-source, runs everything from your laptop to cloud servers. Master it once, use it everywhere.**

---

## What It Is (Simple)

**Think of it as the universal building block of software infrastructure.**

- **Operating System:** Kernel + tools + packages + freedom
- **Created:** 1991 by Linus Torvalds (still maintained by global community)
- **Philosophy:** Free, open-source, user controls everything
- **Runs:** Laptops, servers, IoT devices, phones (Android), cloud infrastructure, embedded systems

**Why it matters for builders:**

- ✅ Free (no licensing costs)
- ✅ Open-source (see and modify anything)
- ✅ Runs your code the same way locally as in production
- ✅ Industry standard (AWS, Google Cloud, Azure all run Linux)
- ✅ Powerful command-line tools for automation
- ✅ Scales from Raspberry Pi to 10,000-server clusters

---

## Linux vs Windows vs macOS

| Aspect | Linux | Windows | macOS |
| -------- | ------- | ------- | ------- |
| **Cost** | Free | $150+ | Free (but expensive hardware) |
| **Open-Source** | ✅ (fully) | ❌ (proprietary) | ❌ (proprietary) |
| **Hardware** | Runs on anything | PCs only | Apple hardware only |
| **Customization** | Unlimited | Limited | Limited |
| **Command-line** | ⭐⭐⭐ (powerful) | ⭐⭐ (okay) | ⭐⭐ (Unix-based) |
| **Learning curve** | Steep for UI, easy for CLI | Moderate | Moderate |
| **For developers** | ⭐⭐⭐ (best) | ⭐⭐ (okay) | ⭐⭐ (good) |
| **For production** | ⭐⭐⭐ (industry std) | ⭐⭐ (enterprise) | ❌ (never) |
| **Security** | ⭐⭐⭐ (strong) | ⭐⭐ (targeted) | ⭐⭐ (good) |
| **AI/ML tools** | ✅ (CUDA, ROCm, PyTorch) | ✅ | ⭐ (limited) |

**Bottom line:**

- **Developer/builder?** → Linux (10x more productive)
- **Enterprise mixed?** → Windows (corporate standard)
- **Creative, ecosystem?** → macOS (good, not great for dev)
- **Production servers?** → Always Linux (99% of servers run it)

---

## Popular Linux Distributions (2026)

**Distribution = Linux kernel + package manager + tools + desktop (optional)**

### For Developers & Automation Engineers

| Distro | Best For | Learning Curve | Desktop | Server |
| -------- | ---------- | ----------------- | --------- | -------- |
| **Ubuntu 26.04 LTS** | Beginners, production | Easy | ⭐⭐⭐ | ⭐⭐⭐ |
| **Fedora 44** | Latest tools, AI/ML | Moderate | ⭐⭐⭐ | ⭐⭐ |
| **Debian 13** | Stability, servers | Moderate | ⭐⭐ | ⭐⭐⭐ |
| **Arch Linux** | Control freaks, learning | Hard | ⭐⭐⭐ | ⭐⭐ |
| **Pop!_OS 26** | Gaming, developers | Easy | ⭐⭐⭐ | ⭐ |

**My recommendation for automation engineers:**

1. **Learning:** Ubuntu 26.04 LTS (easiest entry point)
2. **Production:** Ubuntu LTS (10-year support) or Debian (maximum stability)
3. **Cutting-edge:** Fedora (latest CUDA, Python, AI tools)
4. **Total control:** Arch (but you'll rebuild your system at 3 AM)

---

## Core Linux Concepts

### 1. The Kernel

**The core.** Manages:

- CPU scheduling (which program gets to run)
- Memory management (RAM allocation)
- Process management (running programs)
- File systems (storage)
- Networking (TCP/IP stack)
- Device drivers (hardware access)

**You don't interact with the kernel directly.** It just works. But when things break, understanding the kernel helps.

### 2. File System Hierarchy

```text
/                    ← Root (top-level)
├── /home/           ← User files (your code, documents)
├── /var/            ← Logs, databases, runtime data
├── /etc/            ← Configuration files
├── /bin/            ← Essential commands
├── /usr/bin/        ← Installed programs
├── /opt/            ← Third-party software
├── /tmp/            ← Temporary files (deleted on reboot)
└── /root/           ← Root user's home (dangerous!)
```

**Important:**

- Everything is a file (even devices are files in `/dev`)
- Permissions matter (`rwx` = read/write/execute)
- `/etc` is where config files live (understand this for production debugging)

### 3. Users & Permissions

**Root = god** (can do anything, very dangerous)

```bash
# Check who you are
whoami

# Run command as root (dangerous!)
sudo command_name

# Check file permissions
ls -l filename
# Output: -rw-r--r-- 1 john john 1024 Jan 26 12:00 file.txt
#         ^permissions user group size   date         filename
```

**Permission format:** `rwxrwxrwx` (user / group / others)

- `r` = read (4)
- `w` = write (2)
- `x` = execute (1)

```bash
# Make script executable
chmod +x script.sh        # Symbol: add execute to all
chmod 755 script.sh       # Numeric: user=7, group=5, others=5

# Change ownership
chown john:john file.txt  # owner:group
```

**Golden rule:** Never log in as root. Use `sudo` when needed.

### 4. Package Manager

**Install software without Googling "download .exe".**

```bash
# Ubuntu / Debian (apt)
sudo apt update           # Refresh package list
sudo apt install python3  # Install package
sudo apt remove python3   # Uninstall

# Fedora (dnf)
sudo dnf install python3
sudo dnf remove python3

# Arch (pacman)
sudo pacman -S python
sudo pacman -R python
```

**Why it's better than Windows:**

- One command to install anything
- All updates in one place
- No malware (repos are curated)
- Dependencies auto-install

---

## Essential Linux Commands (You Need These)

### Navigation & Files

| Command | What It Does | Example |
| --------- | ----------- | --------- |
| `pwd` | Show current directory | `pwd` → `/home/john/projects` |
| `cd` | Change directory | `cd ~/projects`, `cd ..` (parent) |
| `ls` | List files | `ls -la` (detailed, including hidden) |
| `mkdir` | Create directory | `mkdir my_project` |
| `cp` | Copy file | `cp file.txt copy.txt` |
| `mv` | Move/rename file | `mv old.txt new.txt` |
| `rm` | Delete file | `rm file.txt`, `rm -r folder/` |
| `cat` | Show file contents | `cat config.txt` |
| `grep` | Search text | `grep "error" logfile.txt` |
| `find` | Find files | `find . -name "*.py"` |

**Real workflow:**

```bash
cd ~/projects                    # Go to projects folder
mkdir my_automation_agent        # Create new project
cd my_automation_agent
cp ~/templates/main.py .        # Copy template
cat main.py                      # View file
grep "TODO" main.py             # Find TODOs
```

### System & Processes

| Command | What It Does | Example |
| --------- | ----------- | --------- |
| `top` | Show running processes | `top` (then `q` to quit) |
| `ps` | List processes | `ps aux` (all processes) |
| `kill` | Stop a process | `kill 1234` (PID from ps) |
| `systemctl` | Manage services | `systemctl start nginx` |
| `journalctl` | View logs | `journalctl -u nginx -f` (follow) |
| `df` | Disk usage | `df -h` (human-readable) |
| `du` | Folder size | `du -sh folder/` |
| `free` | Memory usage | `free -h` |
| `uptime` | How long system running | `uptime` |

**Debugging workflow:**

```bash
systemctl status my_service      # Check service status
journalctl -u my_service -n 50   # Last 50 log lines
tail -f /var/log/app.log         # Follow log in real-time
top                              # See what's using CPU/RAM
```

### Text & Pipes

| Command | What It Does | Example |
| --------- | ----------- | --------- |
| `echo` | Print text | `echo "hello"` |
| `cat` | Show file | `cat file.txt` |
| `less` | View file (paginated) | `less bigfile.txt` (space to scroll) |
| `head` | First N lines | `head -n 10 file.txt` |
| `tail` | Last N lines | `tail -n 20 file.txt` |
| `sort` | Sort lines | `sort file.txt` |
| `uniq` | Remove duplicates | `sort file.txt \| uniq` |
| `wc` | Count lines/words | `wc -l file.txt` (line count) |

**Powerful piping (|):**

```bash
# Count error lines in log
cat app.log | grep "ERROR" | wc -l

# Find largest files
find . -type f -exec ls -lh {} \; | sort -k5 -hr | head -10

# Extract unique IPs from logs
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn
```

### Networking

| Command | What It Does | Example |
| --------- | ----------- | --------- |
| `ping` | Test connection | `ping google.com` |
| `curl` | Download/test URLs | `curl https://api.example.com` |
| `wget` | Download files | `wget https://example.com/file.zip` |
| `ssh` | Remote access | `ssh user@server.com` |
| `scp` | Copy files over SSH | `scp file.txt user@server.com:~/` |
| `ss` | Show sockets/ports | `ss -tlnp` (listening ports) |
| `netstat` | Network stats | `netstat -tlnp` |

**API testing:**

```bash
# Simple GET
curl https://api.example.com/users

# POST with JSON
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'

# Save response to file
curl https://api.example.com/data > response.json
```

---

## Advanced: Automation & Scripting

### Bash Scripts

**The default Linux shell. Master this.**

```bash
#!/bin/bash
# Simple automation script

echo "Starting backup..."

# Copy files
cp -r /home/user/documents /backup/documents_$(date +%Y%m%d)

# Check if command succeeded
if [ $? -eq 0 ]; then
    echo "✅ Backup completed"
    # Send notification
    curl -X POST https://slack.com/webhook -d "Backup done"
else
    echo "❌ Backup failed!"
    exit 1
fi
```

**Make it executable and run:**

```bash
chmod +x backup.sh
./backup.sh
```

### Cron Jobs (Scheduled Tasks)

**Run scripts on a schedule (like Task Scheduler on Windows).**

```bash
# Edit cron jobs
crontab -e

# Add line (runs every day at 2 AM)
0 2 * * * /home/user/backup.sh

# Format: minute hour day month weekday command
#         0-59  0-23  1-31 1-12  0-6(Sun-Sat)
```

**Common schedules:**

```bash
0 2 * * *        # Every day at 2 AM
*/15 * * * *     # Every 15 minutes
0 */6 * * *      # Every 6 hours
0 0 * * 0        # Every Sunday at midnight
0 9 1-5 * *      # Weekdays at 9 AM
```

### Systemd Services

**Run your app in the background, auto-restart on failure.**

**Create `/etc/systemd/system/my_app.service`:**

```ini
[Unit]
Description=My Automation Agent
After=network.target

[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/my_app
ExecStart=/usr/bin/python3 /opt/my_app/main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Use it:**

```bash
sudo systemctl daemon-reload
sudo systemctl enable my_app        # Start on boot
sudo systemctl start my_app         # Start now
sudo systemctl status my_app        # Check status
sudo journalctl -u my_app -f       # View logs
```

---

## Real-World Workflow for Automation Engineer

### 1. Local Development (Your Laptop)

```bash
# Setup project
git clone https://github.com/myorg/automation-agent.git
cd automation-agent

# Create isolated environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest tests/

# Run agent locally
python3 main.py --config config.local.yaml
```

### 2. Deploy to Server

```bash
# SSH into production server
ssh deploy@production.example.com

# Clone repo
git clone https://github.com/myorg/automation-agent.git /opt/my_agent
cd /opt/my_agent

# Setup (once)
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create service (above)
sudo cp my_app.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable my_agent
sudo systemctl start my_agent

# Check status
sudo systemctl status my_agent
sudo journalctl -u my_agent -f
```

### 3. Monitor & Debug

```bash
# Check if service is running
ps aux | grep main.py

# Monitor logs
tail -f /var/log/my_agent.log

# Check resource usage
top -p $(pgrep -f "python3 main.py")

# Kill if stuck
pkill -f "python3 main.py"

# Restart cleanly
sudo systemctl restart my_agent
```

---

## Quick Reference Cheat Sheet

```bash
# File operations
ls -la                          # List all files (detailed)
pwd                             # Current directory
cd ~/projects                   # Go to folder
mkdir new_folder                # Create folder
cp file.txt copy.txt           # Copy file
mv old.txt new.txt             # Rename file
rm file.txt                     # Delete file
cat file.txt                    # Show contents
grep "text" file.txt           # Search file

# System info
whoami                          # Current user
uname -a                        # System info
df -h                          # Disk usage
free -h                        # Memory usage
top                            # Process list (press q to quit)
ps aux | grep python           # Find python processes

# Networking
curl https://example.com       # HTTP request
ssh user@server.com            # Remote access
ping google.com                # Test connection
ss -tlnp                       # Show listening ports

# Permissions & ownership
chmod +x script.sh             # Make executable
chmod 755 file                 # Set permissions (rwx rx rx)
chown user:group file          # Change owner
sudo command                   # Run as root (careful!)

# Package manager (Ubuntu/Debian)
sudo apt update                # Update package list
sudo apt install package       # Install
sudo apt remove package        # Remove
apt search keyword             # Search packages

# Service management
systemctl status my_service    # Check service
systemctl start my_service     # Start service
systemctl restart my_service   # Restart
journalctl -u my_service -f    # View logs (follow)

# Useful shortcuts
Ctrl+C                         # Stop running command
Ctrl+Z                         # Suspend process
bg                             # Run in background
fg                             # Bring to foreground
history                        # Command history
!501                           # Run command 501 from history
```

---

## Resources

- [Linux Handbook](https://linuxhandbook.com)
- [Ubuntu Docs](https://ubuntu.com/tutorials)
- [Linux Command Reference](https://man7.org/linux/man-pages/)
- [ExplainShell](https://www.explainshell.com) (paste commands to understand)
- [OverTheWire Wargames](https://overthewire.org/wargames) (learn by hacking)
