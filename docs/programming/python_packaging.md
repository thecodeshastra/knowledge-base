---
title: Python Packaging
---

# Python Packaging

**Bundle code, dependencies, and metadata into distributable packages. Standard: `wheel` + `pyproject.toml`.**

---

## What It Is (Simple)

**Think of it like this:**

- You write Python code in a folder
- You add metadata (name, version, author, requirements)
- You package it into a `.whl` or `.tar.gz` file
- Others install it with `pip install your-package`
- It becomes available everywhere (`pip`, PyPI, private registries)

**Key Distinction:**

- **Import package:** Directory with `__init__.py` (for code)
- **Distribution package:** `.whl` or `.tar.gz` file (what you distribute)

---

## Key Concepts

| Term | Meaning |
| ------ | --------- |
| **Wheel (.whl)** | Pre-built binary. Install instantly. Preferred. |
| **Source Distribution (sdist, .tar.gz)** | Source code + build instructions. Needs compilation on user's machine. Fallback. |
| **PyPI** | Public package index (pypi.org). Where `pip` downloads from. |
| **Build Backend** | Tool that creates `.whl`/`.tar.gz` (e.g., setuptools, flit, poetry). |
| **Build Frontend** | Tool that calls the backend (e.g., `pip`, `build` command). |

---

## Modern Standard: pyproject.toml

**The ONE file you need for new projects.**

```toml
[build-system]
# Tell pip how to build this package
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
# Metadata
name = "my-awesome-package"
version = "1.0.0"
description = "Brief one-liner"
readme = "README.md"
authors = [
    {name = "Your Name", email = "you@example.com"}
]
license = {text = "MIT"}

# Python version requirement
requires-python = ">=3.8"

# Dependencies
dependencies = [
    "requests>=2.25.0",
    "pydantic>=2.0",
]

# Optional dependencies (extras)
[project.optional-dependencies]
dev = ["pytest>=7.0", "black", "flake8"]
docs = ["sphinx", "sphinx-rtd-theme"]

# Links
[project.urls]
"Homepage" = "https://github.com/yourname/my-awesome-package"
"Bug Tracker" = "https://github.com/yourname/my-awesome-package/issues"
"Documentation" = "https://my-awesome-package.readthedocs.io"

# Tool configurations
[tool.setuptools.packages.find]
where = ["src"]

[tool.setuptools.package-data]
my_awesome_package = ["data/*.json"]

# Other tools
[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-v"

[tool.black]
line-length = 88

[tool.isort]
profile = "black"
```

---

## Install Your Own Package (Development)

For local testing while developing:

```bash
# Editable install (changes take effect immediately)
pip install -e .

# Or with extras
pip install -e ".[dev]"

# Run tests
pytest

# Format code
black .
isort .

# Lint
flake8
```

---

## Build & Publish to PyPI

### 1. Setup

```bash
# Install build tools
pip install build twine

# Create PyPI account
# https://pypi.org/account/register/

# Create ~/.pypirc (API token for authentication)
[distutils]
index-servers =
    pypi

[pypi]
repository = https://upload.pypi.org/legacy/
username = __token__
password = pypi-AgEIcHlwaS5vcmc... # Your API token
```

### 2. Build Distributions

```bash
# Build wheel + source distribution
python -m build

# Creates dist/ directory:
# dist/my-awesome-package-1.0.0.whl
# dist/my-awesome-package-1.0.0.tar.gz
```

### 3. Upload to PyPI

```bash
# Check if everything is OK first
twine check dist/*

# Upload to PyPI (production)
twine upload dist/*

# Or test PyPI first (sandbox)
twine upload --repository testpypi dist/*
```

### 4. Install from PyPI

```bash
# Your package is now public!
pip install my-awesome-package
```

---

## Project Structure

```bash
my-awesome-package/
├── pyproject.toml           # Configuration (required)
├── README.md                # Project description
├── LICENSE                  # MIT, Apache 2.0, etc.
├── CHANGELOG.md             # Version history
├── src/
│   └── my_awesome_package/
│       ├── __init__.py
│       ├── core.py
│       └── utils.py
├── tests/
│   ├── __init__.py
│   ├── test_core.py
│   └── test_utils.py
├── docs/                    # Optional: Sphinx documentation
│   ├── conf.py
│   └── index.rst
├── Makefile                 # Optional: Development shortcuts
├── tox.ini                  # Optional: Multi-version testing
└── .gitignore
```

---

## Optional Supporting Files

### Makefile (Development Automation)

```makefile
.PHONY: install test lint format clean build publish

install:
 pip install -e ".[dev]"

test:
 pytest

lint:
 flake8 src tests
 black --check src tests

format:
 black src tests
 isort src tests

clean:
 rm -rf build dist *.egg-info
 find . -type d -name __pycache__ -exec rm -rf {} +
 find . -type f -name "*.pyc" -delete

build:
 python -m build

publish:
 twine upload dist/*
```

Usage: `make test`, `make lint`, `make publish`, etc.

### MANIFEST.in (Include Extra Files in Source Distribution)

