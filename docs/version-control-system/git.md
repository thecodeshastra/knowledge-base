---
title: Version Control System & Git
---

# Version Control System & Git

## Version Control System Fundamentals

### What is VCS?

- **Track changes** to files over time
- **Records history** of all modifications
- **Facilitates collaboration** across teams
- **Enables rollback** to any previous state

### Key Concepts

- **Repository**: Central storage for all files and complete change history
- **Commit**: Atomic collection of changes treated as a single logical unit
- **Branch**: Parallel development line allowing isolated work
- **Merge**: Integration of changes from one branch into another

### Diff & Patch (Linux Foundation)

- **Compare two files**: `diff file1 file2`
- **Compare with context**: `diff -u oldFile newFile`
- **Generate patch**: `diff -u oldFile newFile > change.diff`
- **Apply patch**: `patch oldFile < diffFile`

---

## What is Git

### Overview

- **Created**: 2005 by Linus Torvalds
- **Type**: Free & Open Source Distributed VCS
- **Repository**: Every developer has full copy (offline-capable)
- **Speed**: Optimized for performance and large projects

### Key Characteristics

- Distributed architecture (no single point of failure)
- Fast local operations (no network calls for history)
- Complete history available locally
- Delta-based storage (tracks changes, not full copies)
- Support for non-linear, flexible workflows

---

## Git Architecture

### Three Core States

```markdown
┌─────────────────────────────────────────────────────────────┐
│  Working Tree                                               │
│  (Your current project files, including uncommitted edits)  │
└──────────────┬──────────────────────────────────────────────┘
               │ git add
┌──────────────▼──────────────────────────────────────────────┐
│  Staging Area (Index)                                       │
│  (Files selected for next commit)                           │
└──────────────┬──────────────────────────────────────────────┘
               │ git commit
┌──────────────▼──────────────────────────────────────────────┐
│  Git Directory (Repository)                                 │
│  (Complete history & all commits)                           │
└─────────────────────────────────────────────────────────────┘
```

### Git Workflow States

1. **Modified**: Files edited but not staged
2. **Staged**: Files selected for next commit (in Index)
3. **Committed**: Permanent snapshot saved in repository

### Key Features

- ✅ Full immutable history of every commit
- ✅ Ability to revert to any previous commit
- ✅ Efficient delta tracking (only changes stored)
- ✅ Supports distributed, non-linear workflows
- ✅ Granular control over what to commit and what to skip

---

## Quick Setup (First Time Only)

### Install Git

```bash
# Linux
sudo apt update && sudo apt install git-all

# macOS
brew install git

# Windows
# Download: https://git-scm.com/download/win
```

### Check current config

```bash
git config --list                    # Show all configs
git config --local --list            # Local repo only
git config --global --list           # Global only
```

### Configure (Required)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.editor "code --wait"    # Or nano, vim
git config --global color.ui auto                   # Colored output
git config --global core.autocrlf input             # Line endings

# optional
git config --global credential.helper cache            # Cache credentials
git config --global credential.helper 'cache --timeout=3600'  # 1 hour
```

### Validate Repository

```bash
# Check if current directory is in a Git repository
git rev-parse --show-toplevel

# Output: /path/to/repo (or error if not in repo)
```

### SSH Key Setup (Recommended for Production)

#### Generate ED25519 key (modern, secure)

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
# Follow prompts:
#   - Suggested location: ~/.ssh/id_ed25519 (press Enter)
#   - Passphrase: Optional but recommended (enter twice)
```

#### Start SSH agent & add key

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

#### Add public key to GitHub/GitLab/Bitbucket

```bash
# Copy public key
cat ~/.ssh/id_ed25519.pub

# Then add to platform settings:
# GitHub: https://github.com/settings/keys
# GitLab: https://gitlab.com/-/profile/keys
# Bitbucket: https://bitbucket.org/account/settings/ssh-keys/
```

#### Test connection

```bash
ssh -T git@github.com
# Expected: Hi [username]! You've successfully authenticated.
```

#### Permissions for existing keys

```bash
# You can copy the key files to `~/.ssh` directory

sudo chown -R $USER:$USER ~/.ssh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/id_ed25519          # Private key (read-only)
chmod 644 ~/.ssh/id_ed25519.pub      # Public key (readable)
```

