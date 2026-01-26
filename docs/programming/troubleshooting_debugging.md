---
title: Troubleshooting & Debugging
---

# Troubleshooting & Debugging

## Introduction to Troubleshooting & Debugging

**Troubleshooting** is the process of identifying, analyzing and solving problems in any system. **Debugging** is the specific process of identifying, analyzing and removing bugs in code. **Debuggers** are tools that follow code line by line, inspect variable changes, and interrupt programs when conditions are met.

### Why Master These Skills?

- **Save Time** - Quick problem identification and resolution
- **Code Quality** - Better understanding leads to better code
- **Professional Growth** - Debug skills separate good from great developers
- **System Reliability** - Prevent and resolve production issues

### Core Principle: **Information → Hypothesis → Test → Fix**

### Troubleshooting vs Debugging

- **Troubleshooting:** The process of identifying, analyzing and solving problems in any system
- **Debugging:** The process of identifying, analyzing and removing bugs in actual code
- **Debuggers:** Tools that follow code line by line, inspect variable changes, and interrupt programs when conditions are met

---

## The Systematic Troubleshooting Process

### Step-by-Step Approach

1. **Getting Information** - Create reproduction case (clear description of how/when problem appears)
2. **Finding Root Cause** - Essential for long-term remediation
3. **Performing Remediation** - Apply short-term and long-term fixes
4. **Test & Verify** - Ensure fix works in test environment first, then production

### Questions to Ask Users

- What were you trying to do?
- What steps did you follow?
- What was the expected result?
- What was the actual result?

### Before Starting to Debug

- [ ]  Can you reproduce the error consistently?
- [ ]  What changed since it last worked?
- [ ]  Do you have access to logs and error messages?
- [ ]  Is this affecting one user or many?

---

## 💻 Coding Project Steps

1. **Understand** the problem statement
2. **Research** existing solutions and approaches
3. **Planning** the implementation strategy
4. **Writing** the actual code

---

## Types of Programming Errors

### 1. Syntax Errors

**Definition:** Errors in code structure that prevent parsing/compilation

```python
# Common syntax errors
if x == 5  # Missing colon
    print("Hello")

print("Hello"  # Missing closing parenthesis

# Mixed indentation
if True:
    print("Tab")
        print("Spaces")  # Inconsistent indentation

```

**Prevention Checklist:**

- [ ]  Use consistent indentation (spaces or tabs, not both)
- [ ]  Check for missing colons after `if`, `for`, `while`, `def`
- [ ]  Verify matching brackets: `()`, `[]`, `{}`
- [ ]  Ensure proper string quote matching
- [ ]  Avoid using reserved keywords as variable names
- [ ]  Check for `=` vs `==` in conditions

### 2. Runtime Errors (Exceptions)

**Definition:** Errors that occur during program execution

```python
# Common runtime errors
numbers = [1, 2, 3]
print(numbers[5])        # IndexError
user_data = {"name": "John"}
print(user_data["age"])  # KeyError
result = 10 / 0          # ZeroDivisionError
undefined_var            # NameError
"string".append("x")     # AttributeError

```

**Common Runtime Errors:**

| Error Type | Cause | Solution |
| --- | --- | --- |
| `IndexError` | Accessing invalid array index | Check bounds before access |
| `KeyError` | Accessing non-existent dictionary key | Use `.get()` or check key exists |
| `NameError` | Using undefined variable | Define variable before use |
| `TypeError` | Wrong data type for operation | Validate types before operations |
| `AttributeError` | Calling non-existent method | Check object has method/attribute |
| `ModuleNotFoundError` | Import failed | Install module: `pip install module_name` |
| `FileNotFoundError` | File doesn't exist | Check path, permissions, file existence |

### 3. Semantic Errors (Logic Errors)

**Definition:** Code runs without crashing but produces incorrect results

```python
# Example: Calculating average incorrectly
def calculate_average(numbers):
    total = sum(numbers)
    return total / len(numbers) + 1  # Bug: adding 1

# Should be:
def calculate_average(numbers):
    total = sum(numbers)
    return total / len(numbers)

```

---

## Python Debugging Techniques

### 1. Print Statement Debugging

