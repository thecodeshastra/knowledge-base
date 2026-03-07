---
sidebar_position: 2
---

# Bash & Linux Cheat Sheet

## Linux: The Operating System for Developers & Builders

**Free, open-source, runs everything from your laptop to cloud servers. Master it once, use it everywhere.**

---

### What It Is (Simple)

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

### Navigation & File System

| Command  | Explanation                 |
| -------- | --------------------------- |
| `pwd`    | Print current directory     |
| `ls`     | List directory contents     |
| `ls -la` | List all files with details |
| `ls -lh` | Human readable sizes        |
| `cd dir` | Change directory            |
| `cd ..`  | Move one directory up       |
| `cd ~`   | Go to home directory        |
| `cd -`   | Go to previous directory    |
| `tree`   | Show directory structure    |

---

### File & Directory Operations

| Command           | Explanation               |
| ----------------- | ------------------------- |
| `touch file`      | Create empty file         |
| `mkdir dir`       | Create directory          |
| `mkdir -p a/b/c`  | Create nested directories |
| `cp file1 file2`  | Copy file                 |
| `cp -r dir1 dir2` | Copy directory            |
| `mv old new`      | Move or rename file       |
| `rm file`         | Delete file               |
| `rm -r dir`       | Delete directory          |
| `rm -rf dir`      | Force delete directory    |

---

### Viewing Files

| Command           | Explanation               |
| ----------------- | ------------------------- |
| `cat file`        | Print file contents       |
| `less file`       | Scrollable viewer         |
| `head file`       | First 10 lines            |
| `head -n 50 file` | First 50 lines            |
| `tail file`       | Last 10 lines             |
| `tail -f log`     | Follow log updates        |
| `wc file`         | Count lines, words, bytes |

---

### Searching Files & Content

#### grep (search inside files)

| Command               | Explanation             |
| --------------------- | ----------------------- |
| `grep "text" file`    | Search text             |
| `grep -i "text" file` | Case insensitive search |
| `grep -n "text" file` | Show line numbers       |
| `grep -c "text" file` | Count matches           |
| `grep -r "text" .`    | Recursive search        |

Example:

```bash
grep -i "error" app.log
```

---

#### find (search files)

| Command                                                | Explanation                |
| ------------------------------------------------------ | -------------------------- |
| `find . -name "*.log"`                                 | Find log files             |
| `find /path -type f`                                   | Find files                 |
| `find /path -type d`                                   | Find directories           |
| `find /logs -mtime -1`                                 | Modified in last 24 hours  |
| `find /logs -size +100M`                               | Files larger than 100MB    |
| `find /logs -name "*.log" -exec grep -l "ERROR" {} \;` | Find logs containing ERROR |

These **log-analysis commands are heavily used in DevOps troubleshooting**.

---

### Text Processing (Core Automation Tools)

| Command            | Explanation       |
| ------------------ | ----------------- |
| `sort file`        | Sort lines        |
| `uniq`             | Remove duplicates |
| `cut -d',' -f1`    | Extract column    |
| `awk '{print $1}'` | Print column      |
| `sed 's/a/b/g'`    | Replace text      |

Example pipeline:

```bash
cat logs.txt | grep ERROR | sort | uniq
```

---

### File Permissions (IMPORTANT)

Linux permissions follow:

```bash
rwx rwx rwx
│   │   │
│   │   └── others
│   └────── group
└────────── owner
```

Each permission has numeric values:

| Permission | Value |
| ---------- | ----- |
| Read       | 4     |
| Write      | 2     |
| Execute    | 1     |

Example combinations:

| Command              | Meaning                         |
| -------------------- | ------------------------------- |
| `chmod 755 file`     | Owner full, others read+execute |
| `chmod 644 file`     | Owner read/write, others read   |
| `chmod 700 file`     | Owner full access only          |
| `chmod +x script.sh` | Make script executable          |

Example:

```bash
chmod +x deploy.sh
```

Ownership:

| Command                 | Explanation            |
| ----------------------- | ---------------------- |
| `chown user file`       | Change owner           |
| `chown user:group file` | Change owner and group |
| `chgrp group file`      | Change group           |

The permission structure **rwx rwx rwx** is shown in the Linux cheatsheet document as the standard format.

---

### Compression & Archiving

#### tar (most common)