---

## Git Commands Cheatsheet

### Repository Setup

```bash
git init                                    # Create local repo
git clone <url>                             # Clone remote repo
git clone -b <branch> <url>                 # Clone specific branch
git clone --depth 1 <url>                   # Shallow clone (faster)
```

### Help command

```bash
git help <command>                          # Get detailed help for a specific command.
```

### Status & Inspect

```bash
git status                                  # Current status
git status -s                               # Current status with Short format

git log --oneline                           # Commit history (compact)
git log --all --graph --decorate --oneline  # Visual branch graph

git diff                                    # Unstaged changes
git diff --staged                           # Staged changes

git show <commit>                           # Show commit details
```

### Visual git history tool

```bash
gitk                        # GUI branch visualization
```

### Stage & Commit

```bash
git add <file>                              # Stage specific file
git add .                                   # Stage all changes
git add -A                                  # Stage everything

git commit -m "Message"                     # Commit staged changes
git commit -am "Message"                    # Stage tracked files + commit
git commit --amend                          # Edit last commit
git commit --amend --no-edit                # Add to last commit (same message)
```

### Branch Operations

```bash
git branch                                  # List local branches
git branch -a                               # List all branches (local + remote)
git branch <name>                           # Create branch
git branch -d <name>                        # Delete branch
git branch -D <name>                        # Force delete branch

git checkout <branch>                       # Switch branch
git checkout -b <branch>                    # Create & switch branch

git switch <branch>                         # Modern: switch branch
git switch -c <branch>                      # Modern: create & switch
```

### Merge & Rebase

```bash
git merge <branch>                          # Merge into current branch
git merge --no-ff <branch>                  # Merge with explicit commit
git merge --squash <branch>                 # Squash & merge (1 commit)

git rebase <base>                           # Rebase current onto base
git rebase -i HEAD~<n>                      # Interactive rebase (last n commits)
git rebase --continue                       # Continue after resolving conflicts
git rebase --abort                          # Cancel rebase
```

In interactive mode:

- `pick` = use commit
- `reword` = use commit, edit message
- `squash` (or `s`) = merge into previous commit
- `drop` = remove commit
- `reorder` = change commit order

### Remote Operations

```bash
git remote -v                               # List remotes with URLs
git remote add origin <url>                 # Add remote
git remote set-url origin <new-url>         # Change remote URL

git fetch                                   # Download from remote
git fetch origin                            # Fetch from specific remote

git pull origin <branch>                    # Fetch + merge
git pull --rebase origin <branch>           # Fetch + rebase (cleaner)

git push -u origin <branch>                 # Push & set upstream
git push origin <branch>                    # Push to existing upstream
git push origin --delete <branch>           # Delete remote branch
git push origin <branch> -f                 # Force push (DANGEROUS!)

git push --set-upstream origin <branch>     # Set upstream branch (local branch push to remote)
```

### Viewing Changes

#### Compare files

```bash
git diff                    # Changes in working tree (unstaged)
git diff --staged           # Changes in staging area (staged)
git diff <branch1> <branch2>                   # Compare branches
git diff <commit1> <commit2>                   # Compare commits
git diff HEAD~1 HEAD        # Compare last two commits
git diff <file>             # Changes for specific file
```

#### Show commit details

```bash
git show <commit-id>        # Show commit content
git show <commit-id>:<file> # Show file at specific commit
git show HEAD:<file>        # Show file at HEAD
```

### Undo & Fix

```bash
git reset <file>                            # Unstage file
git reset HEAD~1                            # Undo last commit (keep changes)
git reset --hard HEAD~1                     # Undo last commit (lose changes)

git revert <commit>                         # Create inverse commit (safe undo)
git checkout -- <file>                      # Discard changes in file
git restore <file>                          # Modern: discard changes

git clean -f                                # Remove untracked files
git clean -fd                               # Remove untracked files & dirs
git gc --prune=now                          # Clean up unnecessary files and optimize local repo

git archive --format=zip HEAD -o latest.zip # Archive the latest commit as a zip file
git fsck                                    # Check the object database for integrity
```

### Stash (Temporary Storage)