```python
# Track execution flow and variable values
print(f"Variable value: {variable}")
print("Reached this point in code")
print(f"Function input: {input_param}")
print(f"Loop iteration {i}: {current_item}")

# Advanced print debugging
def debug_function(data):
    print(f"DEBUG: Input data = {data}")
    result = process_data(data)
    print(f"DEBUG: Processed result = {result}")
    return result

```

**When to use:** Quick debugging, understanding code flow, simple issues

### 2. Assert Statements

```python
assert condition, "Custom error message"

# Examples:
assert filename != "", "You must specify a filename!"
assert len(data) > 0, "Data list cannot be empty"
assert isinstance(user_id, int), "User ID must be an integer"

# Disable asserts in production with: python -O script.py

```

### 3. Exception Handling with Try-Catch

```python
try:
    risky_operation()
except SpecificError as e:
    print(f"Specific error occurred: {e}")
    # Handle gracefully
except Exception as e:
    print(f"Unexpected error: {e}")
    # Log the error
    raise  # Re-raise if needed

# Multiple exceptions
try:
    file_operation()
except FileNotFoundError:
    print("File not found")
except PermissionError:
    print("Permission denied")
except Exception as e:
    print(f"Other error: {e}")

```

### 4. Python Logging Module

```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='debug.log'
)

# Use different log levels
logging.debug("Detailed debugging information")
logging.info("General information")
logging.warning("Warning message")
logging.error("Error occurred")
logging.critical("Critical error")

# In functions
def my_function(data):
    logging.debug(f"Processing data: {data}")
    result = process_data(data)
    logging.info(f"Function completed, result: {result}")
    return result

```

**Log Levels:** DEBUG → INFO → WARNING → ERROR → CRITICAL

### 5. PDB (Python Debugger)

```python
import pdb

def problematic_function():
    x = 10
    pdb.set_trace()  # Execution pauses here
    y = x * 2
    return y

# Alternative: Use breakpoint() in Python 3.7+
def another_function():
    x = 10
    breakpoint()  # Same as pdb.set_trace()
    y = x * 2
    return y

```

**PDB Commands:**

| Command | Action |
| --- | --- |
| `n` (next) | Execute next line |
| `s` (step) | Step into function calls |
| `c` (continue) | Continue execution |
| `l` (list) | Show current code |
| `p variable_name` | Print variable value |
| `pp variable_name` | Pretty-print variable |
| `w` (where) | Show stack trace |
| `u` (up) | Move up stack frame |
| `d` (down) | Move down stack frame |
| `q` (quit) | Quit debugger |

### 6. Advanced Debugging Techniques

### Scale Down Input

```python
# Instead of processing 10,000 items, test with 10
test_data = large_dataset[:10]
result = process_data(test_data)

```

### Check Summaries

```python
# Instead of printing entire dataset
print(f"Data summary: {len(data)} items, first 5: {data[:5]}")
print(f"Data types: {[type(item) for item in data[:3]]}")

```

### Write Self-Checks

```python
def process_user_data(users):
    # Sanity checks
    assert isinstance(users, list), "Users must be a list"
    assert all(isinstance(u, dict) for u in users), "Each user must be a dict"

    # Process data
    processed = []
    for user in users:
        # Consistency checks
        assert 'id' in user, f"User missing ID: {user}"
        processed.append(process_single_user(user))

    return processed

```

---

## System-Level Debugging

### Memory Debugging

### Common Memory Issues

- **Memory Leaks** - Chunks of memory no longer needed but not released
- **Invalid Memory Access** - Process tries to access unassigned memory
- **Buffer Overflows** - Writing past allocated memory boundaries

### Tools for Memory Debugging

```bash
# Valgrind (Linux) - detect invalid operations
valgrind --tool=memcheck python script.py

# Python memory profiling
pip install memory-profiler
python -m memory_profiler script.py

```

### Python Memory Monitoring

```python
import psutil
import os

# Current process memory usage
process = psutil.Process(os.getpid())
memory_info = process.memory_info()
print(f"Memory usage: {memory_info.rss / 1024 / 1024:.2f} MB")

# System memory
memory = psutil.virtual_memory()
print(f"Total: {memory.total / 1024 / 1024:.2f} MB")
print(f"Available: {memory.available / 1024 / 1024:.2f} MB")

```

### System Call Tracing

