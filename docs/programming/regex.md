---
title: ReGex
---

# Regular Expressions

**Regular Expression (RegEx)** is a sequence of characters that forms a search pattern. It allows you to search, match, and manipulate strings based on specific patterns.

##

### Why Use RegEx?

- **Pattern Matching** - Find specific patterns in text
- **Data Validation** - Validate emails, phones, etc.
- **Text Processing** - Extract, replace, or split text
- **Search & Replace** - Advanced find and replace operations

### Key Concepts

- **Pattern** - The regex expression you write
- **Match** - Text that fits your pattern
- **Groups** - Capture specific parts of matches
- **Raw Strings** - Always use raw strings: `r"pattern"`

### Python Setup

```python
import re                    # Import the re module
pattern = r"your_pattern"    # Always use raw strings

```

---

## Python re Module Functions

```python
re.search(pattern, string)     # Returns first match object or None
re.findall(pattern, string)    # Returns list of all matches
re.split(pattern, string)      # Split string at each match
re.sub(pattern, repl, string)  # Replace matches with replacement
re.match(pattern, string)      # Match only at beginning
re.compile(pattern)            # Compile for reuse (faster)

```

**Quick Examples:**

```python
re.search(r'\\d+', "Age: 25")           # Find first number
re.findall(r'\\d+', "Age: 25, Score: 98") # Find all numbers: ['25', '98']
re.split(r'\\s+', "hello   world")      # Split by whitespace: ['hello', 'world']
re.sub(r'\\d+', 'X', "Age: 25")         # Replace numbers: "Age: X"

```

## Meta Characters

| Character | Meaning | Example | Matches |
| --- | --- | --- | --- |
| `.` | Any character (except newline) | `a.c` | "abc", "axc" |
| `^` | Start of string | `^hello` | "hello world" |
| `$` | End of string | `world$` | "hello world" |
| `*` | 0 or more repetitions | `ab*c` | "ac", "abc", "abbc" |
| `+` | 1 or more repetitions | `ab+c` | "abc", "abbc" |
| `?` | 0 or 1 repetition | `ab?c` | "ac", "abc" |
| `\|` | OR operator | `cat\|dog` | "cat", "dog" |
| `[]` | Character set | `[abc]` | "a", "b", "c" |
| `()` | Capturing group | `(ab)+` | "ab", "abab" |

## Character Sets and Ranges

```python
[abc]           # Matches 'a', 'b', or 'c'
[a-z]           # Any lowercase letter
[A-Z]           # Any uppercase letter
[0-9]           # Any digit
[a-zA-Z0-9]     # Any letter or digit

# Negated sets (^ means NOT)
[^abc]          # Any character EXCEPT 'a', 'b', 'c'
[^0-9]          # Any non-digit
[^a-zA-Z]       # Any non-letter

# Combinations
[0-5][0-9]      # Two digits: 00-59
[a-z][A-Z]      # Lowercase + uppercase

```

## Special Sequences

| Sequence | Meaning | Example |
| --- | --- | --- |
| `\\d` | Digit (0-9) | `\\d{3}` matches "123" |
| `\\D` | NOT digit | `\\D+` matches "abc" |
| `\\w` | Word char (a-z, A-Z, 0-9, _) | `\\w+` matches "hello_123" |
| `\\W` | NOT word char | `\\W+` matches "!@#" |
| `\\s` | Whitespace | `\\s+` matches spaces/tabs |
| `\\S` | NOT whitespace | `\\S+` matches "hello" |
| `\\b` | Word boundary | `\\bword\\b` matches whole word |
| `\\B` | NOT word boundary | `\\Bword\\B` matches middle |

## Quantifiers (Repetition)

| Quantifier | Meaning | Example |
| --- | --- | --- |
| `{m}` | Exactly m times | `a{3}` → "aaa" |
| `{m,n}` | Between m and n times | `a{2,4}` → "aa", "aaa", "aaaa" |
| `{m,}` | m or more times | `a{2,}` → "aa", "aaa"... |
| `{,n}` | 0 to n times | `a{,3}` → "", "a", "aa", "aaa" |
| `*` | 0 or more (same as `{0,}`) | `a*` |
| `+` | 1 or more (same as `{1,}`) | `a+` |
| `?` | 0 or 1 (same as `{0,1}`) | `a?` |

## Groups and Capturing

