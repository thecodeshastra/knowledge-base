---
title: reStructuredText (RST)
---

# reStructuredText (RST)

**Powerful markup for Python ecosystem. More verbose than Markdown.**

---

## Basic Syntax

```rst
Document Title
==============

Section Title
=============

Subsection
----------

Subsubsection
^^^^^^^^^^^^^
```

---

## Text Formatting

```rst
*italic text*
**bold text**
``literal/code text``

# Lists
* Bullet 1
* Bullet 2
  * Nested

1. First
2. Second
#. Auto-numbered

# Definition list
term
    Definition of term

another term
    Its definition
```

---

## Links

```rst
# Inline links
`Link text <https://example.com>`_

# Separate definitions
This refers to Python_.

.. _Python: https://python.org

# Internal references
See section-title_ for details.

.. _section-title:

Section Title
=============
```

---

## Code Blocks

```rst
# Simple code block
Here is some code::

    def hello():
        print("Hello")

# With syntax highlighting
.. code-block:: python
   :linenos:
   :emphasize-lines: 2

   def greet(name):
       message = f"Hello, {name}!"
       return message
```

---

## Tables

```rst
# Simple table
=====  =====  ======
  A      B    Output
=====  =====  ======
True   True   True
True   False  False
False  True   False
=====  =====  ======

# Grid table
+--------+--------+
| Header | Header |
+========+========+
| Data   | Data   |
+--------+--------+
```

---

## Directives (Block Elements)

```rst
# Images
.. image:: path/to/image.png
   :width: 200px
   :alt: Alt text

# Notes/Warnings
.. note::
    This is a note.

.. warning::
    This is important!

.. important::
    Critical information.

.. tip::
    Helpful hint.

# Table of contents
.. contents:: Table of Contents
   :depth: 2

# Include files
.. include:: other-file.rst
```

---

## Roles (Inline Elements)

```rst
# Text roles
:strong:`bold`
:emphasis:`italic`
:literal:`code`
:subscript:`H2O`
:superscript:`E=mc2`

# Python-specific (Sphinx)
:py:func:`function_name`
:py:class:`ClassName`
:py:mod:`module_name`
:py:attr:`attribute_name`
:doc:`document_name`
:ref:`reference-label`
```

---

## Best For

- ✅ Python projects
- ✅ Technical documentation
- ✅ Docstring documentation
- ✅ Complex structured content
- ✅ Sphinx projects

---

## Pros ✅

- Powerful, flexible
- Python standard
- Sphinx integration
- Auto-generate API docs
- Good for technical writing

---

## Cons ❌

- Verbose syntax
- Steep learning curve
- More markup than Markdown
- Less intuitive

---

## Example Project Structure

```bash
docs/
├── conf.py              # Sphinx config
├── index.rst            # Main page
├── api/
│   ├── modules.rst      # Auto-generated
│   └── functions.rst
├── guides/
│   ├── installation.rst
│   └── configuration.rst
└── _build/              # Generated output
    └── html/
```

---

## Common Commands

```bash
# Convert to HTML
rst2html.py input.rst output.html

# Convert to PDF
rst2pdf input.rst output.pdf

# Sphinx build
sphinx-build -b html docs/ docs/_build/html

# Watch for changes
sphinx-autobuild docs/ docs/_build/html
```

---

## Cross-References

```rst
.. _my-reference:

My Section
==========

Content here.

Refer to my-reference_ from anywhere in the docs.

# Or with explicit text
See `my section <my-reference>`_ for details.
```

---

## Comments

```rst
.. This is a comment
   It won't appear in output

.. |variable| replace:: replacement text

|variable| will be replaced with replacement text
```

---

## Math (Sphinx Extension)

```rst
# Inline math
Use the formula :math:`E=mc^2` in your text.

# Display math
.. math::

   E = mc^2

   \frac{a}{b} = c
```
