# Python Coding Style: Professional Guide

**Write code that's readable, maintainable, and professional. Follow PEP 8 + modern best practices.**

---

## What It Is (Simple)

**Think of it like grammar for code.**

- **PEP 8** = Official Python style guide
- Emphasizes **readability** over cleverness
- Everyone's code looks the same → easier collaboration
- Your linter (Ruff, Flake8) enforces these automatically

**Why care?**

- ✅ Code is read 10x more than written
- ✅ Team can maintain each other's work without confusion
- ✅ Professional, trustworthy appearance
- ✅ Easier refactoring and debugging
- ✅ Follows community standards (Python way)

---

## Core Principles

| Principle | Rule | Example |
| ----------- | ------ | --------- |
| **Line Length** | Max 88 characters (Black default) | No horizontal scrolling |
| **Indentation** | 4 spaces (never tabs) | `def func():␣␣␣␣pass` |
| **Imports** | Organized in 3 groups | Standard lib, 3rd-party, local |
| **Naming** | snake_case for vars/functions | `user_name`, not `userName` |
| **Classes** | PascalCase | `class UserManager:` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRIES = 5` |
| **Blank Lines** | 2 between top-level defs, 1 between methods | Logical separation |
| **Comments** | Explain *why*, not *what* | ✅ Works because of async behavior |
| **Docstrings** | 3 quotes, at function start | Visible to `help()` and IDE docs |

---

## Naming Conventions (Most Important)

### Variables & Functions: snake_case

```python
# ✅ CORRECT
user_name = "john"
total_count = 42
is_active = True
max_retries = 3

def get_user_data():
    pass

def calculate_total_price(items):
    return sum(item.price for item in items)
```

```python
# ❌ WRONG
userName = "john"  # camelCase (not Python)
TotalCount = 42    # PascalCase (for classes only)
isactive = True    # No underscores (hard to read)
getUser = None     # Unclear, looks like function name
```

### Classes: PascalCase

```python
# ✅ CORRECT
class UserManager:
    pass

class WorkflowExecutor:
    pass

class APIResponse:
    pass
```

```python
# ❌ WRONG
class user_manager:    # Should be PascalCase
class userManager:     # camelCase (use PascalCase)
class USERMANAGER:     # ALL CAPS (reserved for constants)
```

### Constants: UPPER_SNAKE_CASE

```python
# ✅ CORRECT
MAX_RETRIES = 5
API_TIMEOUT = 30
DEFAULT_LOG_LEVEL = "INFO"
DATABASE_URL = "postgresql://..."
```

```python
# ❌ WRONG
max_retries = 5        # Should be UPPER for constants
MaxRetries = 5         # PascalCase (use UPPER)
maxretries = 5         # No underscores
```

### Private/Internal: Leading Underscore

```python
# ✅ CORRECT
class UserManager:
    def __init__(self):
        self._internal_state = None  # Private to class
        self.__very_private = None   # Name-mangled (rarely used)
    
    def _helper_method(self):        # Internal helper
        pass
    
    def public_method(self):         # Public API
        pass
```

---

## Spacing (Horizontal)

### Around Operators: Single Space

```python
# ✅ CORRECT - space around operators
result = a + b * c
total = (first + second) / 2
is_valid = value >= threshold
config = {"timeout": 30, "retries": 5}
items = [1, 2, 3, 4]
```

```python
# ❌ WRONG - no space or inconsistent
result=a+b*c
total=(first+second)/2
is_valid=value>=threshold
config={"timeout":30,"retries":5}
items=[1,2,3,4]
```

### Function Calls: Space After Commas

```python
# ✅ CORRECT
def calculate(x, y, z):
    items = [1, 2, 3, 4]
    data = {"name": "John", "age": 30}
    return function_call(arg1, arg2, arg3)
```

```python
# ❌ WRONG
def calculate(x,y,z):
    items = [1,2,3,4]
    data = {"name":"John","age":30}
    return function_call(arg1,arg2,arg3)
```

### No Spaces Inside Brackets/Parentheses

```python
# ✅ CORRECT
my_list[0]
my_dict['key']
my_dict.get('name', 'Unknown')
result = function(arg1, arg2)
text.upper()
slice_data[1:5]
```

```python
# ❌ WRONG
my_list[ 0 ]
my_dict[ 'key' ]
my_dict.get( 'name', 'Unknown' )
result = function( arg1, arg2 )
text.upper( )
slice_data[ 1 : 5 ]
```

### Inline Comments: Two Spaces Before

```python
# ✅ CORRECT
x = x + 1  # Increment counter
y = calculate_result()  # Complex calculation
value = process_data()  # Returns None on error

# ❌ WRONG
x = x + 1# Increment counter (no space)
y = calculate_result()  # Complex calculation (just one space)
```

---

## Spacing (Vertical)

### Top-Level Definitions: Two Blank Lines

```python
# ✅ CORRECT
import os
import sys

def first_function():
    pass


def second_function():
    pass