```python
# Basic groups
(abc)                    # Capture group
(?:abc)                  # Non-capturing group
(?P<name>abc)           # Named group

# Using groups
pattern = r'(\\d{4})-(\\d{2})-(\\d{2})'  # Date: YYYY-MM-DD
match = re.search(pattern, "2023-12-25")
match.group(0)          # Full match: "2023-12-25"
match.group(1)          # First group: "2023"
match.group(2)          # Second group: "12"

# Named groups
pattern = r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})'
match.group('year')     # "2023"

```

## Flags (Modifiers)

```python
re.IGNORECASE or re.I    # Case-insensitive
re.MULTILINE or re.M     # ^ and $ match line boundaries
re.DOTALL or re.S        # . matches newlines
re.VERBOSE or re.X       # Allow comments and whitespace

# Usage
re.search(pattern, text, re.IGNORECASE)
re.search(pattern, text, re.I | re.M)  # Multiple flags

```

## Common Patterns

### Email

```python
r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'

```

### Phone Numbers

```python
r'\\(\\d{3}\\) \\d{3}-\\d{4}'     # (123) 456-7890
r'\\d{3}-\\d{3}-\\d{4}'         # 123-456-7890
r'\\d{10}'                    # 1234567890

```

### Dates

```python
r'\\d{4}-\\d{2}-\\d{2}'         # YYYY-MM-DD
r'\\d{2}/\\d{2}/\\d{4}'         # MM/DD/YYYY
r'[A-Za-z]+ \\d{1,2}, \\d{4}'  # Month DD, YYYY

```

### URLs

```python
r'https?://[^\\s]+'           # Basic URL
r'https?://(?:[-\\w.])+(?:\\:[0-9]+)?(?:/(?:[\\w/_.])*)?'  # Detailed

```

### IP Address

```python
r'\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}'

```

### Credit Card

```python
r'\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}'

```

### Password (8+ chars, mixed case, digit, special)

```python
r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$'

```

## Text Processing Examples

### Clean Text

```python
# Remove extra whitespace
re.sub(r'\\s+', ' ', text).strip()

# Extract only letters and numbers
re.sub(r'[^a-zA-Z0-9\\s]', '', text)

# Remove HTML tags
re.sub(r'<[^>]+>', '', html_text)

```

### Extract Data

```python
# Find all numbers
re.findall(r'\\d+', text)

# Find all words
re.findall(r'\\w+', text)

# Find all emails
re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', text)

```

### Split Text

```python
# Split by multiple delimiters
re.split(r'[,;:|]', text)

# Split by whitespace
re.split(r'\\s+', text)

```

## Advanced Features

### Lookahead/Lookbehind

```python
(?=...)      # Positive lookahead
(?!...)      # Negative lookahead
(?<=...)     # Positive lookbehind
(?<!...)     # Negative lookbehind

# Example: Match 'Java' only if followed by 'Script'
r'Java(?=Script)'

```

### Greedy vs Non-Greedy

```python
.*           # Greedy (matches as much as possible)
.*?          # Non-greedy (matches as little as possible)

# Example with HTML
r'<.*>'      # Greedy: matches entire '<div>hello</div><div>world</div>'
r'<.*?>'     # Non-greedy: matches '<div>', '</div>', '<div>', '</div>'

```

## Best Practices

### Use Raw Strings

```python
# Good
pattern = r"\\d+\\s+\\w+"

# Bad (double escaping)
pattern = "\\\\d+\\\\s+\\\\w+"

```

### Compile for Reuse

```python
# Good for multiple uses
compiled = re.compile(r'\\d+')
for text in texts:
    compiled.search(text)

# Bad for multiple uses
for text in texts:
    re.search(r'\\d+', text)

```

### Escape Special Characters

```python
# Escape dots, dollars, etc.
r'\\$\\d+\\.\\d+'    # For "$25.99"
r'\\(\\d{3}\\)'     # For "(123)"

```

### Anchor When Possible

```python
r'^pattern$'     # Full string match
r'^pattern'      # Start of string
r'pattern$'      # End of string

```

## Common Mistakes

1. **Not using raw strings** → Use `r"pattern"`
2. **Forgetting to escape** → `\\.` for literal dot
3. **Greedy matching** → Use `.*?` instead of `.*`
4. **Case sensitivity** → Use `re.IGNORECASE` flag
5. **Not anchoring** → Use `^` and `$` for exact matches

## Quick Testing

```python
def test_pattern(pattern, test_string):
    match = re.search(pattern, test_string)
    return bool(match)

# Example
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
print(test_pattern(pattern, "user@example.com"))  # True
print(test_pattern(pattern, "invalid.email"))     # False

```
