---
title: Bash
---

# Bash

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

---

## Script Creation & Execution

```bash
#!/bin/bash                    # Shebang line (must be first line)
chmod +x script.sh             # Make executable
./script.sh                    # Run script
bash script.sh                 # Alternative run method
sh script.sh                   # Run with sh shell

```

## Variables & Input/Output

```bash
name="Alice"                   # Variable assignment (no spaces around =)
echo "Hello $name"             # Variable reference with $
echo "Hello ${name}"           # Variable reference with braces
read -p "Enter name: " user    # Read user input with prompt
export VAR="value"             # Environment variable
readonly CONST="unchangeable"  # Read-only variable

```

**Command Substitution:**

```bash
files=`ls /tmp`                # Backticks (old style)
files=$(ls /tmp)               # Dollar-parentheses (preferred)
current_dir=$(pwd)             # Store command output
date_str=$(date +%Y-%m-%d)     # Formatted date

```

## File & Directory Operations

```bash
# Navigation & Listing
cd /path/to/dir                # Change directory
cd ..                          # Move up one directory
cd -                           # Move to previous directory
cd ~                           # Go to home directory
pwd                            # Current working directory
ls -al                         # List with details and hidden files
ls -R                          # Recursive listing

# File Operations
touch filename.txt             # Create empty file
cp source dest                 # Copy file
cp -r dir1 dir2               # Copy directory recursively
cp -a dir_name/. path/to/other/dir/  # Copy contents of directory
mv oldname newname            # Move/rename file
rm filename                   # Remove file
rm -r directory               # Remove directory recursively
rm -rf directory              # Remove directory recursively (force)
mkdir dirname                 # Create directory
mkdir -p path/to/nested/dir   # Create nested directories
rmdir dirname                 # Remove empty directory

# File Content Operations
cat filename                  # Display file content
head filename                 # First 10 lines
head -n 5 filename            # First 5 lines
tail filename                 # Last 10 lines
tail -f filename              # Follow file changes (live)
more filename                 # Page through file
less filename                 # Page through file (better than more)
wc filename                   # Word, line, character count
wc -l filename                # Line count only
grep "pattern" filename       # Search in file
grep -r "pattern" directory   # Recursive search
cut -f1 -d"," file.csv       # Extract first field from CSV
cut -c1-3,5-7,9-12 phones.txt # Extract specific character positions
sort filename                 # Sort file contents
sort -r filename              # Reverse sort
sort -n numbers.txt           # Numeric sort
basename /path/file.ext .ext  # Get filename without path/extension
find . -name "*.txt"          # Find files by name
locate filename               # Locate files in database

```

## Conditionals & Tests

```bash
# Basic If Statement
if [ "$var" = "value" ]; then
    echo "Match found"
elif [ "$var" = "other" ]; then
    echo "Other match"
else
    echo "No match"
fi

# Advanced Test with [[]]
if [[ "$var" =~ ^[0-9]+$ ]]; then
    echo "Variable contains only numbers"
fi

# Test Command (equivalent to [ ])
if test "$a" -eq "$b"; then
    echo "Equal numbers"
fi

# One-liner conditional
[ -f "file.txt" ] && echo "File exists" || echo "File not found"

```

**Common Test Operators:**

| File Tests | String Tests | Numeric Tests |
| --- | --- | --- |
| `-e file` - exists | `-z string` - empty | `-eq` - equal |
| `-f file` - regular file | `-n string` - not empty | `-ne` - not equal |
| `-d file` - directory | `str1 = str2` - equal | `-gt` - greater than |
| `-r file` - readable | `str1 != str2` - not equal | `-lt` - less than |
| `-w file` - writable | `str1 < str2` - less than | `-ge` - greater/equal |
| `-x file` - executable | `str1 > str2` - greater than | `-le` - less/equal |
| `-s file` - size > 0 | | |

## Loops

```bash
# While Loop
count=1
while [ $count -le 5 ]; do
    echo "Count: $count"
    count=$((count+1))
done

# Until Loop (opposite of while)
until [ $count -gt 5 ]; do
    echo "Count: $count"
    ((count++))
done

# For Loop (file list)
for file in *.txt; do
    echo "Processing $file"
done

# For Loop (sequence)
for i in {1..5}; do
    echo "Number: $i"
done

# For Loop (step sequence)
for i in {0..10..2}; do
    echo "Even: $i"
done

# For Loop (C-style)
for (( i=1; i<=5; i++ )); do
    echo "Iteration $i"
done

# For Loop (array)
arr=("apple" "banana" "cherry")
for fruit in "${arr[@]}"; do
    echo "Fruit: $fruit"
done

# Loop control
for i in {1..10}; do
    if [ $i -eq 5 ]; then
        continue                   # Skip iteration
    fi
    if [ $i -eq 8 ]; then
        break                      # Exit loop
    fi
    echo $i
done

```

