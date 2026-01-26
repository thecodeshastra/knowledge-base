---
title: Python Linting
---

# Python Linting

**Static code analysis. Catch bugs, enforce standards, improve quality — before running code.**

---

## What It Is (Simple)

**Think of it like a spell-checker for Python code.**

- Scans your code WITHOUT executing it
- Finds errors: unused variables, undefined names, wrong imports
- Checks style: spacing, naming, complexity
- Suggests fixes
- Integrates with editors, git hooks, CI/CD

**Why care?**

- ✅ Catch bugs early
- ✅ Consistent code style across team
- ✅ Prevent common mistakes
- ✅ Easier refactoring later
- ✅ Professional code quality

---

## The Three Main Tools

### 1. **Ruff** (Recommended - New, Fast, All-in-One)

**Speed:** 10-100x faster than others. Written in Rust. Instant feedback.

**What it checks:** Flake8 + isort + pyupgrade + pylint, all in one tool.

```bash
# Install
pip install ruff

# Check code
ruff check .

# Auto-fix issues
ruff check --fix .

# Format + check combined
ruff format .
```

**Configuration (pyproject.toml):**

```toml
[tool.ruff]
line-length = 88
target-version = "py38"

[tool.ruff.lint]
select = ["E", "F", "W", "I", "UP", "C4"]  # Error, Flake, Warning, Import, Upgrade, Comprehension
ignore = ["E501"]  # Ignore line-too-long (handled by formatter)
```

**Use case:** New projects, speed-critical, all-in-one solution. **Start here.**

---

### 2. **Flake8** (Traditional - Balanced, Extensible)

**Speed:** Moderate. Popular. Huge plugin ecosystem.

**What it checks:** PEP 8 style + logical errors (unused variables, etc.) + complexity.

```bash
# Install
pip install flake8 flake8-bugbear

# Check code
flake8 .
```

**Configuration (.flake8 or pyproject.toml):**

```ini
[flake8]
max-line-length = 88
extend-ignore = E203, W503
exclude = .git,__pycache__,build,dist
per-file-ignores =
    __init__.py:F401
```

**Or in pyproject.toml:**

```toml
[tool.flake8]
max-line-length = 88
extend-ignore = ["E203", "W503"]
exclude = [".git", "__pycache__", "build", "dist"]
```

**Popular plugins:**

- `flake8-bugbear` - Extra bug checks
- `flake8-comprehensions` - Better list comprehensions
- `flake8-docstrings` - Docstring style (PEP 257)
- `flake8-annotations` - Type hint style

**Use case:** Legacy projects, need extensibility, team preference.

---

### 3. **Pylint** (Comprehensive - Most Thorough, Configurable)

**Speed:** Slower. Most checks. Highest noise out-of-box.

**What it checks:** Everything. Very strict. Code quality scoring.

```bash
# Install
pip install pylint

# Check code (verbose)
pylint src/

# Generate score
pylint --score=yes src/
```

**Configuration (.pylintrc or pyproject.toml):**

```ini
[MESSAGES CONTROL]
disable=missing-docstring,too-few-public-methods

[FORMAT]
max-line-length=88

[DESIGN]
max-attributes=7
max-locals=15
```

**Or in pyproject.toml:**

```toml
[tool.pylint.messages_control]
disable = ["missing-docstring", "too-few-public-methods"]

[tool.pylint.format]
max-line-length = 88
```

**Use case:** Mature projects, strict requirements, legacy codebases needing cleanup.

---

### 4. **Black** (Formatter - Simple, Opinionated, Automatic)

**Role:** Code **formatter**, not a linter. It rewrites your Python code into a consistent style automatically.

**Philosophy:** “One obvious way to format.” Very few options, so every file in the repo (and across teams) looks the same.

```bash
# Install
pip install black

# Format a single file
black main.py

# Format entire project
black .
```

**Configuration (pyproject.toml):**

```toml
[tool.black]
line-length = 88
target-version = ["py38"]
```

**Use case:** Make all code look the same, avoid style debates, and pair it with Ruff (linting) for a fast, modern setup.

---

## Recommended Stack

**For new projects:**

```bash
pip install ruff black pytest
```

**One pyproject.toml, handles everything:**

```toml
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "my-package"
version = "0.1.0"
requires-python = ">=3.8"

[tool.ruff]
line-length = 88
target-version = "py38"

[tool.ruff.lint]
select = ["E", "F", "W", "I", "UP"]
ignore = ["E501"]

[tool.black]
line-length = 88
target-version = ["py38"]

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-v"
```

**Development workflow:**

```bash
# Format code (Black handles formatting, Ruff handles linting)
ruff format .
ruff check --fix .

# Run tests
pytest

# Pre-commit hook
pre-commit install
```

