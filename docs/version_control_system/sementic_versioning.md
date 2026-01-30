---
title: Sementic Versioning
---

# Sementic Versioning

Core Idea: Version numbers **MAJOR.MINOR.PATCH** signal the risk level of an update to your users.

## The Three Numbers

### MAJOR (X.0.0)

**Bump when**: You break backward compatibility. Users **must change code** to upgrade.

**Examples:**

- Removed old API endpoint
- Changed function signature
- Restructured database schema
- Deleted deprecated features

**User impact**: BREAKING - upgrade requires work

### MINOR (1.Y.0)

**Bump when**: You add new features or deprecate features (but don't remove them). Everything stays backward compatible.

**Examples:**

- New API endpoint
- Added optional parameter
- New CLI command
- Marked something for future removal

**User impact**: SAFE - add features, no code changes needed

### PATCH (1.2.Z)

**Bump when**: You fix bugs. No API changes, no new features.

**Examples:**

- Fixed memory leak
- Corrected typo
- Patched security vulnerability
- Fixed edge case

**User impact**: SAFE - just bug fixes

## Decision Tree

Did you change the public API (break something)?  
├─ YES → Bump MAJOR (1.0.0 → 2.0.0)  
└─ NO  
├─ Did you add new features or mark as deprecated?  
│ ├─ YES → Bump MINOR (1.2.0 → 1.3.0)  
│ └─ NO → Bump PATCH (1.2.3 → 1.2.4)

## Practical Examples

| Change | Old | New | Why |
| --- | --- | --- | --- |
| Added new optional parameter | 1.2.0 | 1.3.0 | MINOR - backward compatible |
| Removed old parameter | 1.2.0 | 2.0.0 | MAJOR - breaking change |
| Fixed bug in calculation | 1.2.0 | 1.2.1 | PATCH - no API change |
| Deprecated endpoint (will remove in v2) | 1.2.0 | 1.3.0 | MINOR - heads up, not removal |
| Removed deprecated endpoint | 1.3.0 | 2.0.0 | MAJOR - users were warned |

## Pre-Release Versions (Optional)

Use for testing before final release.

Format: MAJOR.MINOR.PATCH-prerelease

**Examples:**

- 1.0.0-alpha - early, unstable
- 1.0.0-alpha.1 - first alpha
- 1.0.0-rc.1 - release candidate (almost final)

**Rules:**

- Pre-release versions sort **before** the final version
- 1.0.0-rc.1 < 1.0.0
- Use in: staging, beta testing, early access

---

## Build Metadata (Optional)

Use to track build info. **Ignored** when comparing versions.

Format: MAJOR.MINOR.PATCH+build

**Examples:**

- 1.0.0+20260126 - build date
- 1.0.0+git.abc123 - git commit hash
- 1.0.0-rc.1+docker.sha - Docker build ID

**Key point**: 1.0.0+build1 and 1.0.0+build2 are considered the **same version**.

---

## Versioning Rules (The Golden Rules)

###

#### 1\. Once released, never modify it

❌ WRONG: Overwrite v1.2.0 tag with fixes  
✅ RIGHT: Release v1.2.1 with fixes

#### 2\. Declare your public API

Your README or docs should clearly define:

- Which classes/functions/endpoints are public
- Which are private (subject to change)

Example:

**Public API**

- Agent.execute() - stable
- Agent.run() - stable
- \_internal_parse() - private, may change

#### 3\. Use 0.y.z for unstable development

Before v1.0.0, anything can change. Use for initial development.

- Start at: 0.1.0
- Bump minor for each release: 0.1.0 → 0.2.0 → 0.3.0
- When stable and production-ready → 1.0.0

#### 4\. Reset smaller numbers on major bump

- Bumping MAJOR resets MINOR and PATCH: 1.2.3 → 2.0.0
- Bumping MINOR resets PATCH: 1.2.3 → 1.3.0

#### 5\. No leading zeros

✅ 1.10.0 (valid)  
❌ 1.010.0 (invalid)

---

## Integrating with Your Changelog

Your [**CHANGELOG.md**](http://CHANGELOG.md) should reference SemVer.

```markdown
# Changelog

All notable changes documented here.  
Format based on [Keep a Changelog](https://keepachangelog.com).  
Adheres to [Semantic Versioning](https://semver.org).

## [2.0.0] - 2026-01-26

### Added

- Multi-agent orchestration framework

### Changed

- **BREAKING**: Workflow API schema updated

### Removed

- Support for Python 3.8
- Legacy REST endpoints

```

**Connection:** Each version section in your changelog aligns with SemVer bump rules.

---

### TL;DR (One Minute Version)

| Version | What Changed | User Impact | Next Bump |
| --- | --- | --- | --- |
| **1.0.0** | Initial release | -   | PATCH if bug fix |
| **1.0.1** | Bug fix | Safe, upgrade freely | PATCH or MINOR |
| **1.1.0** | New feature | Safe, backward compatible | PATCH or MINOR |
| **2.0.0** | Breaking change | BREAKING, requires work | PATCH, MINOR, or MAJOR |

**Remember:** Version numbers are a **contract** with your users. Use them honestly.

---

### Resources

- [Official Spec](https://semver.org)
- [Paired with](https://keepachangelog.com)
- **Git Tagging**: git tag -a vX.Y.Z -m "Release vX.Y.Z"

---