### strace (Linux/Mac)

```bash
# Trace system calls
strace python script.py

# Save output to file
strace -o debug.trace python script.py

# Trace specific system calls
strace -e trace=open,read,write python script.py

```

### Process Monitor (Windows)

- Use Process Monitor to trace file/registry operations
- Filter by process name to focus on your application

---

## Performance Analysis & Optimization

### Performance Issues Types

### CPU-Bound vs I/O-Bound

| Type | Characteristics | Solutions |
| --- | --- | --- |
| **CPU-Bound** | Heavy calculations, uses single core | Multiprocessing, parallel processing |
| **I/O-Bound** | Waiting for files/network/database | Threading, asyncio |

### Performance Optimization Principles

1. **Start with clear code** that works correctly first
2. **Profile before optimizing** to identify real bottlenecks
3. **Only optimize when necessary** - don't over-optimize

### Time Measurement

```python
import time
from functools import wraps

# Simple timing
start_time = time.time()
# Code to measure
end_time = time.time()
print(f"Execution time: {end_time - start_time:.2f} seconds")

# Timing decorator
def time_it(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper

@time_it
def slow_function():
    time.sleep(1)
    return "Done"

```

### Built-in Profiling

```python
import cProfile
import pstats

# Profile a function
cProfile.run('my_function()', 'profile_output')

# Analyze results
stats = pstats.Stats('profile_output')
stats.sort_stats('cumulative').print_stats(10)

# Profile line by line (install line_profiler first)
# pip install line_profiler
@profile
def function_to_profile():
    # Function code here
    pass

```

### Data Structure Guidelines

- **Lists:** When accessing by position or iterating through all elements
- **Dictionaries:** When looking up elements using keys
- **Sets:** When checking membership or eliminating duplicates
- **Keep iterations minimal** and break out of loops when found

### Common Performance Problems

1. **Inefficient Algorithms** - Use Big O analysis
2. **Expensive Operations in Loops** - Move calculations outside loops
3. **Memory Leaks** - Monitor memory usage over time
4. **Poor Resource Management** - Close files, connections properly

---

## Concurrency & Parallelism

### When to Use What

| Scenario | Recommended Approach |
| --- | --- |
| I/O operations (files, network) | **Threading** or **asyncio** |
| CPU-intensive tasks | **Multiprocessing** |
| Many small tasks | **asyncio** |
| Mixed workload | **Combination** |

### Threading Example

```python
from concurrent.futures import ThreadPoolExecutor
import requests

def fetch_url(url):
    response = requests.get(url)
    return response.status_code

urls = ['<http://example1.com>', '<http://example2.com>']

# I/O-bound tasks - use threading
with ThreadPoolExecutor(max_workers=5) as executor:
    results = list(executor.map(fetch_url, urls))

```

### Multiprocessing Example

```python
from concurrent.futures import ProcessPoolExecutor
import math

def cpu_intensive_task(n):
    return sum(math.sqrt(i) for i in range(n))

tasks = [1000000, 2000000, 3000000]

# CPU-bound tasks - use multiprocessing
with ProcessPoolExecutor() as executor:
    results = list(executor.map(cpu_intensive_task, tasks))

```

### Asyncio Example

```python
import asyncio
import aiohttp

async def fetch_async(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = ['<http://example1.com>', '<http://example2.com>']

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_async(session, url) for url in urls]
        results = await asyncio.gather(*tasks)

    return results

# Run async function
results = asyncio.run(main())

```

---

## System Monitoring & Tools

### Linux/Mac Tools

```bash
# Process monitoring
top                    # Basic process info
htop                   # Enhanced process viewer
ps aux                 # All processes

# Memory usage
free -h               # Memory information
cat /proc/meminfo     # Detailed memory stats

# Disk usage
df -h                 # Filesystem disk space
du -sh *              # Directory sizes
iostat                # I/O statistics

# Network
netstat -tuln         # Network connections
ss -tuln              # Modern netstat alternative
ping google.com       # Test connectivity
traceroute google.com # Network path

# System calls
strace command        # Trace system calls
lsof -p PID          # Open files by process

```

### Windows Tools