| Command                        | Explanation        |
| ------------------------------ | ------------------ |
| `tar -cvf archive.tar dir`     | Create archive     |
| `tar -xvf archive.tar`         | Extract archive    |
| `tar -czvf archive.tar.gz dir` | Compress archive   |
| `tar -xzvf archive.tar.gz`     | Extract compressed |

---

#### zip

| Command                | Explanation |
| ---------------------- | ----------- |
| `zip archive.zip file` | Create zip  |
| `unzip archive.zip`    | Extract zip |

---

#### rar (optional)

| Command                  | Explanation |
| ------------------------ | ----------- |
| `rar a archive.rar file` | Create rar  |
| `rar x archive.rar`      | Extract rar |

---

### Process Management

| Command       | Explanation               |
| ------------- | ------------------------- |
| `ps`          | Show processes            |
| `ps aux`      | Detailed process list     |
| `top`         | Real-time process monitor |
| `htop`        | Advanced monitor          |
| `kill PID`    | Terminate process         |
| `kill -9 PID` | Force kill                |

---

### Disk & System Monitoring

| Command      | Explanation    |
| ------------ | -------------- |
| `df -h`      | Disk space     |
| `du -sh dir` | Directory size |
| `free -h`    | Memory usage   |
| `uptime`     | System uptime  |
| `lsblk`      | Show disks     |

---

### Networking

| Command         | Explanation        |
| --------------- | ------------------ |
| `ping host`     | Test connectivity  |
| `curl url`      | Send HTTP request  |
| `wget url`      | Download file      |
| `netstat -tuln` | Show open ports    |
| `ss -tuln`      | Modern port viewer |

---

### Piping & Redirection (Power Feature)

| Symbol | Meaning                  |             |
| ------ | ------------------------ | ----------- |
| `      | `                        | Pipe output |
| `>`    | Redirect output          |             |
| `>>`   | Append output            |             |
| `2>`   | Redirect error           |             |
| `&>`   | Redirect stdout + stderr |             |

Example:

```bash
grep ERROR app.log | sort | uniq > errors.txt
```

---

### Command Chaining

| Operator       | Meaning                   |       |                        |
| -------------- | ------------------------- | ----- | ---------------------- |
| `cmd1 && cmd2` | Run cmd2 if cmd1 succeeds |       |                        |
| `cmd1          |                           | cmd2` | Run cmd2 if cmd1 fails |
| `cmd1 ; cmd2`  | Run both                  |       |                        |

---

### History & Productivity

| Command       | Explanation          |
| ------------- | -------------------- |
| `history`     | Show command history |
| `!!`          | Repeat last command  |
| `!n`          | Run command number   |
| `Ctrl + R`    | Search history       |
| `clear`       | Clear terminal       |
| `man command` | Show manual          |

---

## Introduction to Bash Scripting

**Bash scripting** is a powerful way to automate tasks on Linux and Unix-like systems using the Bash shell. It involves writing sequences of commands in a plain text file (a script) that can be executed by the Bash shell.

### Why Use Bash Scripts?

- **Automation** of repetitive tasks
- **System administration** and maintenance
- **Complex workflow** management
- **Direct OS interaction** - commands interact directly with the operating system
- **Versatile and powerful** - combine multiple system tools seamlessly

### Key Concepts

- **Variables** - Store and manipulate data
- **Conditionals** - Make decisions in your scripts
- **Loops** - Repeat operations efficiently
- **Functions** - Create reusable code blocks
- **Script arguments** - Accept input parameters
- **File format** - Scripts are saved with `.sh` extension
- **Execution** - Make executable with `chmod +x` and run with `./script.sh`

### Creating & Running Bash Scripts

Create script

```bash
touch script.sh
```

Shebang (define interpreter)

```bash
#!/bin/bash
```

Make executable

```bash
chmod +x script.sh
```

Run script

```bash
./script.sh
```

Run without executable

```bash
bash script.sh
```

---

### Basic Script Template

```bash
#!/bin/bash

set -e
set -u
set -o pipefail

echo "Starting script..."

DATE=$(date)

echo "Current date: $DATE"
```

Recommended safety options:

| Option            | Meaning                    |
| ----------------- | -------------------------- |
| `set -e`          | Exit on error              |
| `set -u`          | Fail if variable undefined |
| `set -o pipefail` | Catch pipe failures        |

These make scripts **much safer in production**.

---

