---
title: Tox
---

# Tox

`tox` is a **testing automation tool**

It runs your tests against **multiple Python versions** simultaneously + automates linting, type-checking, and other workflows.

---

## Why use tox?

- 🔄 Test against Python 3.9, 3.10, 3.11, 3.12 at once
- 🧹 Automate: tests + lint + type-check + docs
- 📦 Libraries must support multiple Python versions (tox proves it)
- 🏗️ Creates **isolated test environments** (like venv but automated)
- 🚀 CI/CD friendly (GitHub Actions, GitLab CI, etc. use tox)

**Tl;dr:** If you're building a library/package → tox is non-negotiable.

---

## When to use tox vs venv/uv

| Use case | Tool |
| ---------- | ------ |
| Single project development | venv / uv |
| Testing multiple Python versions | **tox** ✓ |
| Library/package (must support v3.9-3.12) | **tox** ✓ |
| Testing + linting + type-checking pipeline | **tox** ✓ |
| Web app deployment (one Python version) | venv / uv |

---

## Install tox

### Global (recommended)

```bash
pip install tox
```

Or with uv:

```bash
uv tool install tox
```

### Check installation

```bash
tox --version
```

---

## 1️⃣ Configure tox: Create tox.ini

In your project root, create **`tox.ini`**:

```ini
[tox]
envlist = py39,py310,py311,py312,lint,type,docs

[testenv]
deps = 
    pytest
    pytest-cov
    requests
commands = 
    pytest {posargs}
    pytest --cov=myapp

[testenv:lint]
deps = 
    flake8
    black
    isort
commands =
    black --check .
    isort --check-only .
    flake8 .

[testenv:type]
deps = 
    mypy
    types-requests
commands =
    mypy myapp

[testenv:docs]
deps = 
    sphinx
    sphinx-rtd-theme
commands =
    sphinx-build -b html docs docs/_build
```

**What this does:**

- `envlist`: Test on py39, py310, py311, py312, plus lint/type/docs environments
- `[testenv]`: Base test environment (runs pytest)
- `[testenv:lint]`: Linting environment (runs flake8, black, isort)
- `[testenv:type]`: Type-checking environment (runs mypy)
- `[testenv:docs]`: Documentation environment (runs sphinx)

---

## 2️⃣ Modern: Use tox.toml instead

If your project uses `pyproject.toml`, you can use **`tox.toml`** (modern approach):

```toml
[tool.tox]
legacy_tox_ini = "tox.ini"

[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"
```

Or full tox config in `pyproject.toml`:

```toml
[tool.tox]
envlist = ["py39", "py310", "py311", "py312", "lint", "type"]

[tool.tox.testenv]
deps = ["pytest", "pytest-cov"]
commands = ["pytest"]
```

**Note:** `tox.ini` is more common (works everywhere). `tox.toml` is newer and cleaner.

---

## 3️⃣ Run all tests

```bash
tox
```

This runs:

- Tests on py39, py310, py311, py312
- Lint environment
- Type-checking environment
- Docs environment

Output shows which environments **PASSED** or **FAILED**.

---

## 4️⃣ Run specific environment

```bash
tox -e py311
```

Run only Python 3.11 tests.

```bash
tox -e lint
```

Run only linting environment.

```bash
tox -e py310,py311
```

Run Python 3.10 and 3.11.

---

## 5️⃣ Skip certain environments

```bash
tox -e py39,py310,py311,py312 --skip-missing-interpreters
```

Skip if Python version not installed (don't fail).

```bash
tox -e py39,py310 -x
```

Stop on first failure (`-x` flag).

---

## 6️⃣ Rebuild environments

By default, tox **caches environments**. Rebuild if dependencies changed:

```bash
tox -r
```

Or recreate specific environment:

```bash
tox -e py311 -r
```

---

## 7️⃣ Pass arguments to tests

```bash
tox -e py311 -- -v
```

Pass `-v` (verbose) to pytest.

```bash
tox -- tests/test_auth.py::test_login
```

Run specific test file.

---

## 8️⃣ List all environments

```bash
tox -l
```

Shows:

```toml
py39
py310
py311
py312
lint
type
docs
```

---

## 9️⃣ Parallel execution

```bash
tox -p
```

Run environments in parallel (faster).

```bash
tox -p 4
```

Run 4 environments at once.

---

## 🔁 One Real Project Example

**Scenario:** Building a Python library that needs to support Python 3.9–3.12.

### Step 1: Create tox.ini

```bash
cat > tox.ini << 'EOF'
[tox]
envlist = py39,py310,py311,py312,lint

[testenv]
deps = 
    pytest
    pytest-cov
    requests
commands = 
    pytest tests/
    pytest --cov=mylib --cov-report=term-missing

[testenv:lint]
deps = 
    black
    isort
    flake8
commands =
    black --check .
    isort --check-only .
    flake8 .
EOF
```

### Step 2: Install tox

```bash
pip install tox
```

### Step 3: Run all environments

```bash
tox
```

Output:

```toml
py39 create: /project/.tox/py39
py39 install: pytest, pytest-cov, requests
py39 run-test-base: pytest tests/
...
PASSED: py39
PASSED: py310
PASSED: py311
PASSED: py312
PASSED: lint
```

✅ All environments pass = library works on Python 3.9–3.12.

### Step 4: Use in CI/CD (GitHub Actions)

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.9', '3.10', '3.11', '3.12']
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
      - run: pip install tox
      - run: tox -e py${{ matrix.python-version }}
```

---

## 🧠 Daily workflow to remember

```bash
# First time setup
pip install tox
cat > tox.ini << 'EOF'
[tox]
envlist = py39,py310,py311,py312,lint

[testenv]
deps = pytest
commands = pytest tests/

[testenv:lint]
deps = black,flake8
commands = black .; flake8 .
EOF

# Daily: Run tests
tox

# Specific: Test Python 3.11
tox -e py311

# Specific: Lint only
tox -e lint

# Rebuild after dependency changes
tox -r
```

---

## 🧠 Memory trick

> **"Tox = multiple test environments at once"**
>
> Think: `for py in [3.9, 3.10, 3.11, 3.12]: run_tests()`
