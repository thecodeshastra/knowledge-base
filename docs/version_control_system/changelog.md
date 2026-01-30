---
title: ChangeLog
---

# Changelog

## What is a Changelog?

A **changelog** is a curated, chronologically ordered file that documents all notable changes made to your project for each release.

**Key point**: It's written **for humans** (users, developers), not machines. It explains *what changed* and *why it matters*.

---

## Why Maintain a Changelog?

- **Transparency** — Users know exactly what's new, fixed, or removed
- **Trust** — Shows you care about your project and your users
- **Easy Upgrades** — Users can see if updates are safe (breaking changes, deprecations, etc.)
- **Historical Record** — Future maintainers (and your future self) understand the project's evolution
- **Professional** — Expected in production-grade software

---

## Who Needs a Changelog?

Anyone using your software wants to know what changed.

- **End users** — "Will this update break my workflow?"
- **Contributors** — "What's the project history? What should I avoid?"
- **Businesses** — "What new features/fixes do we get?"
- **Security teams** — "Are there vulnerability patches?"

---

## Guiding Principles (Golden Rules)

1. **Changelogs are for humans** — Write like you're explaining to a non-technical friend
2. **One entry per version** — Every released version gets its own section
3. **Group similar changes** — All fixes together, all new features together
4. **Link everything** — Users should click to see commits, compare versions, etc.
5. **Latest first** — Newest version at the top (reverse chronological order)
6. **Include release dates** — Format: `YYYY-MM-DD` (ISO 8601, unambiguous worldwide)
7. **State your versioning** — "We follow Semantic Versioning" or similar

---

## Changelog Structure

### File Name

```text
CHANGELOG.md
```

**Not**: `HISTORY.md`, `NEWS.md`, `RELEASES.md` (harder to find)

---

## Types of Changes (Categories)

Always use these standard categories. They're immediately recognizable.

### `Added`

New features, new functionality.

- User authentication system
- API v2 endpoints
- Dark mode toggle
- Export to CSV functionality

### `Changed`

Modifications to existing features (non-breaking).

- Improved search speed by 50%
- Updated database schema (migration provided)
- Redesigned settings UI
- Changed default port from 3000 to 8080

### `Deprecated`

Features that will be removed in the future. **Critical for users upgrading.**

- Old login API (use new OAuth endpoint instead)
- Support for Python 2.7 (will be removed in v3.0)
- Legacy payment gateway (migrate before Jan 2025)

### `Removed`

Features that have been deleted.

- Support for Internet Explorer 11
- Legacy API v1 endpoints
- Deprecated payment methods
- Old database migration scripts

### `Fixed`

Bug fixes.

- Fixed crash when uploading files >1GB
- Fixed timezone handling in date picker
- Corrected calculation in invoice totals
- Fixed memory leak in background worker

### `Security`

Vulnerabilities and security patches. **Always mention these clearly.**

- Fixed XSS vulnerability in comment rendering
- Patched SQL injection in search (CVE-2024-XXXXX)
- Updated OpenSSL to fix critical vulnerability
- Disabled insecure TLS versions (now TLS 1.2+ only)

---

## The `[Unreleased]` Section (Most Important)

This tracks changes that haven't been released yet.

**Why it matters**:

