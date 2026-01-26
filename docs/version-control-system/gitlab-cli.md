---
title: Gitlab CLI
---

# GitLab CLI

## Quick Setup (First Time Only)

### Install GitLab CLI

```bash
# Linux (Debian/Ubuntu)
sudo apt update && sudo apt install glab

# macOS
brew install glab

# Windows
choco install glab
# Or download: https://github.com/profclems/glab/releases
```

### Authenticate

```bash
glab auth login                             # Interactive login (HTTPS or SSH)
glab auth status                            # Check current authentication
glab auth logout                            # Sign out
```

---

## GitLab CLI Commands Cheatsheet

### Repository Basics

```bash
glab repo list                              # List your repositories
glab repo view                              # View current repo info
glab repo clone <namespace/project>         # Clone a repo
glab repo create <name> --public            # Create new repo
glab repo delete <namespace/project>        # Delete repository
```

### Browse & Open

```bash
glab browse                                 # Open current repo in browser
glab browse src/app/main.py -b develop     # Open file on specific branch
glab repo view <namespace/project> --web    # Open specific repo
```

### Issues Management

```bash
glab issue list                             # List open issues
glab issue list --assignee @me              # Issues assigned to you
glab issue create --title "Bug" --body "..."# Create new issue
glab issue view <number>                    # View issue details
glab issue view <number> --web              # Open issue in browser
glab issue comment <number> -m "Fixed!"     # Comment on issue
glab issue close <number>                   # Close an issue
glab issue reopen <number>                  # Reopen issue
glab issue edit <number> --title "New"      # Edit issue
glab issue weight <number> 5                # Set issue weight
```

### Merge Requests (Engineering Flow)

```bash
glab mr list                                # List open MRs
glab mr list --assignee @me                 # MRs assigned to you
glab mr create --fill                       # Create MR from current branch
glab mr create --title "..." --description ""# Create MR with details
glab mr view <number>                       # View MR details
glab mr view <number> --web                 # Open MR in browser
glab mr checkout <number>                   # Checkout MR branch locally
glab mr diff <number>                       # View MR changes
glab mr approve <number>                    # Approve MR
glab mr merge <number>                      # Merge MR
glab mr merge <number> --squash              # Squash & merge
glab mr merge <number> --delete-source-branch # Merge & delete branch
glab mr status                              # Check MR status for your MRs
```

### CI/CD Pipelines

```bash
glab pipeline list                          # List recent pipeline runs
glab pipeline view <pipeline-id>            # View pipeline details
glab pipeline status                        # Check pipeline status
glab pipeline play <pipeline-id>            # Manually trigger pipeline
glab pipeline cancel <pipeline-id>          # Cancel running pipeline
glab pipeline retry <pipeline-id>           # Retry failed pipeline
glab pipeline trace <pipeline-id> <job>     # View job logs
```

### Variables & Secrets

```bash
glab variable list                          # List repository variables
glab variable set <NAME> <value>            # Set environment variable
glab variable delete <NAME>                 # Delete variable
```

### Labels & Milestones

```bash
glab label list                             # List project labels
glab label create <name> --color "FF0000"   # Create label
glab label delete <name>                    # Delete label
glab milestone list                         # List milestones
glab milestone create <title> --due-date "" # Create milestone
```

### Releases & Tags

```bash
glab release list                           # List releases
glab release create v1.0.0 --notes "..."    # Create release
glab tag list                               # List tags
glab tag create <name> --ref main           # Create tag
```

### Aliases & Configuration

```bash
glab alias list                             # List custom aliases
glab alias set <name> "<command>"           # Create alias
glab alias delete <name>                    # Remove alias
glab config set --scope local editor code   # Set editor for project
```

### Search & Discovery

```bash
glab issue search "keyword"                 # Search issues
glab mr search "keyword"                    # Search merge requests
glab project search <name>                  # Search projects
```

---

## Production GitLab Workflows

### 🔀 Engineering Flow: Create MR from Feature Branch

**Scenario**: You've pushed feature branch. Create MR with template and auto-link to issue.