class MyClass:
    pass


class AnotherClass:
    pass
```

```python
# ❌ WRONG
import os
import sys
def first_function():
    pass
def second_function():
    pass
class MyClass:
    pass
```

### Methods in Classes: One Blank Line

```python
# ✅ CORRECT
class UserManager:
    def __init__(self):
        self.users = []

    def get_user(self, user_id):
        pass

    def add_user(self, user):
        pass

    def delete_user(self, user_id):
        pass
```

```python
# ❌ WRONG
class UserManager:
    def __init__(self):
        self.users = []
    def get_user(self, user_id):
        pass
    def add_user(self, user):
        pass
```

### Within Functions: Logical Grouping Only

```python
# ✅ CORRECT - use blank lines to group logical sections
def process_workflow(workflow):
    # Validation
    if not workflow:
        return None
    
    # Processing
    result = workflow.execute()
    data = format_result(result)
    
    # Logging
    logger.info(f"Processed: {workflow.name}")
    
    return data
```

---

## Imports Organization

**Group in this order:**

1. **Standard library** (os, sys, json, pathlib, etc.)
2. **Third-party** (requests, django, fastapi, etc.)
3. **Local application** (from . import config, etc.)

```python
# ✅ CORRECT
# Standard library
import os
import sys
import json
from pathlib import Path
from typing import List, Dict, Optional

# Third-party
import requests
import numpy as np
from django.db import models
from fastapi import FastAPI, Request

# Local application
from myapp import config
from myapp.utils import helper_function
from myapp.models import User, Workflow
```

```python
# ❌ WRONG (mixed order)
from myapp.models import User
import requests
import os
from myapp.utils import helper_function
import json
```

### Use isort or Ruff to Automate

```bash
# Auto-organize imports
isort .
ruff check --fix .
```

---

## Line Length: 88 Characters (Black Default)

### Why 88?

- **79 is outdated** (vintage terminals)
- **88 is modern** (fits 2-column editors, CI logs)
- **Reduces line breaks** without excessive wrapping
- Enforced by Black (industry standard)

### How to Handle Long Lines

```python
# ✅ CORRECT - break logical sections
# Function call with many args
result = complex_function(
    argument_one="value",
    argument_two=123,
    argument_three=True,
)

# Long string
message = (
    "This is a very long message that would exceed "
    "the line length limit if written on one line."
)

# Conditional
if (
    user.is_active
    and user.has_permission('admin')
    and not user.is_suspended
):
    process_user(user)

# Dictionary
config = {
    "database_url": "postgresql://localhost/mydb",
    "timeout": 30,
    "max_retries": 5,
}
```

### Use Black or Ruff to Auto-Format

```bash
# Auto-format to 88 chars
black .
ruff format .
```

---

## Docstrings & Comments

### Docstrings: Always Add to Public Functions/Classes

```python
# ✅ CORRECT - Google-style docstring
def calculate_total_price(items: List[Item]) -> float:
    """Calculate total price for a list of items.
    
    Args:
        items: List of Item objects to sum.
    
    Returns:
        Total price as a float.
    
    Raises:
        ValueError: If items is empty.
    """
    if not items:
        raise ValueError("Items cannot be empty")
    return sum(item.price for item in items)
```

```python
# ❌ WRONG - no docstring
def calculate_total_price(items):
    return sum(item.price for item in items)
```

### Comments: Explain *Why*, Not *What*

```python
# ✅ CORRECT - explains reasoning
# Retry with exponential backoff to avoid overwhelming the API
for attempt in range(MAX_RETRIES):
    try:
        return api.call()
    except Exception:
        time.sleep(2 ** attempt)

# Use list comprehension instead of loop for better performance
filtered = [x for x in data if x > threshold]
```

```python
# ❌ WRONG - just restates code
# Loop through items
for item in items:
    # Print item
    print(item)

# Set x to 5
x = 5
```

### Type Hints: Use Them

```python
# ✅ CORRECT - type hints make intent clear
from typing import List, Dict, Optional

def process_workflow(
    workflow: Workflow,
    timeout: int = 30,
    debug: bool = False,
) -> Optional[Result]:
    """Process a workflow with optional timeout."""
    pass

class UserManager:
    def __init__(self) -> None:
        self.users: List[User] = []
    
    def get_user(self, user_id: str) -> Optional[User]:
        pass
    
    def add_user(self, user: User) -> bool:
        pass
```

---

## Indentation: 4 Spaces, Never Tabs

```python
# ✅ CORRECT - 4 spaces
def my_function():
    if condition:
        result = do_something()
        if nested:
            return result

class MyClass:
    def method(self):
        pass