## Functions

```bash
# Simple Function
greet() {
    echo "Hello $1"              # $1 is first argument
    echo "Hello $2"              # $2 is second argument
}

# Function with return value
calculate() {
    local num1=$1
    local num2=$2
    local result=$((num1 + num2))
    echo $result                 # Return via echo
}

# Function with local variables
my_function() {
    local var="local value"      # Local scope
    global_var="global value"    # Global scope
    return 0                     # Return status (0-255)
}

# Function calls
greet "World" "Universe"
result=$(calculate 5 3)
my_function
echo "Result: $result"
echo "Status: $?"               # Last function's return status

```

## Script Arguments & Special Variables

```bash
# Script arguments
$0                            # Script name
$1, $2, $3                    # First, second, third arguments
$@                            # All arguments as array
"$@"                          # All arguments properly quoted
$*                            # All arguments as single string
$#                            # Number of arguments

# Process variables
$$                            # Process ID of current script
$!                            # Process ID of last background job
$?                            # Exit status of last command

# Example usage
if [ $# -eq 0 ]; then
    echo "Usage: $0 <argument1> <argument2>"
    exit 1
fi

echo "Script: $0"
echo "First arg: $1"
echo "All args: $@"
echo "Arg count: $#"

```

## Streams & Re-directions

```bash
# Output redirection
command > file                # Redirect stdout (overwrite)
command >> file               # Redirect stdout (append)
command 2> file               # Redirect stderr to file
command 2>&1                  # Redirect stderr to stdout
command &> file               # Redirect both stdout and stderr
command > /dev/null 2>&1      # Silent execution

# Input redirection
command < file                # Redirect stdin from file
command <<< "string"          # Here string
command << EOF                # Here document
line 1
line 2
EOF

# Pipes
command1 | command2           # Pipe output to input
ls -l | grep "txt" | wc -l    # Chain multiple commands
tee file                      # Write to file AND stdout
command | tee output.log      # Save output and display

```

## Process Management

```bash
# Process information
ps                            # Show current processes
ps aux                        # Show all processes (BSD style)
ps -ef                        # Show all processes (System V style)
ps -C process_name            # Show specific process
ps -u username                # Show processes by user
top                           # Real-time process monitor
htop                          # Enhanced process monitor (if available)

# Job control
jobs                          # Show current jobs
bg                            # Send job to background
fg                            # Bring job to foreground
fg %1                         # Bring job 1 to foreground
nohup command &               # Run immune to hangups
disown %1                     # Remove job from shell's job table

# Process termination
kill PID                      # Terminate process by PID (SIGTERM)
kill -9 PID                   # Force kill (SIGKILL)
kill %1                       # Terminate job 1
killall process_name          # Kill all processes by name
pkill pattern                 # Kill processes matching pattern

```

## Globbing & Patterns

```bash
# Wildcards
*                             # Match any characters
?                             # Match single character
[abc]                         # Match any character in set
[a-z]                         # Match any character in range
[A-Z]                         # Match uppercase letters
[0-9]                         # Match digits
[!abc]                        # Match any character NOT in set
[^abc]                        # Alternative negation syntax

# Brace expansion
{file1,file2,file3}           # Expand to multiple items
{1..10}                       # Numeric range
{a..z}                        # Character range
{01..10}                      # Zero-padded numbers
file{.txt,.log,.bak}          # Multiple extensions

# Examples
ls *.txt                      # All .txt files
cp file?.txt backup/          # file1.txt, file2.txt, etc.
rm temp[0-9].log             # temp0.log, temp1.log, etc.
echo {1..5}                   # 1 2 3 4 5

```

## System Information & Network

```bash
# User & system info
id                            # Current user information
whoami                        # Current username
who                           # Logged in users
w                             # Detailed user information
hostname                      # System hostname
uname -a                      # Complete system information
uname -r                      # Kernel version
uptime                        # System uptime and load

# Resource monitoring
free -h                       # Memory usage (human readable)
df -h                         # Disk usage by filesystem
du -h directory               # Directory size
du -sh *                      # Size of current directory contents
lscpu                         # CPU information

# Network
ping hostname                 # Test network connectivity
ping -c 4 hostname            # Ping 4 times only
wget URL                      # Download file from web
wget -O filename URL          # Download with specific filename
curl URL                      # Transfer data from/to server
curl -o filename URL          # Save to file
netstat -tuln                 # Show network connections

```

