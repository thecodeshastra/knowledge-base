---
title: Python Libs
---

# Python Libraries (Modules)

## Introduction to Python Modules

**Python modules** are reusable pieces of code that extend Python's functionality. They can be **standard library modules** (built-in) or **third-party modules** (installed via pip).

### Module Organization Strategy

- **Core/Important Modules** - Essential for system interaction, file handling, testing
- **Utility/Other Modules** - Specific functionality, optional features
- **Import Order** - Standard library → Third-party → Local imports

### Import Best Practices

```python
# Standard library imports
import os
import sys

# Third-party imports
import requests
import numpy as np

# Local imports
from mypackage import utils

```

---

## Core/Important Modules

### Command Line & System Interaction

### `sys` - System-specific Parameters

```python
import sys

sys.argv           # Command line arguments list
sys.argv[0]        # Script name
sys.argv[1]        # First argument
sys.exit(0)        # Exit with status code (0=success)
sys.exit(1)        # Exit with error
sys.version        # Python version string
sys.platform       # Operating system platform
sys.path           # Python module search paths
sys.modules        # Loaded modules dictionary
sys.executable     # Python interpreter path
sys.maxsize        # Largest integer value

```

### `os` - Operating System Interface

```python
import os

# Directory operations
os.getcwd()                    # Get current working directory
os.chdir('/path/to/dir')       # Change directory
os.listdir('.')               # List directory contents
os.mkdir('dirname')           # Create directory
os.makedirs('path/to/dirs')   # Create nested directories
os.rmdir('dirname')           # Remove directory
os.remove('filename')         # Remove file
os.rename('old', 'new')       # Rename file/directory

# Path operations
os.path.join('path', 'file')   # Join path components
os.path.exists('path')         # Check if path exists
os.path.isfile('path')         # Check if path is file
os.path.isdir('path')          # Check if path is directory
os.path.abspath('path')        # Get absolute path
os.path.getsize('file')        # Get file size in bytes
os.path.getmtime('file')       # Get modification time

# Environment variables
os.environ.get('VAR_NAME')     # Get environment variable

```

### `subprocess` - External Process Management

```python
import subprocess

# Run command and wait
result = subprocess.run(['ls', '-l'],
                       capture_output=True,
                       text=True,
                       check=True)

# Access results
result.returncode              # Exit code
result.stdout                  # Standard output
result.stderr                  # Standard error

# Quick command execution
subprocess.call(['ls', '-l'])         # Run and return exit code
subprocess.check_output(['ls'])       # Run and return output

# Arguments
# capture_output=True    - Capture stdout/stderr
# text=True             - Return as string
# check=True            - Raise error if command fails
# timeout=30            - Set maximum execution time

```

### `argparse` - Command Line Argument Parsing

```python
import argparse

parser = argparse.ArgumentParser(description='Program description')

# Add arguments
parser.add_argument('filename')                    # Positional argument
parser.add_argument('-n', '--count',              # Optional argument
                   type=int,
                   default=1,
                   help='Number of iterations')
parser.add_argument('--verbose',
                   action='store_true',            # Boolean flag
                   help='Enable verbose output')

args = parser.parse_args()

# Access arguments
print(args.filename)
print(args.count)
print(args.verbose)

```

---

## Testing Modules

### `unittest` - Built-in Testing Framework

```python
import unittest

class TestMath(unittest.TestCase):

    def test_addition(self):
        # Arrange
        a, b = 2, 3

        # Act
        result = a + b

        # Assert
        self.assertEqual(result, 5)

    def test_division_by_zero(self):
        with self.assertRaises(ZeroDivisionError):
            10 / 0

# Common assertions
self.assertEqual(a, b)         # a == b
self.assertNotEqual(a, b)      # a != b
self.assertTrue(x)             # bool(x) is True
self.assertFalse(x)            # bool(x) is False
self.assertIsNone(x)           # x is None
self.assertIn(a, b)            # a in b
self.assertIsInstance(a, str)  # isinstance(a, str)

# Run tests
if __name__ == '__main__':
    unittest.main()

```

### `pytest` - Third-party Testing Framework

```python
# pip install pytest
import pytest

def test_addition():
    assert 2 + 3 == 5

def test_string_operations():
    text = "hello"
    assert text.upper() == "HELLO"
    assert len(text) == 5

def test_exception_handling():
    with pytest.raises(ValueError):
        int("not_a_number")

    with pytest.raises(ZeroDivisionError):
        1 / 0

# Run with: pytest test_file.py
# Key advantages:
# - Simple assert statements
# - Better error messages
# - Fixtures for test setup
# - Plugin ecosystem

```

### Testing Concepts

