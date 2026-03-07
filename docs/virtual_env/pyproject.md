---
title: PyProject
---
## 🎯 What is pyproject.toml?

### Simple Explanation

Think of `pyproject.toml` as the **"instruction manual"** for your Python project.

It tells:
- **What** your project is (name, description)
- **What it needs** to run (dependencies like requests, pydantic)
- **How to build** it (which tools to use)
- **How tools should behave** (ruff, black, pytest settings)

All in **one file** instead of scattered across many files.

### Technical Definition

`pyproject.toml` is the **standardized configuration file** for modern Python projects, defined by:
- **PEP 518** (2017): Specifies build system requirements
- **PEP 621** (2020): Standardizes project metadata format
- **PEP 517** (2017): Defines how build tools execute

**Key characteristics:**
- Uses **TOML format** (Tom's Obvious Minimal Language) - human-readable
- **Single source of truth** for project configuration
- **Tool-agnostic** - works with any compliant build backend
- **Replaces** old `setup.py`, `setup.cfg`, scattered config files

---

## 🤔 Why Does It Exist?

### The Old Problem (Before pyproject.toml)

**Scenario:** You want to install a Python package from source.

```bash
# Old way
python setup.py install
```

**Problems:**
1. **Chicken-and-egg:** To run `setup.py`, you need setuptools installed. But how do you know what version?
2. **No standards:** Every tool (setuptools, flit, poetry) had different ways to specify metadata
3. **Scattered config:** Project info in `setup.py`, tool settings in `.coveragerc`, `.flake8rc`, `pytest.ini`, etc.
4. **Not declarative:** `setup.py` is executable Python code - can't reliably introspect dependencies without running it
5. **Assumptions:** pip assumed every project used setuptools, limiting ecosystem innovation

### The Modern Solution (With pyproject.toml)

**Scenario:** Same installation, modern way.

```bash
# Modern way
pip install .
# or
uv sync
```

**What happens behind the scenes:**
1. Tool reads `pyproject.toml`
2. Sees which **build backend** project uses (setuptools, hatchling, poetry, etc.)
3. Creates **isolated virtual environment**
4. Installs build tools in isolation
5. Runs standardized build API (PEP 517)
6. Produces wheel/sdist reliably

**Benefits:**
- ✅ **Build isolation** - no conflicts between projects' build tools
- ✅ **Tool choice** - use setuptools, hatchling, poetry, flit, maturin, etc.
- ✅ **Version control** - specify exact build tool versions
- ✅ **Single config** - all metadata and tool settings in one file
- ✅ **Reproducible builds** - same inputs = same outputs

---

## 🏗️ Core Structure

### File Organization

```toml
# ==================
# BUILD CONFIGURATION
# ==================
[build-system]
# How to build this package

# ==================
# PROJECT METADATA
# ==================
[project]
# What this project is

[project.optional-dependencies]
# Extra dependencies (dev, test, docs)

[project.scripts]
# CLI commands

[project.urls]
# Project links

# ==================
# TOOL CONFIGURATION
# ==================
[tool.ruff]
[tool.black]
[tool.mypy]
[tool.pytest.ini_options]
[tool.coverage.run]
# etc.
```

### Three Main Tables

1. **`[build-system]`** - Required, tells how to build
2. **`[project]`** - Project metadata (PEP 621 standard)
3. **`[tool.*]`** - Tool-specific configurations

---

## 📦 Essential Elements Explained

Using your file as the reference example.

---

### 1️⃣ [build-system] - The Builder

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build_meta"
```

#### What It Means

**`requires`** - Build-time dependencies (NOT runtime)
- Packages needed to **build** your project (create wheel/sdist)
- Installed in isolated environment during build
- Example: `["setuptools>=61", "wheel"]` or `["hatchling"]`

**`build-backend`** - Which build system to use
- The tool that reads your config and builds the package
- Common choices:
  - `setuptools.build_meta` - Traditional, most common
  - `hatchling.build_meta` - Modern, fast, minimal
  - `poetry.core.masonry.api` - If using Poetry
  - `flit_core.buildapi` - If using Flit

---

### 2️⃣ [project] - Core Metadata

The heart of your project definition.

#### Essential Fields (Always Include)

```toml
[project]
name = "project-name"              # Package identifier
version = "0.1.0"                  # Current version
description = "..."                # One-line summary
requires-python = ">=3.12"         # Minimum Python version
```

**Breakdown:**

**`name`**
- Use lowercase, hyphens for multi-word: `my-automation-tool`

**`version`**
- Current release version
- Use semantic versioning: `MAJOR.MINOR.PATCH`
- Enables upgrades, dependency resolution

**`description`**
- Short (one sentence) summary
- Shows in `pip show` output

**`requires-python`**
- Minimum Python version to run your project
- Prevents installation on incompatible Python versions
- Examples:
  - `">=3.12"` - Python 3.12 or newer
  - `">=3.11,<3.14"` - Between 3.11 and 3.14

#### Important Optional Fields

```toml
readme = {file= "README.md", content-type = "text/markdown"}
license = {text = "MIT"}
authors = [
    {name = "Your Name", email = "you@example.com"}
]
keywords = ["automation", "webhook", "sync"]
classifiers = [
    "Development Status :: 4 - Beta",
    "Programming Language :: Python :: 3.12",
    "License :: OSI Approved :: MIT License",
]
```

**`readme`**
- Points to your README file
- Auto-displays on PyPI and repo viewers
- Supports Markdown or reStructuredText

**`authors`**
- List of maintainers with contact info
- Shows who to reach for questions/issues

**`keywords`**
- Searchability on PyPI
- Help users discover your package
- 3-5 relevant terms

**`classifiers`**
- Standard PyPI metadata tags
- Categories: development status, Python versions, license, audience
- Full list: https://pypi.org/classifiers/
- Common for automation:
  ```toml
  "Development Status :: 4 - Beta",
  "Intended Audience :: Developers",
  "Topic :: System :: Systems Administration",
  "Operating System :: OS Independent",
  ```

---

### 3️⃣ dependencies - Runtime Requirements

```toml
dependencies = [
    "python-dotenv",
    "pydantic>=2.0,<3.0",
    "requests>=2.32",
    "httpx",
]
```

#### What Goes Here

**Rule:** Packages your application **CANNOT run without**.

Examples for automation:
- HTTP clients: `requests`, `httpx`
- Configuration: `python-dotenv`, `pydantic`
- Database: `sqlalchemy`, `alembic`
- Date/time: `python-dateutil`

#### Version Specification Strategies

**1. No version (not recommended for production)**
```toml
"requests"  # Gets whatever is latest
```
- ✅ Simple, easy
- ❌ Unpredictable, can break unexpectedly
- 🎯 Use for: Quick prototypes only

**2. Minimum version**
```toml
"requests>=2.32.0"  # At least 2.32.0, no upper limit
```
- ✅ Allows updates
- ❌ May get breaking changes in future major versions
- 🎯 Use for: Stable libraries with good semver practices

**3. Bounded range (RECOMMENDED for automation)**
```toml
"pydantic>=2.0,<3.0"  # Any 2.x version, not 3.x
```
- ✅ Safe upgrades within major version
- ✅ Protects against breaking changes
- ✅ Works with lockfiles for reproducibility
- 🎯 Use for: Production automation

**4. Exact pin (too strict)**
```toml
"requests==2.32.0"  # Exactly 2.32.0, nothing else
```
- ✅ Maximum predictability
- ❌ No security updates
- ❌ Dependency conflicts with other packages
- 🎯 Use for: Only when absolutely necessary

#### Best Practice: Range + Lockfile

**In pyproject.toml (flexible):**
```toml
dependencies = [
    "requests>=2.32,<3.0",
    "pydantic>=2.0,<3.0",
]
```

**In uv.lock or poetry.lock (exact):**
```
requests==2.32.3
pydantic==2.5.2
```

**Workflow:**
1. Specify ranges in `pyproject.toml` (allows safe updates)
2. Lock exact versions in `uv.lock` (reproducible deploys)
3. Deploy using lockfile (everyone gets same versions)
4. Periodically run `uv sync --upgrade` to update lock

**Result:** Flexibility + reproducibility + safety.

---

### 4️⃣ [project.optional-dependencies] - Dev/Test/Docs

```toml
[project.optional-dependencies]
dev = [
    "ruff>=0.1.0",
    "black>=23.0.0",
    "mypy>=1.7.0",
]

test = [
    "pytest>=7.4.0",
    "pytest-cov>=4.1.0",
]

docs = [
    "mkdocs>=1.5.0",
    "mkdocs-material>=9.4.0",
]

all = [
    "project-name[dev,test,docs]"
]
```

#### What Are Optional Dependencies?

Packages that are **not required to run the app**, but needed for:
- **Development** (linters, formatters, type checkers)
- **Testing** (pytest, coverage tools)
- **Documentation** (mkdocs, sphinx)

#### Why Separate Them?

**Production vs Development:**
- Production server only needs runtime deps (smaller images)
- Developers need all the tooling
- CI needs test deps but not dev deps

**Installation Examples:**
```bash
# Install just runtime dependencies
uv sync

# Install dev tools
uv sync --extra dev

# Install test tools
uv sync --extra test

# Install everything
uv sync --all-extras
# or
uv sync --extra all
```

#### Common Groups for Automation

**dev (code quality)**
```toml
dev = [
    "ruff>=0.1.0",           # Fast linter
    "black>=23.0.0",         # Code formatter
    "mypy>=1.7.0",           # Type checker
    "pre-commit>=3.5.0",     # Git hooks
    "bandit>=1.7.0",         # Security scanner
]
```

**test (testing framework)**
```toml
test = [
    "pytest>=7.4.0",              # Test runner
    "pytest-cov>=4.1.0",          # Coverage plugin
    "pytest-mock>=3.12.0",        # Mocking
    "pytest-asyncio>=0.21.0",     # Async testing
    "responses>=0.24.0",          # HTTP mocking
]
```

**docs (documentation)**
```toml
docs = [
    "mkdocs>=1.5.0",              # Doc generator
    "mkdocs-material>=9.4.0",     # Theme
    "mkdocstrings[python]>=0.23.0", # API docs from docstrings
]
```

---

### 5️⃣ [project.scripts] - CLI Commands

```toml
[project.scripts]
automation = "src.main:main"
my-tool = "src.cli:run"
```

#### What This Does

Turns Python functions into **shell commands**.

**Before install:**
```bash
python -m src.main  # Awkward
python src/main.py  # Fragile
```

**After install:**
```bash
automation          # Clean!
my-tool --help      # Professional!
```

#### Format

```toml
command-name = "package.module:function"
```

**Example:**
```toml
[project.scripts]
automation = "src.main:main"
```

**Creates:** A command called `automation` that calls `main()` function from `src/main.py`.

#### Real-World Usage

```python
# src/main.py
def main():
    """Main entry point for automation."""
    print("Running automation...")
    # Your automation logic here

if __name__ == "__main__":
    main()
```

**After `uv sync`:**
```bash
$ automation
Running automation...
```

#### Why This Matters for Automation

- ✅ **Professional:** Users just run `automation`, not `python src/main.py`
- ✅ **Portable:** Works regardless of where package is installed
- ✅ **Standard:** Uses Python packaging conventions
- ✅ **Shell integration:** Autocomplete, help, etc.

#### Multiple Entrypoints

```toml
[project.scripts]
automation = "src.main:main"
automation-worker = "src.worker:run"
automation-migrate = "src.migrate:migrate_db"
```

Creates three commands: `automation`, `automation-worker`, `automation-migrate`.

---

### 6️⃣ [project.urls] - Project Links

```toml
[project.urls]
Homepage = "https://github.com/username/project"
Repository = "https://github.com/username/project"
Issues = "https://github.com/username/project/issues"
Documentation = "https://docs.example.com"
Changelog = "https://github.com/username/project/releases"
```

#### What This Does

- Shows in `pip show project-name` output
- Visible on PyPI listing
- Helps users find docs, report bugs, view source

#### Why Include

- ✅ **Discoverability:** Users know where to get help
- ✅ **Professional:** Shows project is maintained
- ✅ **Contribution:** Clear path for contributors
- ✅ **Support:** Easy bug reporting

---

## 🔧 Tool Configuration

Modern Python tools support `[tool.*]` sections in `pyproject.toml`.

**Benefits:**
- Single source of truth
- No scattered config files
- Easy onboarding
- Consistent CI/local behavior

---

### [tool.setuptools.*] - Setuptools Config

```toml
[tool.setuptools.packages.find]
where = ["."]
include = ["src*"]
```

**Purpose:** Tell setuptools where your Python packages are.

**Common patterns:**

**src layout (recommended):**
```toml
[tool.setuptools.packages.find]
where = ["."]
include = ["src*"]
```
Project structure:
```
project/
├── src/
│   └── mypackage/
│       ├── __init__.py
│       └── main.py
├── tests/
└── pyproject.toml
```

**flat layout:**
```toml
[tool.setuptools.packages.find]
where = ["."]
include = ["mypackage*"]
exclude = ["tests*"]
```
Project structure:
```
project/
├── mypackage/
│   ├── __init__.py
│   └── main.py
├── tests/
└── pyproject.toml
```

---

### [tool.uv] - UV Package Manager

```toml
[tool.uv]
cache-dir = ".uv-cache"
```

**Purpose:** UV-specific configuration.

**Common settings:**
- `cache-dir`: Where to cache downloaded packages
- `python`: Pin Python version for project

**Why UV:**
- 10-100x faster than pip
- Built-in lockfile support
- Better dependency resolution
- Written in Rust

---

### [tool.ruff] - Linter & Formatter

```toml
[tool.ruff]
target-version = "py312"
line-length = 88
include = ["src/**/*.py", "tests/**/*.py"]

[tool.ruff.lint]
select = [
    "E",   # pycodestyle errors
    "W",   # pycodestyle warnings
    "F",   # pyflakes
    "I",   # isort (import sorting)
    "N",   # pep8-naming
    "UP",  # pyupgrade (modernize code)
    "B",   # flake8-bugbear (find bugs)
    "A",   # flake8-builtins (shadowing builtins)
    "C4",  # flake8-comprehensions (better comprehensions)
    "T20", # flake8-print (catch print statements)
    "SIM", # flake8-simplify (simplify code)
]

ignore = [
    "E501",  # line too long (handled by formatter)
    "T201",  # print allowed in CLI applications
]

[tool.ruff.lint.per-file-ignores]
"__init__.py" = ["F401"]      # Allow unused imports
"tests/**/*.py" = ["S101"]    # Allow assert in tests
```

#### Key Settings Explained

**`target-version`** - Python version syntax rules
- Affects which Python features Ruff expects
- Should match `requires-python`

**`line-length`** - Max characters per line
- Default: 88 (Black's default)
- Keep consistent with Black

**`select`** - Which rule categories to enforce
- Start with basics: `["E", "F", "W", "I"]`
- Add more as team matures: `["B", "UP", "SIM"]`

**`ignore`** - Disable specific rules
- `E501`: Line length (let formatter handle)
- `T201`: Allow `print()` in CLI apps

**`per-file-ignores`** - Different rules for different files
- `__init__.py`: Allow unused imports (re-exports)
- `tests/`: Allow `assert` statements

#### Why Ruff for Automation

- ✅ **Fast:** 10-100x faster than traditional linters
- ✅ **Replaces multiple tools:** Flake8, isort, pyupgrade, etc.
- ✅ **Auto-fix:** `ruff check --fix` auto-fixes many issues
- ✅ **Modern:** Actively developed, fast bug fixes

---

### [tool.black] - Code Formatter

```toml
[tool.black]
line-length = 88
target-version = ['py312']
include = '\\.pyi?$'
extend-exclude = '''
/(
  # directories
  \\.eggs
  | \\.git
  | \\.mypy_cache
  | \\.venv
  | build
  | dist
)/
'''
```

#### Key Settings

**`line-length`** - Max line length
- Default: 88
- **MUST match Ruff's `line-length`** for consistency

**`target-version`** - Python version
- Affects code style choices
- **MUST match Ruff's `target-version`**

#### Why Black

- ✅ **No debates:** Opinionated, minimal config
- ✅ **Consistent:** Same code style across all projects
- ✅ **Fast:** Reformats entire codebase in seconds
- ✅ **IDE integration:** Works with VS Code, PyCharm, etc.

---

### [tool.mypy] - Type Checker

```toml
[tool.mypy]
python_version = "3.12"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
check_untyped_defs = true
disallow_untyped_decorators = true
no_implicit_optional = true
warn_redundant_casts = true
warn_unused_ignores = true
warn_no_return = true
warn_unreachable = true
strict_equality = true

[[tool.mypy.overrides]]
module = [
    "dotenv.*",
    "decouple.*",
]
ignore_missing_imports = true
```

#### Key Settings

**`python_version`** - Python version to check against
- Should match `requires-python` and Ruff/Black

**Strict checking flags:**
- `disallow_untyped_defs`: All functions must have type hints
- `warn_return_any`: Catch functions returning `Any`
- `strict_equality`: Prevent comparing incompatible types

**`[[tool.mypy.overrides]]`** - Per-module settings
- For third-party libs without type stubs
- `ignore_missing_imports = true`: Don't error on missing types

#### Why MyPy for Automation

- ✅ **Catch bugs early:** Type errors found before runtime
- ✅ **Better IDE support:** Autocomplete, refactoring
- ✅ **Documentation:** Types are self-documenting
- ✅ **Refactoring confidence:** Safe large-scale changes

#### Example Type Hints

```python
def process_webhook(payload: dict[str, Any]) -> bool:
    """Process incoming webhook payload."""
    if not payload:
        return False
    # MyPy ensures we handle all code paths
    return True
```

---

### [tool.pytest.ini_options] - Test Configuration

```toml
[tool.pytest.ini_options]
minversion = "6.0"
addopts = "-ra -q --strict-markers --strict-config"
testpaths = ["tests"]
python_files = ["test_*.py", "*_test.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]
markers = [
    "slow: marks tests as slow (deselect with '-m \"not slow\"')",
    "integration: marks tests as integration tests",
]
```

#### Key Settings

**`testpaths`** - Where to find tests
- Usually `["tests"]` or `["tests", "integration_tests"]`

**`addopts`** - Default options for pytest
- `-ra`: Show all test results
- `-q`: Quiet (less output)
- `--strict-markers`: Error on typo in test markers
- `--strict-config`: Error on invalid config

**`python_files`** - Test file patterns
- `test_*.py`: Standard pattern (`test_auth.py`)
- `*_test.py`: Alternative pattern (`auth_test.py`)

**`markers`** - Custom test categories
- Mark slow tests: `@pytest.mark.slow`
- Mark integration tests: `@pytest.mark.integration`

#### Usage Examples

```bash
# Run all tests
pytest

# Skip slow tests
pytest -m "not slow"

# Run only integration tests
pytest -m integration

# Run with coverage
pytest --cov=src --cov-report=html
```

#### Example Test with Markers

```python
import pytest

@pytest.mark.slow
def test_large_dataset():
    """This test takes 30 seconds."""
    # Slow operation
    pass

@pytest.mark.integration
def test_external_api():
    """Tests real API call."""
    # Integration test
    pass
```

---

### [tool.coverage.*] - Coverage Configuration

```toml
[tool.coverage.run]
source = ["src"]
omit = [
    "*/tests/*",
    "*/test_*",
    "*/__pycache__/*",
]

[tool.coverage.report]
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "if self.debug:",
    "raise AssertionError",
    "raise NotImplementedError",
    "if __name__ == .__main__.:",
    "@(abc\\.)?abstractmethod",
]
```

#### Key Settings

**`source`** - What to measure coverage for
- Usually `["src"]` or your package name

**`omit`** - Files to exclude from coverage
- Test files themselves
- `__pycache__` directories

**`exclude_lines`** - Code patterns to ignore
- `pragma: no cover`: Explicit exclusion
- `if __name__ == "__main__"`: Script entry points
- `raise NotImplementedError`: Abstract methods

#### Usage

```bash
# Run tests with coverage
pytest --cov=src --cov-report=html

# View HTML report
open htmlcov/index.html
```

#### Why Coverage Matters

- ✅ **Find untested code:** Identify gaps in test suite
- ✅ **Quality metric:** Track testing quality over time
- ✅ **Refactoring confidence:** Ensure changes are tested
- ❌ **Not a goal:** 100% coverage ≠ good tests