- Users/contributors can see what's coming
- At release time, just rename it to the version number
- Keeps you accountable (don't let it grow too large)

**Example**:

```markdown
## [Unreleased]

### Added
- Real-time collaboration (WIP)
- Two-factor authentication

### Changed
- Updated styling framework

### Fixed
- Login timeout issue

### Deprecated
- Old notification system (will be removed in v2.0)
```

**When you release v1.5.0**, move everything to a new section:

```markdown
## [Unreleased]
- (empty, waiting for next changes)

## [1.5.0] - 2024-01-22

### Added
- Real-time collaboration
- Two-factor authentication

### Changed
- Updated styling framework

### Fixed
- Login timeout issue

### Deprecated
- Old notification system (will be removed in v2.0)
```

---

## Version Format & Dates

### Version Numbers (Semantic Versioning)

```markdown
## [1.2.3] - 2024-01-22
    ↑ ↑ ↑
    | | └─ PATCH (bug fixes): 0-9
    | └──── MINOR (new features): 0-9
    └────── MAJOR (breaking changes): 0-∞
```

**Examples**:

- `1.0.0` — Initial release
- `1.1.0` — New features added
- `1.1.5` — Bug fix
- `2.0.0` — Major breaking changes (could break user code)

### Date Format

**Always use**: `YYYY-MM-DD` (ISO 8601)

✅ **Correct**: `2024-01-22`  
❌ **Wrong**: `Jan 22, 2024` (ambiguous in different countries)  
❌ **Wrong**: `01/22/2024` (US-centric, confusing)

---

## Writing Good Changelog Entries

### ✅ DO: Be Specific & User-Focused

```markdown
### Added
- Two-factor authentication via TOTP or SMS
- Database connection pooling (reduces server load by 30%)
- Export reports to Excel, PDF, CSV

### Fixed
- Fixed crash when uploading files larger than 1GB
- Corrected timezone handling for Australia/Sydney region
- Fixed authentication tokens expiring prematurely
```

### ❌ DON'T: Dump Commit Logs

```markdown
### Added
- Add auth stuff
- Update deps
- Fix bug in utils

### Fixed
- Merge PR #456
- Revert commit abc123
- Minor refactoring
```

**Why**: Commit logs are for developers. Changelogs are for users. They need different info.

### ✅ DO: Link to Issues & PRs

```markdown
### Fixed
- Fixed login timeout issue ([#1234](https://github.com/user/project/issues/1234))
- Corrected invoice calculation ([#1289](https://github.com/user/project/pull/1289))

### Security
- Patched SQL injection vulnerability ([#1305](https://github.com/user/project/security/advisories/GHSA-xxxx-yyyy-zzzz))
```

### ✅ DO: Highlight Breaking Changes

```markdown
## [2.0.0] - 2024-02-01

### ⚠️ BREAKING CHANGES

- Removed support for Node.js 12 (now requires Node 14+)
- Changed API response format (see migration guide)
- Configuration file format changed from YAML to JSON

### Added
- New streaming API for real-time data

### Removed
- Old REST API v1 endpoints
```

---

## Common Pitfalls (What NOT to Do)

### ❌ Commit Log as Changelog

```markdown
# ❌ BAD: Just git log output

- Merge branch 'feature/auth' into main
- Refactor password utils
- Update dependencies
- Fix lint errors
- WIP: trying new approach
- Revert last commit
```

**Problem**: Noise, not useful, users don't care about commits.

### ❌ Confusing Dates

```markdown
# ❌ BAD: Regional date formats

## [1.0.0] - 02/15/2024  # Is this Feb 15 or May 2? Different in US vs Europe
```

**Fix**: Always use `YYYY-MM-DD`.

### ❌ Ignoring Deprecations

```markdown
# ❌ BAD: Don't mention what's going away

## [1.5.0]

### Changed
- Updated login system

# User upgrades, code breaks, support chaos.
```

**Fix**: Always list deprecations clearly:

```markdown
## [1.5.0]

### Deprecated
- Old login API (will be removed in v2.0, migrate now)

### Added
- New OAuth2 login system
```

### ❌ Confusing Yanked (Broken) Releases

If you release a version with a critical bug, **mark it as yanked**:

```markdown
## [1.2.0] - 2024-01-15 [YANKED]

⚠️ This version has a critical security vulnerability. Do not use.
Upgrade to 1.2.1 immediately.
```

---

## Linking Versions (Compare URLs)

At the bottom of your changelog, link each version so users can compare:

```markdown
## [1.2.0] - 2024-01-15
...content...

## [1.1.0] - 2023-12-01
...content...

---

[1.2.0]: https://github.com/user/project/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/user/project/compare/v1.0.0...v1.1.0
```

Users click the link → see **exact code changes** between versions.

---

## Release Workflow with Changelog

### 1. During Development

Keep `[Unreleased]` section updated:

```markdown
## [Unreleased]

### Added
- New dashboard
- API v2 endpoints

### Fixed
- Memory leak in cache
```

### 2. Before Release

1. Decide the version number (e.g., `1.5.0`)
2. Rename `[Unreleased]` to `[1.5.0] - 2024-01-22`
3. Create a blank `[Unreleased]` section
4. Update version links at bottom
5. Commit to version control
6. Tag the release: `git tag v1.5.0`

### 3. Create Release Notes

Many platforms auto-generate release notes from changelog:

**GitHub**: Copy `[1.5.0]` section into GitHub Release
**GitLab**: Use changelog parsing
**npm/PyPI**: Auto-read from CHANGELOG.md

---

## Tools & Automation

### Manual (Recommended for Small Projects)

- Edit CHANGELOG.md by hand
- Keep it in version control
- Review before each release

### Semi-Automated (Growing Projects)

- Use `git-changelog` or similar to auto-generate from commits
- Manually curate and organize
- Add human context

### Fully Automated (Large Teams)

- Conventional commits format
- `commitlint` enforces format
- `standard-version` auto-generates changelog

Example with conventional commits:

```bash
git commit -m "feat(auth): add two-factor authentication"
git commit -m "fix(api): correct timezone handling"
git commit -m "BREAKING CHANGE: remove legacy API v1"

# Standard-version reads these, auto-generates CHANGELOG.md
```

## Personal template to get started

```markdown
# Project-name Changelog

---

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

---

## [1.0.0] - YYYY-MM-DD

### Version 1.0.0 Added

- Initial release

---

[Unreleased]: https://github.com/user/project/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/user/project/releases/tag/v1.0.0
```

---

## Resources

- [Official Guide](https://keepachangelog.com)
- [Semantic Versioning](https://semver.org)
- [Conventional Commits](https://www.conventionalcommits.org)
- **Tools**: `standard-version`, `git-changelog`, `commitizen`