```bash
git stash                                   # Save changes temporarily
git stash list                              # List all stashes
git stash pop                               # Apply & remove latest stash
git stash apply stash@{0}                   # Apply stash (keep it)
git stash drop stash@{0}                    # Delete stash
```

## Advanced Operations

### Cherry-Pick (Apply Specific Commits)

```bash
git cherry-pick <commit-id>                     # Apply single commit
git cherry-pick <commit1> <commit2> <commit3>   # Multiple commits
git cherry-pick <start-commit>^..<end-commit>   # Range of commits
git cherry-pick --continue                      # After resolving conflicts
git cherry-pick --abort                         # Cancel cherry-pick
```

### Tagging

```bash
git tag <tag-name>          # Lightweight tag
git tag -a <tag-name> -m "Version 1.0.0"      # Annotated tag
git tag -d <tag-name>       # Delete local tag

git push origin <tag-name>  # Push tag to remote
git push origin --tags      # Push all tags
```

### Searching & Inspection

#### Reflog (reference logs - history of branch movements)

```bash
git reflog                  # All branch movements
git reflog show <branch>    # Specific branch
# Use to recover lost commits!
```

#### Search commits

```bash
git log --grep="pattern"    # Search commit messages
git log -S "code"           # Search code changes
git log --author="Name"     # Filter by author
```

#### Show metadata

```bash
git show <commit-id>        # Full commit info
git describe --tags         # Readable name for commit
git blame <file>            # Show author of each line
git shortlog -s -n          # Commits by author count
git grep <search-term>      # Search a term in the repository

```

### Bisecting (Find Bug Location)

```bash
git bisect start
git bisect bad HEAD                             # Current commit is bad
git bisect good <known-good-commit>             # Known good commit
# Git checks commits binary search style
# Test, then: git bisect good or git bisect bad
# Repeat until found
git bisect reset            # Exit bisect
```

### Submodules and worktrees

```bash
git submodule add <repo-url> <path>              # Add a submodule
git submodule init                               # Initialize submodule
git submodule update                             # Update submodule
git worktree add <path> <branch>                 # Create a new working tree for a branch
```

---

## Production Git Operations (How-To Recipes)

### 🔴 Delete a Commit (Not Yet Pushed)

**Scenario**: You committed something wrong, it's only local.

```bash
git log --oneline                           # Find the bad commit
git reset --hard HEAD~1                     # Delete it (keep changes lost)
# OR:
git reset --mixed HEAD~1                    # Delete it (keep changes in working dir)
```

**When to use**:

- `--hard`: Commit was wrong, discard all changes
- `--mixed`: Commit was to wrong branch, want to redo

---

### 🔴 Delete a Commit (Already Pushed)

**Scenario**: Bad commit is already on remote. Must preserve history.

```bash
git revert <commit-hash>                    # Create inverse commit
git push origin <branch>                    # Push the revert
```

**Why**: Revert creates a new commit that undoes the bad one. History stays intact (safety for team).

---

### How to squash your existing commits

- Do all the commits you want to do on feature branch
- Then type `git rebase -i HEAD~5` replace number 5 with no. of commits you want to squash in
- It will open `vim editor` in terminal or `IDE` if you changed in config.
- Then replace `s` from `pick` before all the commits you want to squash in, just remember you will have to keep the first commit and you can squash all the commits above - it till wherever you want
- Then press `esc` and type `:wq` , to save and exit from vim
- If all goes fine for squashing, it will open commits to keep in terminal `vim editor` or `IDE`
- Then it will open the commit message update in `vim editor` or `IDE` of that updated commit keep the line you need as commit message.
- Then press `esc` and type `:wq`
- Then type `gitk` to see the updated graph in a UI,
- Then type `git push origin branch_name` and if your are fast forwarding it do `git push origin branch_name -f`

---

### 🔄 Rebase Feature Branch from Develop

**Scenario**: You're on `feature/auth`, but `develop` has moved ahead. Need to sync.

```bash
git checkout feature/auth
git fetch origin                            # Get latest remote
git rebase origin/develop                   # Replay your commits on top

# If conflicts occur:
# 1. Fix conflicts in files
# 2. git add .
# 3. git rebase --continue

git push origin feature/auth -f              # Force push (your history rewrote)
```

**Why**: Rebase keeps a clean, linear history. `develop` moves forward, your commits reapply on top.

