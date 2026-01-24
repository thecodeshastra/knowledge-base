# GitHub CLI

(Terminal-First GitHub Management)

---

## Quick Setup (First Time Only)

### Install GitHub CLI

```bash
# Linux (Debian/Ubuntu)
sudo apt update && sudo apt install gh

# macOS
brew install gh

# Windows
choco install gh
# Or download: https://github.com/cli/cli/releases
```

### Authenticate

```bash
gh auth login                               # Interactive login (HTTPS or SSH)
gh auth status                              # Check current authentication
gh auth logout                              # Sign out
```

---

## GitHub CLI Commands Cheatsheet

### Repository Basics

```bash
gh repo list                                # List your repositories
gh repo list --public                       # List public repos
gh repo view                                # View current repo info
gh repo clone <owner/repo>                  # Clone a repo
gh repo create <name> --public --clone      # Create & clone new repo
gh repo delete <owner/repo>                 # Delete repository
```

### Browse & Open

```bash
gh browse                                   # Open current repo in browser
gh browse src/app/main.py:42                # Open file at line 42 in browser
gh repo view <owner/repo> --web             # Open specific repo in browser
```

### Issues Management

```bash
gh issue list                               # List open issues
gh issue list -a @me                        # Issues assigned to you
gh issue create --title "Bug" --body "..."  # Create new issue
gh issue create --fill                      # Create with template
gh issue view <number>                      # View issue details
gh issue view <number> --web                # Open issue in browser
gh issue comment <number> -b "Fixed!"       # Comment on issue
gh issue close <number>                     # Close an issue
gh issue close <number> -c "Done!"          # Close with comment
gh issue reopen <number>                    # Reopen issue
gh issue edit <number> --title "New title"  # Edit issue
```

### Pull Requests (Engineering Flow)

```bash
gh pr list                                  # List open PRs
gh pr list -a @me                           # PRs assigned to you
gh pr create --fill                         # Create PR from current branch
gh pr create --title "..." --body "..."     # Create PR with details
gh pr view <number>                         # View PR details
gh pr view <number> --web                   # Open PR in browser
gh pr checkout <number>                     # Checkout PR branch locally
gh pr diff <number>                         # View PR changes
gh pr review <number>                       # Review a PR
gh pr review <number> -a                    # Approve PR
gh pr review <number> -r -b "Needs work"    # Request changes
gh pr merge <number>                        # Merge PR
gh pr merge <number> --squash                # Squash & merge
gh pr merge <number> --delete-branch        # Merge & delete branch
gh pr status                                # Check PR status for your PRs
```

### Git Operations (from Terminal)

```bash
gh git-credential approve                   # Store credentials
gh git-credential reject                    # Remove stored credentials
```

### GitHub Actions & Workflows

```bash
gh run list                                 # List recent workflow runs
gh run list -w <workflow-name>              # List specific workflow runs
gh run view <run-id>                        # View workflow run details
gh run watch <run-id>                       # Watch run in real-time
gh run download <run-id>                    # Download artifacts
gh run rerun <run-id>                       # Rerun a workflow
gh run cancel <run-id>                      # Cancel running workflow
```

### Secrets & Configuration

```bash
gh secret list                              # List repository secrets
gh secret set <NAME> -b "value"             # Set a secret
gh secret remove <NAME>                     # Delete a secret
gh variable list                            # List repository variables
gh variable set <NAME> -b "value"           # Set environment variable
```

### Labels & Projects

```bash
gh label list                               # List issue labels
gh label create <name> --color "FF0000"     # Create label
gh label delete <name>                      # Delete label
```

### Aliases & Shortcuts

```bash
gh alias list                               # List custom aliases
gh alias set <name> "<command>"             # Create alias
gh alias delete <name>                      # Remove alias
```

### Search & Discovery

```bash
gh search repos --language go               # Search for Go repos
gh search issues --label bug                # Search for bug issues
gh search prs --author @me --state merged   # Search your merged PRs
```

---

## Production GitHub Workflows

### ⚡ Power Move: Quick Issue Triage (CI Automation)

**Scenario**: Bulk review open issues and assign labels/status.

```bash
gh issue list --label "needs-review" | while read issue; do
  gh issue edit $issue --add-label "in-progress" --assignee @me
done
```

**Use case**: Automate issue routing in CI/CD pipelines.

---

### 🔀 Engineering Flow: Create PR from Feature Branch

**Scenario**: You've pushed feature branch. Create PR with description template.

```bash
gh pr create --fill                         # Auto-fill from branch name + template
# Opens editor for title/body if template exists
# Automatically sets reviewers from CODEOWNERS
```