---

## Error Codes Explained

### Ruff/Flake8 Error Codes

| Code | Meaning | Fix |
| ------ | --------- | ----- |
| **E101** | Indentation contains mixed spaces/tabs | Use spaces only (4 spaces per level) |
| **E302** | Expected 2 blank lines before function | Add blank lines |
| **W293** | Blank line contains whitespace | Remove trailing whitespace |
| **F401** | Unused import | Remove unused import |
| **F841** | Unused variable | Delete or use the variable |
| **E999** | Syntax error | Fix Python syntax |
| **C901** | Function too complex | Simplify function |
| **I001** | Import ordering wrong | Use `isort` or `ruff --fix` |

---

## Integration Points

### Pre-Commit Hooks (Automatic Before Git Commit)

**.pre-commit-config.yaml:**

```yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: https://github.com/psf/black
    rev: 23.0.0
    hooks:
      - id: black
```

**Setup:**

```bash
pip install pre-commit
pre-commit install
pre-commit run --all-files  # Test once
```

**Now, `git commit` auto-runs linting before commit.** If fails, fix and retry.

---

### GitHub Actions (CI/CD)

**.github/workflows/lint.yml:**

```yaml
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: "3.11"
      - run: pip install ruff black pytest
      - run: ruff check .
      - run: black --check .
      - run: pytest
```

---

## Common Issues & Fixes

### Issue 1: Too Many Errors

```bash
# See what Ruff would fix
ruff check . --select F401,E501,W291

# Auto-fix everything
ruff check --fix .
ruff format .
```

### Issue 2: Line Too Long (E501)

**Option A:** Configure line length in pyproject.toml

```toml
[tool.ruff]
line-length = 100
```

**Option B:** Ignore for specific lines

```python
# Some code here  # noqa: E501
```

### Issue 3: Unused Import (F401)

```python
# WRONG
import os
import sys
print("Hello")

# RIGHT - remove unused imports
print("Hello")
```

**Auto-fix:**

```bash
ruff check --fix .
```

### Issue 4: Flake8 Plugin Conflicts

Sometimes plugins conflict. Best solution: **use Ruff (no plugin conflicts).**

---

## Decision Matrix: Which Tool?

| Need | Tool |
| ------ | ------ |
| **New project, speed important** | **Ruff** ✅ |
| **Team already uses Flake8** | **Flake8** |
| **Legacy code, strict audit** | **Pylint** |
| **Maximum customization** | **Pylint** |
| **All-in-one, simple** | **Ruff** |
| **Rich plugin ecosystem** | **Flake8** |

---

## Common Commands

```bash
# Check everything
ruff check .

# Auto-fix everything
ruff check --fix .

# Format code
black .
ruff format .

# Check specific rule
ruff check --select F401 .

# Ignore specific rule
ruff check --ignore E501 .

# Check with detailed output
ruff check --show-source .

# Generate config
ruff config --output pyproject.toml

# Integration with formatter
ruff format . && ruff check --fix .
```

---

## Advanced: Custom Rules

### Disable Specific Checks

```toml
[tool.ruff.lint]
ignore = ["E501", "W503"]  # Ignore line-too-long, line-break-before-binary-operator
```

### Ignore for Single Line

```python
def very_long_function_name_that_exceeds_line_limit():  # noqa: E501
    pass
```

### Ignore for Entire File

```python
# ruff: noqa
# All checks disabled for this file
```

### Project-Specific Rules

```toml
[tool.ruff.lint]
select = ["E", "F", "W", "I"]  # Only error, flake, warning, import

# Per-file rules
[tool.ruff.lint.per-file-ignores]
"__init__.py" = ["F401"]  # Ignore unused imports in __init__
"tests/**" = ["F401", "F841"]  # Unused in tests OK
```

---

## Troubleshooting

**Ruff won't auto-fix?**

```bash
ruff check --fix . --unsafe-fixes  # Allow risky fixes
```

**Conflicts between Ruff and Black?**

```toml
[tool.ruff]
line-length = 88
[tool.black]
line-length = 88  # Match Ruff's line length
```

**Pre-commit failing?**

```bash
pre-commit run --all-files
pre-commit autoupdate
```

**Need to see all errors?**

```bash
ruff check . --show-source --statistics
```

---

## One-Liner Cheat Sheet

```bash
# Setup (new project)
pip install ruff black && ruff config > pyproject.toml

# Check
ruff check .

# Auto-fix
ruff check --fix . && ruff format .

# Pre-commit
pre-commit install && pre-commit run --all-files

# CI (GitHub Actions)
ruff check . && black --check . && pytest

# Clean up everything
ruff check --fix . --unsafe-fixes && ruff format .
```