```

```python
# ❌ WRONG - tabs (invisible, causes issues)
def my_function():
→ if condition:  # TAB character (bad!)
→ → result = do_something()
```

**Configure editor:**

- VS Code: `"editor.insertSpaces": true, "editor.tabSize": 4`
- PyCharm: Settings → Editor → General → Spaces, Indent: 4

---

## Real-World Example: Before & After

### ❌ BEFORE (Messy)

```python
import requests
from myapp.models import user
import os
class userManger:  # Wrong casing
    def __init__(self):
        self.users=[]  # No spaces
    def get_User(self,user_id):  # Mixed casing
        # Loop through users  # Useless comment
        for u in self.users:
            if u['id']==user_id:
                return u
    def addUser(self,User):  # Wrong naming
        self.users.append(User)
```

### ✅ AFTER (Professional)

```python
import os

import requests

from myapp.models import User


class UserManager:
    """Manages user operations."""

    def __init__(self) -> None:
        """Initialize user manager with empty list."""
        self.users: List[User] = []

    def get_user(self, user_id: str) -> Optional[User]:
        """Get user by ID.
        
        Args:
            user_id: User identifier.
        
        Returns:
            User object if found, None otherwise.
        """
        # Linear search is fine for small sets; consider indexing for scale
        for user in self.users:
            if user.id == user_id:
                return user
        return None

    def add_user(self, user: User) -> None:
        """Add user to manager."""
        self.users.append(user)
```

---

## Auto-Formatting Setup (Eliminate Manual Work)

### One-Command Setup

```bash
pip install black ruff isort
```

### pyproject.toml

```toml
[tool.black]
line-length = 88
target-version = ["py38"]

[tool.isort]
profile = "black"
line_length = 88

[tool.ruff]
line-length = 88
target-version = "py38"
```

### Use Pre-Commit Hooks

```bash
pip install pre-commit
pre-commit install
```

**.pre-commit-config.yaml:**

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.0.0
    hooks:
      - id: black

  - repo: https://github.com/PyCQA/isort
    rev: 5.12.0
    hooks:
      - id: isort

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.0
    hooks:
      - id: ruff
        args: [--fix]
```

### Format Before Commit

```bash
black . && isort . && ruff check --fix .
```

---

## Common Mistakes & Fixes

### Mistake 1: Mixed Naming Conventions

```python
# ❌ WRONG
userCount = 5          # camelCase (Python uses snake_case)
getUserData = None     # Looks like function
TEMP = 10              # Not truly constant

# ✅ CORRECT
user_count = 5
get_user_data()
BUFFER_SIZE = 10
```

### Mistake 2: No Type Hints

```python
# ❌ WRONG
def process(data):
    return data

# ✅ CORRECT
def process(data: List[Dict]) -> Optional[Result]:
    return data
```

### Mistake 3: Inconsistent Spacing

```python
# ❌ WRONG
x=1+2*3
result = function(a,b,c)

# ✅ CORRECT
x = 1 + 2 * 3
result = function(a, b, c)
```

### Mistake 4: Poor Import Organization

```python
# ❌ WRONG
from myapp.models import User
import requests
import os
import json

# ✅ CORRECT
import json
import os

import requests

from myapp.models import User
```

### Mistake 5: Meaningless Comments

```python
# ❌ WRONG
x = 5  # Set x to 5
# Loop through items
for item in items:
    print(item)  # Print

# ✅ CORRECT
# Use batch size of 5 for API rate limiting
batch_size = 5

# Process items in order (preserve dependency chain)
for item in items:
    print(item)
```

---

## Quick Checklist

- ✅ Variable/function names: `snake_case`
- ✅ Class names: `PascalCase`
- ✅ Constants: `UPPER_SNAKE_CASE`
- ✅ Line length: 88 chars max
- ✅ Indentation: 4 spaces
- ✅ Space around operators: `a + b`, not `a+b`
- ✅ No spaces inside brackets: `func(arg)`, not `func( arg )`
- ✅ Two blank lines between top-level defs
- ✅ One blank line between methods
- ✅ Imports organized: stdlib, 3rd-party, local
- ✅ Type hints on public functions
- ✅ Docstrings on public functions/classes
- ✅ Comments explain *why*, not *what*
- ✅ Run `black .` + `ruff check --fix .` before commit

---

## One-Liner Automation

```bash
# Format everything in one go
black . && isort . && ruff check --fix .

# Then commit
git add .
git commit -m "style: auto-format code"
```

---

## Resources

- [PEP 8 Official](https://pep8.org/)
- [Black Docs](https://black.readthedocs.io/)
- [Ruff Docs](https://github.com/astral-sh/ruff)
- [Type Hints](https://docs.python.org/3/library/typing.html)
- [Google Docstring Style](https://google.github.io/styleguide/pyguide.html#38-comments-and-docstrings)

---

## Final Principle

**Code style is about respect: for your teammates, future self, and the Python community.**

Write code you'd be proud to maintain 2 years later. Consistency beats perfection. Automate the boring parts.

**Your stack (2026):**

1. **Write code** (follow conventions)
2. **Black formats it** (one command)
3. **Ruff checks it** (one command)
4. **Pre-commit enforces it** (automatic)
5. **CI validates it** (pipeline)

**Result:** Professional, readable, maintainable code. Every single time. 🚀