## File Permissions & Ownership

```bash
# Permission modification
chmod +r file                 # Add read permission
chmod +w file                 # Add write permission
chmod +x file                 # Add execute permission
chmod -x file                 # Remove execute permission
chmod 755 file                # Set specific permissions (rwxr-xr-x)
chmod u+x file                # Add execute for user only
chmod g+w file                # Add write for group
chmod o-r file                # Remove read for others

# Ownership
chown user file               # Change owner
chown user:group file         # Change owner and group
chgrp group file              # Change group only
sudo chown root:root file     # Change to root ownership

# Permission display
ls -l file                    # Show detailed permissions
stat file                    # Detailed file information

```

## Environment & Configuration

```bash
# Environment variables
env                           # Show all environment variables
echo $PATH                    # Show PATH variable
export VAR=value              # Set environment variable
unset VAR                     # Remove environment variable
source ~/.bashrc              # Reload bash configuration
. ~/.bashrc                   # Alternative to source

# History
history                       # Show command history
history -c                    # Clear history
!!                            # Repeat last command
!n                            # Repeat command number n
!string                       # Repeat last command starting with string
ctrl+r                        # Search command history interactively

# Aliases
alias ll='ls -al'             # Create command alias
alias la='ls -A'              # List almost all files
unalias ll                    # Remove alias
alias                         # List all aliases

```

## Advanced Features

```bash
# Command chaining
cmd1 && cmd2                  # Run cmd2 only if cmd1 succeeds
cmd1 || cmd2                  # Run cmd2 only if cmd1 fails
cmd1; cmd2                    # Run cmd2 regardless of cmd1 result
cmd1 & cmd2                   # Run cmd1 in background, then cmd2

# Process substitution
diff <(ls dir1) <(ls dir2)    # Compare outputs of two commands
grep pattern <(command)       # Search in command output
command1 <(command2)          # Use command2 output as file input

# Arrays
arr=("apple" "banana" "cherry")    # Create array
echo ${arr[0]}                # First element
echo ${arr[@]}                # All elements
echo ${#arr[@]}               # Array length
arr[3]="date"                 # Add element
unset arr[1]                  # Remove element

# String manipulation
${var#pattern}                # Remove shortest match from beginning
${var##pattern}               # Remove longest match from beginning
${var%pattern}                # Remove shortest match from end
${var%%pattern}               # Remove longest match from end
${var/pattern/replacement}    # Replace first occurrence
${var//pattern/replacement}   # Replace all occurrences
${var:-default}               # Use default if var is unset
${var:=default}               # Set var to default if unset

```

## Exit Codes & Error Handling

```bash
# Exit codes
exit 0                        # Exit successfully
exit 1                        # Exit with error
command; echo $?              # Check exit status of command

# Script options
set -e                        # Exit immediately on error
set -u                        # Exit on undefined variable
set -o pipefail               # Pipeline fails if any command fails
set -x                        # Print commands before executing
set +x                        # Turn off command printing

# Error handling
trap "echo 'Script interrupted'; exit 1" SIGINT  # Handle Ctrl+C
trap "cleanup_function" EXIT  # Run cleanup on script exit
trap "echo 'Error on line $LINENO'; exit 1" ERR  # Handle errors

# Validation
if [ $# -lt 2 ]; then
    echo "Error: Not enough arguments" >&2
    echo "Usage: $0 <arg1> <arg2>" >&2
    exit 1
fi

```

## Quick Reference Commands

```bash
# Help and documentation
man command                   # Manual pages
command --help                # Command help
help builtin                  # Help for shell builtins
info command                  # Info documentation
which command                 # Find command location
type command                  # Show command type
whereis command               # Locate command and manual
apropos keyword               # Search manual descriptions

# System utilities
date                          # Current date and time
date "+%Y-%m-%d %H:%M:%S"    # Formatted date
cal                           # Calendar
bc                            # Calculator
expr 5 + 3                    # Expression evaluation
seq 1 10                      # Sequence generation
yes                           # Repeat string infinitely

```

## Best Practices

- Always quote variables: `"$variable"`
- Use `[[ ]]` instead of `[ ]` for advanced tests
- Check command success: `if command; then`
- Use meaningful variable names
- Add comments for complex logic
- Set script options: `set -euo pipefail`
- Use functions for repeated code
- Validate input parameters
- Handle errors gracefully