---

### 🔄 Rebase & Squash Before PR Merge

**Scenario**: You have 5 commits on feature branch. Want to squash into 1 before merging to main.

```bash
git rebase -i origin/develop                # Interactive rebase from develop

# In editor:
# pick abc123 Initial auth setup
# s def456 Add validation
# s ghi789 Fix bug
# s jkl012 Add tests
# s mno345 Polish

# Save (Esc + :wq in vim)
# Edit final commit message in next prompt
# Save again

git push origin feature/auth -f              # Force push
```

**Why**: Main branch stays clean—one commit per feature. Easier to understand history and bisect bugs.

---

### 🔀 Resolve Merge Conflicts

**Scenario**: You merged `feature/x` into `develop` and got conflicts.

```bash
git status                                  # Shows conflicted files
git diff                                    # View conflict markers

# Open conflicted files and fix:
# <<<<<<< HEAD
#   your code
# =======
#   incoming code
# >>>>>>> feature/x

# Choose which to keep, remove markers

git add <resolved-file>                     # Stage resolved file
git commit -m "Resolve merge conflicts"     # Complete the merge
```

**If you want to abort**:

```bash
git merge --abort                           # Cancel merge entirely
```

---

### 🔀 Resolve Conflicts During Rebase

**Scenario**: You're rebasing and hit conflicts.

```bash
# Fix conflicts in files
git add .
git rebase --continue                       # Apply next commit

# Repeat until done
# If it goes wrong:
git rebase --abort                          # Start over
```

---

### 🔀 Resolve Conflicts During Pull

**Scenario**: `git pull` failed due to conflicts.

```bash
# Option 1: Resolve manually
git status                                  # See conflicts
# Fix files...
git add .
git commit -m "Resolve conflicts"

# Option 2: Rebase instead (cleaner)
git pull --abort
git pull --rebase origin <branch>
# Fix any conflicts, then:
git rebase --continue
```

---

### 💾 Recover a Lost Commit

**Scenario**: You accidentally did `git reset --hard` and lost work.

```bash
git reflog                                  # Lists all branch movements
# Output:
# abc123 HEAD@{0}: reset: moving to HEAD~1
# def456 HEAD@{1}: commit: Added auth feature
# ghi789 HEAD@{2}: commit: Initial setup

git checkout def456                         # Go to lost commit
git branch recovery-branch                  # Create branch to save it
git checkout recovery-branch
git log                                     # Verify your work is here
```

**Why `reflog` is magic**: Git never truly deletes commits. `reflog` shows everything.

---

### ↩️ Undo a Bad Push (Not Force-Push)

**Scenario**: You pushed bad code to `develop`. Need to undo without force-pushing (safe for team).

```bash
git log --oneline origin/develop            # Find bad commit
git revert <commit-hash>                    # Create inverse commit
git push origin develop                     # Push the revert

# History now shows both bad + good commit (auditable)
```

---

### 🚨 Undo a Bad Force-Push (Emergency Only)

**Scenario**: Someone force-pushed over your work. Recover it.

```bash
git reflog                                  # Find the state before force push
git reset --hard <ref-hash>                 # Reset to that state
git push origin <branch> -f                 # Force push back (coordinate with team!)
```

**Warning**: Coordinate with team before doing this. Chaos ensues if not.

---

### 🔍 Find a Commit That Changed Code

**Scenario**: A bug appeared but you don't know which commit caused it.

```bash
git log -S "specific_code"                  # Find commits that added/removed "specific_code"
git log --grep="keyword"                    # Search commit messages
git blame <file>                            # Show author of each line
```

---

### 🏷️ Tag a Production Release

**Scenario**: Shipping to production. Need to tag the version.

```bash
git tag -a v1.2.3 -m "Release 1.2.3 - Critical bug fix"
git push origin v1.2.3
# OR push all tags:
git push origin --tags
```

---

### 🧹 Clean Up Merged Branches

**Scenario**: Feature branches keep piling up after merges.

```bash
git branch --merged develop                 # List merged branches
git branch -d <branch>                      # Delete each one

# Or delete remote branches:
git push origin --delete <branch>
```

---

## Git Files You Should Know