```bash
# Task Manager - Basic monitoring
taskmgr

# Resource Monitor - Detailed resource usage
resmon

# Process Monitor - File/registry operations
procmon

# Performance Monitor - Custom counters
perfmon

# Command line tools
tasklist              # List processes
netstat -an           # Network connections

```

### Python System Monitoring

```python
import psutil
import platform

# System info
print(f"System: {platform.system()} {platform.release()}")
print(f"CPU cores: {psutil.cpu_count()}")

# CPU usage
print(f"CPU usage: {psutil.cpu_percent(interval=1)}%")

# Memory usage
memory = psutil.virtual_memory()
print(f"Memory: {memory.percent}% used")
print(f"Available: {memory.available / 1024 / 1024:.0f} MB")

# Disk usage
disk = psutil.disk_usage('/')
print(f"Disk usage: {disk.percent}%")

# Network I/O
net_io = psutil.net_io_counters()
print(f"Bytes sent: {net_io.bytes_sent}")
print(f"Bytes received: {net_io.bytes_recv}")

# Process information
for proc in psutil.process_iter(['pid', 'name', 'cpu_percent']):
    if proc.info['cpu_percent'] > 5.0:
        print(f"High CPU: {proc.info}")

```

---

## Network Troubleshooting

### Basic Network Debugging

```bash
# Test connectivity
ping google.com
ping -c 4 google.com        # Send 4 packets

# Test specific ports
telnet google.com 80
nc -zv google.com 80        # Test port without connecting

# DNS resolution
nslookup google.com
dig google.com

# Network path
traceroute google.com
mtr google.com              # Continuous traceroute

```

### Python Network Debugging

```python
import socket
import requests

def test_connection(host, port, timeout=5):
    """Test if a host:port is reachable."""
    try:
        socket.create_connection((host, port), timeout)
        return True
    except socket.error as e:
        print(f"Connection to {host}:{port} failed: {e}")
        return False

def test_http(url, timeout=5):
    """Test HTTP connectivity."""
    try:
        response = requests.get(url, timeout=timeout)
        print(f"HTTP {response.status_code}: {url}")
        return response
    except requests.exceptions.RequestException as e:
        print(f"HTTP request failed: {e}")
        return None

# Usage
test_connection('google.com', 80)
test_http('<https://google.com>')

```

### Common Network Issues

1. **DNS Problems** - Can't resolve hostnames
    - Check `/etc/resolv.conf` (Linux) or DNS settings
    - Try different DNS servers (8.8.8.8, 1.1.1.1)
2. **Firewall Blocking** - Ports not accessible
    - Check local firewall rules
    - Verify remote firewall allows connections
3. **Network Congestion** - Slow response times
    - Check bandwidth usage
    - Test during different times
4. **Server Down** - Service unavailable
    - Check if service is running
    - Verify server health

---

## Getting Help Effectively

### Before Asking for Help

**Try These First:**

- [ ]  Read error messages carefully
- [ ]  Search the error message online
- [ ]  Check official documentation
- [ ]  Review similar working code
- [ ]  Use rubber duck debugging
- [ ]  Take a break and return with fresh perspective

### How to Ask Good Questions

### ❌ Bad Help Requests

```yaml
Subject: "HELP!!!"
Message: "My code doesn't work. Can someone fix it?"

```

### ✅ Good Help Requests

```yaml
Subject: "Python: Getting KeyError when accessing dictionary in user_manager.py"

I'm trying to retrieve user data from a dictionary but getting a KeyError.

**Expected behavior:** Get user info by ID from user_data dictionary
**Actual behavior:** KeyError: 'user_123' exception

**Minimal code example:**
```python
user_data = {'user_456': {'name': 'John'}}
user_id = 'user_123'
info = user_data[user_id]  # Error occurs here