### Variables

Declare variable

```bash
NAME="Mahendra"
```

Use variable

```bash
echo "$NAME"
```

Command output into variable

```bash
DATE=$(date)
FILES=$(ls)
```

Best practices

```bash
UPPERCASE for constants
Quote variables "$VAR"
Define variables at top
```

---

### Script Arguments

Access script parameters

```bash
./script.sh file1.txt
```

Inside script:

```bash
$0 → script name
$1 → first argument
$2 → second argument
$# → number of arguments
$@ → all arguments
```

Example:

```bash
FILE=$1
echo "Processing $FILE"
```

---

### Arrays

Create array

```bash
ERRORS=("ERROR" "CRITICAL" "FATAL")
```

Access elements

```bash
${ERRORS[0]}
${ERRORS[@]}
```

Loop array

```bash
for e in "${ERRORS[@]}"
do
 echo "$e"
done
```

---

### Conditionals

Basic syntax

```bash
if [ condition ]; then
  command
fi
```

Example

```bash
if [ -f file.txt ]; then
  echo "File exists"
fi
```

Common comparisons

| Operator | Meaning          |
| -------- | ---------------- |
| `-eq`    | equal            |
| `-ne`    | not equal        |
| `-gt`    | greater          |
| `-lt`    | less             |
| `-ge`    | greater or equal |
| `-le`    | less or equal    |

String comparison

```bash
if [ "$VAR" = "value" ]
```

---

### Loops

#### For Loop

```bash
for file in *.log
do
  echo "$file"
done
```

#### While Loop

```bash
while read line
do
 echo "$line"
done < file.txt
```

---

### Functions

Define function

```bash
check_logs() {
  echo "Checking logs..."
}
```

Call function

```bash
check_logs
```

---

### File Tests

| Test | Meaning          |
| ---- | ---------------- |
| `-f` | file exists      |
| `-d` | directory exists |
| `-s` | file not empty   |
| `-x` | executable       |
| `-r` | readable         |
| `-w` | writable         |

Example

```bash
if [ -d /var/log ]; then
  echo "Directory exists"
fi
```

---

### Logging Output

Print message

```bash
echo "Script started"
```

Write to file

```bash
echo "log message" >> log.txt
```

Redirect errors

```bash
command 2> error.log
```

Redirect all output

```bash
command > output.log 2>&1
```

---

### Debugging Scripts

Enable debug mode

```bash
set -x
```

Disable debug

```bash
set +x
```

Run debug

```bash
bash -x script.sh
```

---

### Scheduling Scripts (Automation)

Cron job format

```bash
* * * * * command
│ │ │ │ │
│ │ │ │ └ day of week
│ │ │ └ month
│ │ └ day
│ └ hour
└ minute
```

Example

```bash
0 2 * * * /scripts/backup.sh
```

Run script every day at **2 AM**.

---

### Useful Bash Built-ins

| Command       | Explanation              |
| ------------- | ------------------------ |
| `read`        | read user input          |
| `echo`        | print output             |
| `exit`        | exit script              |
| `source file` | run script in same shell |
| `export VAR`  | environment variable     |

---

### Error Handling Pattern

Production scripts should handle errors.

Example:

```bash
if ! command; then
  echo "Command failed"
  exit 1
fi
```

---

## Real World Script Example

### Log Monitoring Script

```bash
#!/bin/bash

LOG_DIR="/var/log"
REPORT="error_report.txt"
ERROR_PATTERNS=("ERROR" "CRITICAL" "FATAL")

echo "Starting log analysis..." > "$REPORT"

LOG_FILES=$(find "$LOG_DIR" -name "*.log")

for FILE in $LOG_FILES
do
  echo "Checking $FILE"

  for PATTERN in "${ERROR_PATTERNS[@]}"
  do
    COUNT=$(grep -c "$PATTERN" "$FILE")

    if [ "$COUNT" -gt 0 ]; then
      echo "$FILE contains $COUNT $PATTERN entries" >> "$REPORT"
    fi
  done
done

echo "Analysis complete. Report saved to $REPORT"
```

---

### Mental Model of Bash Automation

Most scripts follow this flow:

```bash
INPUT
   ↓
FIND FILES
   ↓
FILTER (grep)
   ↓
PROCESS (loops)
   ↓
CONDITIONS
   ↓
REPORT / ACTION
```
