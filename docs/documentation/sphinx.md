---
title: Sphinx
---

# Sphinx

**Auto-generate Python API documentation from code docstrings.**

---

## What It Does

- Parses Python docstrings automatically
- Generates beautiful HTML/PDF documentation
- Links function signatures to documentation
- Supports cross-references
- Industry standard for Python libraries

---

## Install & Setup

```bash
# Install Sphinx
pip install sphinx sphinx-rtd-theme

# Create project
sphinx-quickstart docs/

# Answer questions:
# - Project name: MyProject
# - Author name: Your Name
# - Release: 1.0.0
# - Language: en
```

---

## Project Structure

```bash
docs/
├── conf.py              # Configuration
├── index.rst            # Main page
├── api.rst              # API reference
├── modules.rst          # Auto-generated
└── _build/              # Output
    ├── html/
    ├── pdf/
    └── epub/
```

---

## Configuration (conf.py)

```python
# Add project source
import sys
sys.path.insert(0, '../src')

project = 'MyProject'
author = 'Your Name'
release = '1.0.0'

# Extensions
extensions = [
    'sphinx.ext.autodoc',           # Auto-doc from code
    'sphinx.ext.viewcode',          # Show source code
    'sphinx.ext.napoleon',          # Support NumPy/Google docstrings
    'sphinx.ext.intersphinx',       # Link to other projects
    'sphinx.ext.mathjax',           # Math support
    'myst_parser',                  # Markdown support
]

# Theme
html_theme = 'sphinx_rtd_theme'  # Read the Docs theme

html_theme_options = {
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 4,
}

# Output formats
master_doc = 'index'
html_static_path = ['_static']
```

---

## Auto-Document Python Code

### In index.rst or api.rst

```rst
API Reference
=============

.. autosummary::
   :toctree: generated

   mymodule.MyClass
   mymodule.my_function

.. automodule:: mymodule
   :members:
   :undoc-members:
   :show-inheritance:

.. autofunction:: mymodule.my_function

.. autoclass:: mymodule.MyClass
   :members:
   :special-members: __init__
```

---

## Python Docstring Formats

### Google Style (Recommended)

```python
def my_function(param1, param2):
    """Short description.

    Longer description that explains what
    the function does in more detail.

    Args:
        param1 (str): Description of param1.
        param2 (int): Description of param2.

    Returns:
        bool: Description of return value.

    Raises:
        ValueError: When something is wrong.

    Example:
        >>> my_function("test", 42)
        True
    """
    return True
```

### NumPy Style

```python
def my_function(param1, param2):
    """Short description.

    Parameters
    ----------
    param1 : str
        Description of param1.
    param2 : int
        Description of param2.

    Returns
    -------
    bool
        Description of return value.

    Raises
    ------
    ValueError
        When something is wrong.

    Examples
    --------
    >>> my_function("test", 42)
    True
    """
    return True
```

---

## Build Documentation

```bash
# Build HTML
make html

# Build PDF
make pdf

# Build ePub
make epub

# Clean build directory
make clean

# Watch for changes (requires sphinx-autobuild)
sphinx-autobuild docs/ docs/_build/html
```

---

## Cross-References

```rst
# Link to function
:func:`mymodule.my_function`

# Link to class
:class:`mymodule.MyClass`

# Link to module
:mod:`mymodule`

# Link to attribute
:attr:`mymodule.MyClass.attribute`

# Link to method
:meth:`MyClass.method`

# Generic reference
:ref:`my-custom-reference`
```

---

## Common Extensions

```python
# In conf.py extensions list:

'sphinx.ext.autodoc'            # Auto-doc from code
'sphinx.ext.viewcode'           # Show source links
'sphinx.ext.napoleon'           # NumPy/Google docstrings
'sphinx.ext.intersphinx'        # Link to other docs
'sphinx.ext.todo'               # TODO directive
'sphinx.ext.mathjax'            # Math formulas
'myst_parser'                   # Markdown support
'sphinx_rtd_theme'              # Read the Docs theme
'sphinxcontrib.apidoc'          # Generate API reference
'sphinx_autodoc_typehints'      # Type hints in docs
```

---

## Build & Deploy

### GitHub Pages

```bash
# Build docs
make html

# Create .nojekyll (tells GitHub to ignore Jekyll)
touch docs/_build/html/.nojekyll

# Push to gh-pages branch
ghp-import -n -p -f docs/_build/html
```

### ReadTheDocs

1. Link GitHub repo to ReadTheDocs
2. Create `readthedocs.yml` in project root:

```yaml
version: 2
build:
  os: ubuntu-20.04
  tools:
    python: "3.10"
python:
  install:
    - requirements: docs/requirements.txt
    - method: pip
      path: .
```

---

## Best For

- ✅ Python libraries
- ✅ API documentation
- ✅ Complex technical docs
- ✅ Academic/research projects
- ✅ Enterprise software

---

## Pros ✅

- Auto-generates from docstrings
- Professional output
- Integrates with ReadTheDocs
- Powerful cross-referencing
- Industry standard

---

## Cons ❌

- Steep learning curve
- RST syntax required
- Configuration heavy
- Slower build times (large projects)

---

## Quick Checklist

- ✅ Install Sphinx + theme
- ✅ Run quickstart
- ✅ Write Google-style docstrings
- ✅ Add autodoc directives
- ✅ Run `make html`
- ✅ Deploy to ReadTheDocs or GitHub Pages