```manifest
# Include markdown files
include README.md
include LICENSE
include CHANGELOG.md

# Include data files
recursive-include src/my_awesome_package/data *

# Exclude development files
exclude tox.ini
exclude pytest.ini
global-exclude __pycache__
global-exclude *.pyc
```

### tox.ini (Test Multiple Python Versions)

```ini
[tox]
envlist = py38,py39,py310,py311,lint

[testenv]
deps = pytest>=7.0
commands = pytest

[testenv:lint]
deps = black,flake8,isort
commands =
    black --check src tests
    isort --check src tests
    flake8 src tests
```

Usage: `tox` runs tests on all Python versions.

---

## Versioning Strategy (Semantic Versioning)

Format: `MAJOR.MINOR.PATCH`

```markdown
1.0.0
├─ 1: Major (breaking changes)
├─ 0: Minor (new features, backward compatible)
└─ 0: Patch (bug fixes)

Examples:
1.0.0 → 1.0.1  (bug fix)
1.0.0 → 1.1.0  (new feature)
1.0.0 → 2.0.0  (breaking change)
```

**Update in `pyproject.toml`:**

```toml
[project]
version = "1.1.0"
```

---

## Publishing Checklist

- ✅ Code tested (`pytest` passing)
- ✅ Code formatted (`black`, `isort`)
- ✅ Linted (`flake8`)
- ✅ `pyproject.toml` updated (version, dependencies)
- ✅ `CHANGELOG.md` updated (describe changes)
- ✅ `README.md` updated if needed
- ✅ Build passes: `python -m build`
- ✅ Distribution checks: `twine check dist/*`
- ✅ Package installable: `pip install dist/*.whl`
- ✅ Upload to PyPI: `twine upload dist/*`

---

## Private Package Registry (Alternatives to PyPI)

### GitHub Packages (Private)

```bash
# Publish to GitHub Packages
twine upload --repository-url https://npm.pkg.github.com/YOUR_GITHUB_USER dist/*

# Install
pip install --index-url https://npm.pkg.github.com/YOUR_GITHUB_USER my-awesome-package
```

### Artifactory (Enterprise)

```bash
# Configure ~/.pypirc
[distutils]
index-servers = artifactory

[artifactory]
repository = https://artifactory.company.com/artifactory/api/pypi/python-packages
username = your-user
password = your-token

# Publish
twine upload -r artifactory dist/*
```

### Nexus (Self-hosted)

Similar to Artifactory. Configure in `.pypirc` and use `twine`.

---

## Common Mistakes & Fixes

### ❌ Mistake 1: Hardcoding version

```python
# WRONG - in __init__.py
__version__ = "1.0.0"
```

**✅ Fix:** Use `pyproject.toml` as single source of truth.

```python
# RIGHT - read from pyproject.toml
from importlib.metadata import version
__version__ = version("my-awesome-package")
```

### ❌ Mistake 2: Committing dist/ to Git

Add to `.gitignore`:

```bash
build/
dist/
*.egg-info/
```

### ❌ Mistake 3: No MANIFEST.in (missing data files)

Data files won't be included in sdist. Add:

```bash
recursive-include src/my_awesome_package/data *
```

### ❌ Mistake 4: Using setup.py for everything

Modern standard: **minimize setup.py, maximize pyproject.toml**.

```python
# setup.py (minimal, modern)
from setuptools import setup

setup()  # All config in pyproject.toml
```

---

## Quick Start (Copy-Paste)

```bash
# 1. Create project structure
mkdir my-awesome-package
cd my-awesome-package
mkdir -p src/my_awesome_package tests

# 2. Create files
touch pyproject.toml README.md LICENSE CHANGELOG.md
touch src/my_awesome_package/__init__.py
touch tests/__init__.py

# 3. Edit pyproject.toml (see template above)

# 4. Install for development
pip install -e ".[dev]"

# 5. Write code, write tests
# (in src/my_awesome_package/, tests/)

# 6. Test & lint
pytest
black src tests
flake8 src tests

# 7. Build
python -m build

# 8. Publish
pip install twine
twine upload dist/*
```

---

## Resources

- [PyPI](https://pypi.org/)
- [Packaging Guide](https://packaging.python.org/)
- [PEP 517 (Build System)](https://www.python.org/dev/peps/pep-0517/)
- [PEP 621 (pyproject.toml)](https://www.python.org/dev/peps/pep-0621/)
- [setuptools docs](https://setuptools.pypa.io/)
- [Twine docs](https://twine.readthedocs.io/)

---

## When to Use What

| Scenario | Tool |
| ---------- | ------ |
| **New package** | `setuptools` + `pyproject.toml` |
| **Complex build logic** | `setuptools` + `setup.py` |
| **Minimal, modern** | `flit` |
| **Poetry user** | `poetry` (handles everything) |
| **Publish to PyPI** | `twine` |
| **Test multiple versions** | `tox` |
| **Development workflow** | `Makefile` |

---

## One-Liner Cheat Sheet

```bash
# Install editable + dev dependencies
pip install -e ".[dev]"

# Run all checks
black . && isort . && flake8 && pytest

# Build wheel + sdist
python -m build

# Publish to PyPI
twine upload dist/*

# Check for common issues
twine check dist/*
```

**That's it. You're distributing Python packages.** 🚀