| File | Purpose |
| :--- | :--- |
| `.git/` | Git's internal directory—never touch manually |
| `.gitignore` | List files/folders Git should ignore (secrets, builds, dependencies) |
| `.gitkeep` | Placeholder file to keep empty directories tracked |
| `.gitattributes` | Rules for diff, merge, line endings per file type |
| `.gitmodules` | Configuration for Git submodules (dependencies) |
| `.git/config` | Repository-specific configuration |
| `.git/hooks/` | Scripts that run on Git events (pre-commit, pre-push, etc.) |
| `.git/info/exclude` | Local ignore rules (not committed to repo) |

---

## Git hooks (Automation)

- Located in .git/hooks/
  - pre-commit — runs before commit (lint, format, tests).
  - commit-msg — validates commit message format.
  - pre-push — runs before pushing to remote.
  - post-merge — runs after a merge completes.
- (Usually managed via tools like husky.)

---

## Git Best Practices

### 🎯 Core Principles

- **Keep main always deployable** — If it breaks, shipping stops. Never commit broken code to main.
- **One branch = one purpose** — Feature, fix, or chore. Never mix.
- **Commit small and often** — Each commit should do one clear thing. Easy to review, easy to bisect.
- **Write commits for humans** — Explain *what* and *why*, not *how*. You'll thank yourself in 6 months.
- **Never push directly to main** — Always go through a PR. Forces review, catches mistakes.
- **Use PRs even when solo** — Documents decisions, establishes patterns, catches your own bugs.
- **Pull/rebase frequently** — Stay in sync with base branch. Reduces merge conflicts dramatically.

### 🏗️ Workflow

- **Branch lifetime < 2 days** — Long branches = merge hell. Ship fast.
- **Squash commits before merge** — One feature = one commit in main. Clean history = easy rollback.
- **Delete merged branches immediately** — Dead branches create clutter and confusion.
- **Protect main with rules** — Require PR reviews, require tests pass, require branch up-to-date before merge.
- **Use meaningful branch names** — `feature/user-auth` not `feature/x`. Name should explain the work.

### 🔐 Security

- **Never commit secrets** — Use `.env` files (in `.gitignore`), environment variables, or secret managers.
- **Tag every production release** — Makes rollback trivial. Easy traceability.
- **Rollback via revert, not force-push** — Revert creates a new commit, preserves history. Force-push breaks team workflows.

### ⚡ Team Standards

- **Automate checks with CI** — Don't rely on human discipline. Linters, tests, formatters on every PR.
- **Document your workflow** — In README or CONTRIBUTING.md. Consistency beats cleverness.
- **Commit message format** — Enforce with tools like Commitlint. `feat(scope): description` not `asdf`.

---

## Common Pitfalls & Fixes

### ❌ Committed to Wrong Branch

```bash
git reset HEAD~1                            # Undo commit, keep changes
git checkout <correct-branch>
git commit -m "Your message"
```

---

### ❌ Detached HEAD State

```bash
# Problem: You checked out a commit instead of a branch
git branch <new-branch>                     # Create branch from current commit
git checkout <new-branch>
```

---

### ❌ Accidentally Pushed Secrets

```bash
git reset HEAD~1 <secret-file>              # Undo commit
git commit --amend --no-edit
git push origin <branch> -f                 # Force push
# THEN rotate the secret immediately!
```

---

### ❌ Large File Committed (Blocks Pushes)

```bash
git rm --cached <large-file>
git commit --amend --no-edit
git push origin <branch> -f
# Add to .gitignore for future
```

---

### ❌ Merge Conflict Too Complex

```bash
git merge --abort                           # Cancel entire merge
git pull --rebase origin <branch>           # Try rebase instead
```

---

### ❌ Lost Work After Reset

```bash
git reflog                                  # Find the lost commit
git checkout <commit-hash>
git branch recovery-branch
```

---

### ❌ Force Pushed, Broke Teammate's Work

```bash
# Contact them immediately!
git reflog
git reset --hard <state-before-force-push>
git push origin <branch> -f
# Then: communicate, apologize, setup branch protection!
```

---

## Resources

- [Official Git Book](https://git-scm.com/book/en/v2)
- [Interactive Learning](https://learngitbranching.js.org)
- [Git Docs](https://git-scm.com/learn)