**Why**: `--fill` uses `.github/pull_request_template.md` if it exists. One command, full context.

---

### ✅ Engineering Flow: Review & Merge PR

**Scenario**: Check PR status, approve, merge with squash.

```bash
gh pr view 45 --web                         # Check PR in browser
gh pr review 45 -a                          # Approve it
gh pr merge 45 --squash --delete-branch     # Squash merge & cleanup
```

---

### 🔍 Power Move: Find & Fix Issues by Label

**Scenario**: Find all "bug" issues, transition them to "in-progress".

```bash
gh issue list --label bug --state open | head -5
# Then for each:
gh issue edit 12 --add-label "in-progress"
```

---

### 🚀 Automation: Auto-Comment on PRs

**Scenario**: Comment on PR automatically (useful in scripts).

```bash
gh pr comment 45 -b "Deployed to staging at https://staging.example.com"
```

**Use case**: CI/CD pipeline auto-comments with deployment URLs.

---

### 📊 Infrastructure: Export Issues as JSON

**Scenario**: Extract issues for external tools (analytics, reporting).

```bash
gh issue list --label feature --state open --json number,title,author,createdAt
# Returns:
# [
#   { "number": 1, "title": "Add auth", "author": {...}, "createdAt": "..." }
# ]
```

---

### 🔄 DevOps: Monitor Workflow Runs

**Scenario**: Watch deployment workflow in real-time from terminal.

```bash
gh run list --limit 1                       # Get latest run
gh run watch <run-id>                       # Stream output live
# Shows: status, job names, step output
```

**Use case**: CI/CD monitoring without opening browser.

---

### 🎯 Team: Bulk Assign Issues

**Scenario**: Assign all unassigned issues to team member.

```bash
gh issue list --state open --assignee "" | while read line; do
  number=$(echo $line | awk '{print $1}')
  gh issue edit $number --assignee "teammate-username"
done
```

---

### 🔐 Security: Manage Repository Secrets

**Scenario**: Set API keys for Actions workflow.

```bash
gh secret set STRIPE_API_KEY -b "sk_live_xxx"
gh secret set DATABASE_URL -b "postgres://..."
gh secret list                              # Verify (values hidden)
```

**Why**: Centralized secret management without GitHub UI.

---

### 📈 Power Move: Create Milestone & Associate Issues

**Scenario**: Track issues against v1.2.0 release.

```bash
gh issue list --milestone "v1.2.0"          # See all issues for milestone
gh issue edit 45 --milestone "v1.2.0"       # Assign issue to milestone
```

---

### 🧪 Testing: Checkout Teammate's PR Locally

**Scenario**: Review teammate's code by checking out branch locally.

```bash
gh pr checkout 45                           # Downloads & checks out PR branch
git log                                     # See their commits
# Make changes, push:
git push
```

---

### 🏷️ Tagging: Create Release Tags

**Scenario**: Tag production release from terminal.

```bash
gh release create v1.2.3 --title "Version 1.2.3" --notes "Bug fixes and improvements"
gh release list                             # View all releases
gh release download v1.2.3                  # Download artifacts
```

---

## GitHub CLI Best Practices

### 🎯 Automation-Friendly

- **Use JSON output** (`--json`) for scripting and piping to other tools
- **Batch operations** with loops and conditional logic
- **Integrate into CI/CD** workflows for fully automated issue/PR management

### ⚡ Performance

- **Use `--limit 1`** when you only need recent items (faster than full list)
- **Cache credentials** with `gh auth login` for offline access
- **Avoid repeated calls** — use `--json` once, parse multiple times

### 🔐 Security

- **Never hardcode tokens** — use `gh auth login` for interactive auth
- **Store secrets properly** — use `gh secret set`, not env files
- **Review `gh auth status`** regularly — ensure you're on correct account

### 🏗️ Workflows

- **Create aliases** for frequently used commands (`gh alias set ...`)
- **Use branch names** that match PR title for `--fill` auto-detection
- **Combine with shell scripts** for complex multi-step automation

---

## Useful Aliases

Set these for faster workflows:

```bash
gh alias set prs "pr list -a @me"           # Quick PR list
gh alias set issues "issue list -a @me"     # Quick issue list
gh alias set bugs "issue list --label bug"  # All bugs
gh alias set deploys "run list -w deploy"   # Deployment runs
gh alias set open "browse"                  # Quick open
```

---

## Resources

- [Official Docs](https://cli.github.com)
- [Extensions](https://github.com/topics/gh-extension)
- [GitHub Automation](https://docs.github.com/en/actions)