```

**Full error message:**
KeyError: 'user_123'
File "user_manager.py", line 15, in get_user_info

**What I've tried:**

- Verified user_id variable contains expected value
- Checked that dictionary has data
- Tried using .get() method but need to handle missing users properly

**Environment:** Python 3.9, Windows 10, PyCharm IDE
**Additional context:** This happens when processing user requests from API

### Help Request Checklist

- [ ] **Clear, specific subject line**
- [ ] **State your goal clearly** - what should happen?
- [ ] **Explain what actually happens** - error messages, wrong output
- [ ] **Include complete error message** - full traceback
- [ ] **Share minimal, complete code** that reproduces issue
- [ ] **Format code properly** - use code blocks
- [ ] **List what you've already tried**
- [ ] **Include environment details** - Python version, OS, IDE

---

## Crash Analysis & Recovery

### Finding Root Cause of Crashes

1. **Check all available logs** - application, system, web server
2. **Figure out what changed** recently - code, config, environment
3. **Trace system/library calls** the program makes
4. **Create smallest reproduction case** possible

### Crash Analysis Tools

- **Python Traceback** - Shows execution path when error occurred
- **Core Dumps** - Store crash state for analysis (Linux/Unix)
- **Crash Logs** - System-generated crash reports
- **Log Analysis** - Look for patterns and correlations

### Python Crash Debugging

```python
import traceback
import sys

def handle_crash():
    """Capture and log crash information."""
    exc_type, exc_value, exc_traceback = sys.exc_info()

    # Print detailed traceback
    traceback.print_exception(exc_type, exc_value, exc_traceback)

    # Save to file
    with open('crash.log', 'w') as f:
        traceback.print_exception(exc_type, exc_value, exc_traceback, file=f)

# Use in your code
try:
    risky_operation()
except Exception:
    handle_crash()
    raise

```

---

## Incident Documentation & Postmortems

### What to Document During Incidents

- **Timeline** - When did it start, when was it detected, when was it fixed
- **Root cause** of the issue
- **How you diagnosed** the problem
- **What you did** to fix it (short-term and long-term)
- **Prevention measures** for future

### Postmortem Template

1. Executive Summary

- Brief description of the incident
- Impact on users/systems
- Duration of the incident

1. Timeline of Events

- When incident started
- When it was detected
- Key actions taken
- When it was resolved

1. Root Cause Analysis

- What caused the issue
- Why existing safeguards didn't prevent it
- Contributing factors

1. Impact Assessment

- Who was affected
- What services were impacted
- Business impact (if applicable)

1. Response Analysis

- What went well in the response
- What could have been done better
- Response time metrics

1. Resolution and Recovery

- How the issue was resolved
- Steps taken to restore service
- Verification of fix

1. Lessons Learned

- What we learned from this incident
- Process improvements needed
- Technical improvements needed

1. Action Items

- Specific tasks to prevent recurrence
- Owners and deadlines
- Monitoring improvements

---

## Code Review for Bug Prevention

### Code Review Checklist

**Functionality:**

- [ ]  Code does what it's supposed to do
- [ ]  Edge cases are handled appropriately
- [ ]  Error handling is comprehensive
- [ ]  Input validation where needed

**Code Quality:**

- [ ]  Code is readable and well-documented
- [ ]  Functions have single responsibility
- [ ]  Variable names are descriptive
- [ ]  No obvious code duplication

**Performance:**

- [ ]  No obvious performance bottlenecks
- [ ]  Efficient algorithms used
- [ ]  Memory usage is reasonable
- [ ]  Database queries are optimized

**Security:**

- [ ]  No hardcoded credentials
- [ ]  Input sanitization implemented
- [ ]  Authentication/authorization proper
- [ ]  No SQL injection vulnerabilities

**Testing:**

- [ ]  Adequate test coverage
- [ ]  Tests cover edge cases
- [ ]  Tests are meaningful

### Giving Good Review Feedback

### ✅ Good Review Comments

```markdown
"Consider extracting this validation logic into a separate function
for reusability. Something like `validate_user_input(user_data)`
would improve readability and testability."

"This could potentially cause a memory leak if the connection isn't
closed. Consider using a context manager or try/finally block."

"Great error handling! The specific exception types make debugging easier."

```markdown

### ❌ Poor Review Comments

```markdown
"This is wrong."
"Bad code."
"Why did you do it this way?"
"This won't work."