```bash
glab mr create --fill                       # Auto-fill from branch name + template
# Opens editor for title/description if template exists
# Automatically sets reviewers from CODEOWNERS
# Links to issue if branch name contains issue number (e.g., feature/123-auth)
```

**Why**: `--fill` uses `.gitlab/merge_request_templates/` if available. One command, full context.

---

### ✅ Engineering Flow: Review & Merge MR

**Scenario**: Review MR, approve, merge with squash, and clean up branch.

```bash
glab mr view 45 --web                       # Check MR in browser
glab mr approve 45                          # Approve MR
glab mr merge 45 --squash --delete-source-branch  # Squash merge & cleanup
```

**Bonus**: GitLab auto-closes linked issues when MR is merged.

---

### 🔄 DevOps: Monitor & Retry Pipelines

**Scenario**: Check CI/CD pipeline status, view logs, retry if failed.

```bash
glab pipeline list --limit 5                # Get last 5 pipelines
glab pipeline view <pipeline-id>            # See pipeline status & jobs
glab pipeline trace <pipeline-id> deploy    # View deploy job logs in real-time
glab pipeline retry <pipeline-id>           # Retry failed pipeline
```

**Use case**: Monitor deployments from terminal without opening browser.

---

### 🔐 Security: Manage Repository Variables (Secrets)

**Scenario**: Set API keys and environment variables for CI/CD jobs.

```bash
glab variable set STRIPE_API_KEY "sk_live_xxx"
glab variable set DATABASE_URL "postgres://..."
glab variable set SLACK_WEBHOOK "https://..."
glab variable list                          # Verify (values hidden)
```

**Why**: Centralized secret management. Variables auto-injected into pipeline jobs.

---

### 🚀 Automation: Auto-Comment on MR (CI/CD Integration)

**Scenario**: Deployment pipeline auto-comments with deployment URL and status.

```bash
glab mr comment $MR_IID -m "✅ Deployed to staging
- URL: https://staging.example.com
- Build: $CI_PIPELINE_ID
- By: $CI_COMMIT_AUTHOR"
```

**Use case**: In CI/CD pipeline (`.gitlab-ci.yml`) for deployment feedback.

---

## GitLab CI/CD Integration

### Run Pipeline Locally (Optional)

```bash
# Install gitlab-runner (optional, for local testing)
gitlab-runner exec docker build_job
```

### Trigger Pipeline from CLI

```bash
glab pipeline play <pipeline-id>            # Manually trigger/retry
```

---

## GitLab Best Practices

### 🎯 Automation-Friendly

- **Use JSON output** (`--with-pagination`) for scripting
- **Batch operations** with loops for bulk issue/MR updates
- **Integrate into CI/CD** workflows (`.gitlab-ci.yml`)

### ⚡ Performance

- **Use `--limit 1`** when you only need recent items
- **Cache credentials** with `glab auth login` for offline access
- **Leverage built-in CI/CD** instead of external tools

### 🔐 Security

- **Never hardcode tokens** — use `glab auth login` for interactive auth
- **Use CI/CD masked variables** for secrets (variables → protected)
- **Review `glab auth status`** regularly

### 🏗️ Workflows

- **Create aliases** for frequently used commands
- **Use branch naming** conventions for auto-linking (e.g., `feature/123-name`)
- **Leverage auto-close** (MR merges → auto-closes linked issues)
- **Use protected branches** to enforce MR review requirements

---

## Key Differences: GitLab vs GitHub CLI

| Feature | GitHub (`gh`) | GitLab (`glab`) |
| --------- | --------------- | ----------------- |
| **MR/PR Command** | `gh pr` | `glab mr` |
| **Variables** | `gh secret set` | `glab variable set` |
| **Pipelines** | `gh run` | `glab pipeline` |
| **CI/CD Native** | GitHub Actions | GitLab CI/CD (built-in) |
| **Issue Linking** | Manual | Auto-link via branch name |
| **Merge Behavior** | Rebase, squash, merge | Same + auto-close issues |

---

## Resources

- [Official Docs](https://glab.readthedocs.io)
- [GitHub Repo](https://github.com/profclems/glab)
- [GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