| Type | Description | Use Case |
| --- | --- | --- |
| **Unit Testing** | Test individual components | Functions, classes |
| **Integration Testing** | Test component interactions | API calls, database |
| **Regression Testing** | Ensure fixes don't break existing code | After bug fixes |
| **Load Testing** | Test performance under load | High traffic scenarios |
| **TDD** | Write tests before code | Red-Green-Refactor cycle |

**Test-Driven Development (TDD) Cycle:**

1. **Red** - Write failing test
2. **Green** - Write minimal code to pass
3. **Refactor** - Improve code while keeping tests green

---

## Utility/Other Modules

### Data & Math

### `random` - Random Number Generation

```python
import random

random.randint(1, 10)          # Random integer between 1-10
random.randrange(0, 10, 2)     # Random even number 0-8
random.random()                # Random float 0.0-1.0
random.choice(['a', 'b', 'c']) # Random choice from list
random.shuffle(my_list)        # Shuffle list in-place

```

### `statistics` - Statistical Functions

```python
import statistics

data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

statistics.mean(data)          # Average
statistics.median(data)        # Middle value
statistics.mode(data)          # Most common value
statistics.stdev(data)         # Sample standard deviation
statistics.pstdev(data)        # Population standard deviation

```

### `collections.Counter` - Count Occurrences

```python
from collections import Counter

text = "hello world"
counter = Counter(text)
# Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1})

counter.most_common(3)         # Top 3 most common
counter['l']                   # Count of 'l'

```

### Web & Network

### `requests` - HTTP Library

```python
# pip install requests
import requests

response = requests.get('<https://api.example.com/data>')
response.status_code           # HTTP status code
response.json()                # Parse JSON response
response.text                  # Response as text
response.headers               # Response headers

# POST request
requests.post('<https://api.example.com>',
             json={'key': 'value'})

```

### File & Data Processing

### `datetime` - Date and Time

```python
import datetime

now = datetime.datetime.now()   # Current date and time
today = datetime.date.today()   # Current date

```

### `shutil` - High-level File Operations

```python
import shutil

shutil.copy2('src.txt', 'dst.txt')     # Copy file with metadata
shutil.copytree('src_dir', 'dst_dir')  # Copy entire directory tree
shutil.move('src', 'dst')              # Move file or directory
shutil.rmtree('directory')             # Remove directory tree

```

### `time` - Time-related Functions

```python
import time

time.sleep(5)                  # Pause execution for 5 seconds
time.time()                    # Current Unix timestamp
time.strftime('%Y-%m-%d')      # Format current time

```

### Text & String Processing

### `string` - String Constants and Templates

```python
import string

string.ascii_letters           # 'abcdefghijklmnopqrstuvwxyzABC...'
string.digits                  # '0123456789'
string.punctuation             # '!"#$%&\\'()*+,-./:;<=>?@[\\\\]^_`{|}~'

```

### `io.StringIO` - In-memory String Streams

```python
from io import StringIO

string_buffer = StringIO()
string_buffer.write("Hello ")
string_buffer.write("World")
content = string_buffer.getvalue()  # "Hello World"

```

### Color & Image Processing

### `colorsys` - Color Space Conversions

```python
import colorsys

# Convert RGB to HSV
h, s, v = colorsys.rgb_to_hsv(r, g, b)

# Convert HSV to RGB
r, g, b = colorsys.hsv_to_rgb(h, s, v)

# Other conversions available:
# rgb_to_hls, hls_to_rgb
# rgb_to_yiq, yiq_to_rgb

```

### `PIL` (Pillow) - Image Processing

```python
# pip install pillow
from PIL import Image

img = Image.open('photo.jpg')
img.resize((800, 600))         # Resize image
img.rotate(90)                 # Rotate image
img.save('output.png')         # Save in different format

```

### Utility Functions

### `copy` - Object Copying

```python
import copy

# Shallow copy
new_list = copy.copy(original_list)

# Deep copy (nested objects)
new_dict = copy.deepcopy(original_dict)

```

---

## Module Import Organization Template

```python
#!/usr/bin/env python3
"""
Module docstring describing the script purpose.
"""

# Standard library imports (alphabetical)
import argparse
import os
import sys
import subprocess
from collections import Counter
from datetime import datetime

# Third-party imports (alphabetical)
import requests  # pip install requests
import pytest   # pip install pytest

# Local application imports
from mypackage.utils import helper_function
from mypackage.models import DataProcessor

# Optional imports with error handling
try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("PIL not available, image processing disabled")

def main():
    """Main function."""
    pass

if __name__ == "__main__":
    main()

```

### Installation Commands

```bash
# Core modules are built-in, no installation needed

# Third-party modules
pip install requests
pip install pytest
pip install pillow

```

### Documentation Quick Links

- [Python Standard Library](https://docs.python.org/3/library/)
- [PyPI - Python Package Index](https://pypi.org/)
- [pip Documentation](https://pip.pypa.io/en/stable/)

**Remember:** Always check if a standard library module exists before installing third-party alternatives! 🐍✨