```

---

## Emergency Response Guide

### When Systems Are Down

1. Don't Panic - Stay calm and methodical

2. Immediate Response

- [ ]  Assess the scope of the problem
- [ ]  Check if users are affected
- [ ]  Look at recent changes (deployments, config changes)
- [ ]  Check system resources (CPU, memory, disk)
- [ ]  Review recent logs for errors

1. Communication

- [ ]  Notify relevant stakeholders
- [ ]  Update status pages if applicable
- [ ]  Set up incident response channel

1. Investigation

- [ ]  Gather logs and error messages
- [ ]  Create timeline of when issues started
- [ ]  Check dependencies (databases, external APIs)
- [ ]  Monitor system metrics

1. Resolution

- [ ]  Implement temporary fix if possible
- [ ]  Test fix in staging if time permits
- [ ]  Apply fix to production
- [ ]  Monitor for stability

1. Follow-up

- [ ]  Verify complete resolution
- [ ]  Write incident report
- [ ]  Schedule postmortem meeting
- [ ]  Implement prevention measures

---

## Best Practices Summary

### Prevention

- **Write Tests** - Catch bugs before they reach production
- **Code Reviews** - Get second opinions on code changes
- **Logging** - Implement comprehensive logging throughout your application
- **Monitoring** - Set up alerts for system health metrics
- **Documentation** - Keep runbooks and troubleshooting guides updated

### Debugging Strategy

1. **Start Simple** - Use basic debugging before advanced tools
2. **Isolate Problems** - Narrow down to smallest reproducible case
3. **Test Safely** - Always test fixes in non-production environment first
4. **Document Findings** - Keep track of what you learn for future reference
5. **Think Systematically** - Follow structured approach, don't jump around

### Code Quality

- **Fail Fast** - Use assertions and validation to catch problems early
- **Handle Errors Gracefully** - Don't let exceptions crash your program
- **Monitor Performance** - Track key metrics to spot problems early
- **Keep It Simple** - Complex code is harder to debug

---

## Essential Tools Quick Reference

### Python Debugging

```python
# Debug prints
print(f"Debug: variable = {variable}")

# Assertions
assert condition, "Error message"

# Exception handling
try:
    risky_code()
except SpecificException as e:
    logging.error(f"Error: {e}")

# Logging
import logging
logging.basicConfig(level=logging.DEBUG)
logging.debug("Debug message")

# Interactive debugging
import pdb; pdb.set_trace()
breakpoint()  # Python 3.7+

# Timing
import time
start = time.time()
# code here
print(f"Time: {time.time() - start:.2f}s")

# Profiling
import cProfile
cProfile.run('function_call()')

# System monitoring
import psutil
print(f"CPU: {psutil.cpu_percent()}%")
print(f"Memory: {psutil.virtual_memory().percent}%")

```

### System Commands

```bash
# Process monitoring
top                     # Process viewer
htop                    # Enhanced top
ps aux | grep python    # Find Python processes

# System tracing
strace python script.py # Trace system calls (Linux)
dtruss python script.py # Trace system calls (Mac)

# Network debugging
ping google.com         # Test connectivity
telnet host port       # Test specific port
netstat -tuln          # Show network connections
ss -tuln               # Modern netstat

# Resource usage
free -h                # Memory usage
df -h                  # Disk usage
iostat                 # I/O statistics

# Logs
tail -f /var/log/app.log    # Follow log file
journalctl -f              # Follow systemd logs

```

---

## Quick Decision Matrix

### When to Use Each Debugging Method

| Problem Type | First Try | If That Fails | Advanced Option |
| --- | --- | --- | --- |
| **Syntax Error** | Read error message | Check indentation/brackets | Use IDE syntax checker |
| **Logic Error** | Add print statements | Use assertions | Interactive debugger |
| **Performance** | Time measurement | Profile the code | System monitoring |
| **Memory Issues** | Check for leaks | Memory profiler | Valgrind/system tools |
| **Network Issues** | ping/telnet | Check logs | Packet capture |
| **Crashes** | Check logs | Reproduce minimally | Core dump analysis |
| **Intermittent** | Add logging | Monitor over time | Statistical analysis |

---

## Remember: The Golden Rules

1. **Information First** - Always gather complete information before acting
2. **Reproduce Consistently** - Find reliable way to trigger the problem
3. **Start Simple** - Use basic tools before advanced ones
4. **Test Safely** - Never debug directly in production
5. **Document Everything** - Future you (and your team) will thank you
6. **Prevention > Cure** - Good practices prevent most problems
7. **Stay Calm** - Panicked debugging leads to more problems

**The best debugger is a clear mind and systematic approach!** 🧠✨
