---
title: Git Workflow
---

# Git Workflows

**What is a Git Workflow?**

A Git workflow is a **convention** — an agreed-upon set of rules and processes for how your team uses Git branches, merges, and deploys code. Git itself is flexible (do whatever you want), but workflows bring **consistency and structure** to collaboration.

**Why Git Workflows Matter:**

- Prevent chaos when multiple developers work on the same codebase
- Make code reviews predictable
- Make deployments less stressful
- Prevent merge conflicts and integration nightmares
- Enable smooth collaboration across teams

---

## Three Main Git Workflows

The right workflow depends on **what you're building** and **how you're deploying it**.

### Question That Determines Workflow Choice

> Are you building a **mobile app** (where users have v1.0, v2.0, v3.0 simultaneously)?  
> OR are you building a **web application** (one version in production, deployed continuously)?

These require completely different approaches.

---

## 1. GitFlow — The Structured Approach

### Overview

**Introduced:** 2010 by Vincent Driessen

**Core idea:** Multiple long-lived branches, each serving a specific purpose.

### The Branches

```bash
main (production)
  ↑
  └─ release branch
         ↑
         └─ develop (work in progress)
              ↑
              └─ feature branches (one per feature)
              └─ hotfix branches (emergency fixes)
```

### Branch Purposes

1. **main** — Production-ready code only
2. **develop** — Integration branch, work-in-progress code
3. **feature/*** — Individual feature branches (from develop)
4. **release/*** — Prepare releases (from develop)
5. **hotfix/*** — Emergency fixes (from main)

## GitFlow Example: Simple Feature

```bash
Step 1: Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

Step 2: Work on feature
[Write code, commit multiple times]
git commit -m "Add login form"
git commit -m "Add password validation"

Step 3: Push to remote
git push origin feature/user-authentication

Step 4: Create Pull Request
[Team reviews on GitHub/GitLab]

Step 5: Merge feature back to develop
[After approval]
git checkout develop
git merge feature/user-authentication --no-ff
git push origin develop

Step 6: Delete feature branch
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

### When GitFlow Makes Sense ✅

1. **Building software that ships in versions**
   - Desktop applications
   - Mobile apps (v1.0, v2.0, v3.0 coexist in the wild)
   - Enterprise software (customers on different versions)

2. **Need to support multiple versions simultaneously**
   - Example: v2.3 in production, v2.4 in QA, v3.0 in development
   - Hotfix for v2.3 while building v3.0

3. **Large teams with clear structure**
   - Explicit branches prevent chaos
   - Clear separation of concerns

4. **Regulated industries**
   - Every change is auditable
   - Structured approach for compliance

### When GitFlow Fails ❌

1. **Slows down development and deployment**
   - All branch management = overhead
   - Developers spend time managing branches, not shipping

2. **Doesn't work with continuous delivery**
   - If you want to deploy multiple times per day
   - Long-lived branches create massive merge conflicts
   - Code diverges for too long

3. **Not suitable for web applications**
   - **Even Vincent Driessen (creator) said so!**
   - He updated his blog: "If doing continuous delivery, use simpler workflow"

### GitFlow Verdict

**Good for:** Desktop/mobile apps, versioned software
**Bad for:** Modern web applications, SaaS, continuous deployment
**Complexity:** HIGH
**In 2026:** Rarely used by modern teams (considered overkill)

---

## 2. GitHub Flow — The Minimalist

### Overview

**Introduced:** GitHub team (around 2011), simpler alternative to GitFlow

**Core principle:** Anything in main should always be deployable.

**Just one rule.** That's it.

### The Workflow (Super Simple)

```bash
Step 1: Create branch from main
git checkout main
git pull origin main
git checkout -b fix-profile-upload

Step 2: Make changes
[Write code]
git commit -m "Fix: profile upload timeout issue"

Step 3: Push to remote
git push origin fix-profile-upload

Step 4: Create Pull Request
[Open PR on GitHub/GitLab]
[Team reviews code]

Step 5: Get approved and merge
[After review approval]
git checkout main
git merge fix-profile-upload
git push origin main

Step 6: Deploy immediately
[Automated deployment triggers]
[Feature is live in production]

Step 7: Delete branch
git branch -d fix-profile-upload
```

### GitHub Flow Example: Tuesday Morning Bug Fix

```bash
Tuesday 9:00 AM: Bug discovered
- Users cannot upload profile pictures

Tuesday 9:05 AM: Create fix branch
git checkout -b fix/profile-upload

Tuesday 9:30 AM: Fix the bug
git commit -m "Fix: profile image upload handler"
git push origin fix/profile-upload

Tuesday 10:00 AM: Get reviewed over coffee
[Pull request reviewed]

Tuesday 10:15 AM: Merge and deploy
git merge fix/profile-upload
[Automated tests pass]
[Automated deployment triggers]

Tuesday 12:00 PM: Fix is live
- Users can upload profile pictures again
- Done in 3 hours
```

### GitHub Flow Process

```bash
main (always deployable)
  ↑
  └─ feature/fix branches (exist for days/weeks)
         ↑
         PR → Review → Merge → Deploy
```

### When GitHub Flow Works ✅

1. **Building web applications with continuous deployment**
   - SaaS products
   - APIs
   - Anything hosted (one version in production)

2. **Small to medium teams moving fast**
   - Release features fast
   - Don't need GitFlow's complexity

3. **Solid automated testing + CI/CD pipelines**
   - Tests catch problems on every merge
   - If main is always deployable, you need confidence

4. **Want to ship features, not manage branches**
   - Focus on building, not branch juggling

### When GitHub Flow Struggles ❌

1. **Can't handle multiple versions**
   - Everything goes straight to production
   - No version support strategy

2. **Requires team discipline**
   - If someone merges bad code → main breaks
   - Entire deployment pipeline stops
   - Only works with good testing + code reviews

3. **Difficult with large, distributed teams**
   - Multiple teams stepping on each other's toes
   - Coordination becomes harder

### GitHub Flow Verdict

**Good for:** SaaS, web apps, small-medium teams
**Bad for:** Desktop/mobile apps, multi-version support
**Complexity:** MEDIUM
**Discipline needed:** YES (good testing, code reviews)
**In 2026:** Popular for many teams, widely used

---

## 3. Trunk-Based Development (TBD) — The All-In Approach

### Overview

Modern best practice for high-performing DevOps teams

**Core principle:** Developers integrate continuously to main branch. Code is constantly deployed to production (but features hidden with feature flags).

**Key difference:** No long-lived branches. Integrate small changes multiple times per day.

### The Workflow

```bash
main (production)
  ↑
  ├─ commit from dev-a (small feature hidden by flag)
  ├─ commit from dev-b (small feature hidden by flag)
  ├─ commit from dev-c (small feature hidden by flag)
  ├─ automatic tests run
  ├─ automatic deployment triggers
  ├─ flip feature flag ON
  └─ feature goes live
```

### TBD Example: Checkout Feature (Week-Long Development)

```bash
MONDAY 9:00 AM: Three developers start on "New Checkout" feature
- Dev A: Payment processing
- Dev B: Cart updates
- Dev C: Confirmation page

MONDAY 10:00 AM: Dev A finishes payment logic
git add .
git commit -m "Add payment processing logic [feature flag: new_checkout disabled]"
git push origin main
[Tests run automatically → PASS]
[Code deployed to production automatically]
[Feature invisible to users because flag is OFF]

MONDAY 2:00 PM: Dev B finishes cart updates
git commit -m "Update cart for new flow [feature flag: new_checkout disabled]"
git push origin main
[Tests run → PASS]
[Deployed to production]
[Feature still invisible]

TUESDAY 10:00 AM: Dev C finishes confirmation page
git commit -m "Add new confirmation UI [feature flag: new_checkout disabled]"
git push origin main
[Tests run → PASS]
[Deployed to production]
[All pieces now in production, all invisible]

FRIDAY 11:00 AM: Feature ready
[All developers test together]
[QA validates in production]
[Feature looks good]

FRIDAY 11:30 AM: Flip the flag
glab variable set FEATURE_FLAG_NEW_CHECKOUT "true"
[OR: Manual flag toggle in dashboard]

FRIDAY 11:32 AM: Checkout feature goes LIVE
[Users see new checkout flow]
[Zero merge conflicts]
[Zero integration issues]
[Deployed by Friday lunch]

KEY BENEFIT: Three developers committed to main multiple times per day
- Dev A: 3 commits
- Dev B: 2 commits
- Dev C: 4 commits
= Zero merge conflicts (integrated constantly)
```

## The Three Critical Requirements for TBD

### 1. Bulletproof Automated Testing (NON-NEGOTIABLE)

**Why:** If you're continuously deploying to production, you need confidence code is safe.

**What's needed:**

- Unit tests
- Integration tests
- End-to-end tests
- Security scanning
- Performance tests

**Truth:** If tests are weak, TBD brings chaos. But it exposes your testing weakness immediately and forces you to fix it.

---

### 2. Strong CI/CD Pipeline

**On every commit:**

```bash
Code pushed to main
  ↓ (5-10 minutes)
Automated tests run
  ↓
If PASS → Deploy to production automatically
If FAIL → Block deployment, alert developer
  ↓
Developer fixes and commits again
```

---

### 3. Feature Flags (Essential)

**What:** Code switches that turn features on/off in production without redeploying

**Why TBD needs them:**

- Deploy incomplete features to production
- Test in production with real data
- Gradually roll out (1% → 10% → 100%)
- Instantly disable broken features
- A/B test new features

---

## When TBD Works ✅

1. **Small to medium experienced teams**
   - Developers understand clean code
   - Team is synchronized and trusts each other

2. **SaaS / Web applications**
   - Only one version in production
   - Can deploy multiple times per day

3. **Strong testing culture**
   - Automated tests are extensive
   - CI/CD pipeline is solid

4. **Fast feedback loops critical**
   - Business wants speed to market
   - Users want frequent updates

---

## When TBD Fails ❌

1. **Junior / inexperienced developers**
   - Can break production accidentally
   - Need more safety gates

2. **Weak test coverage**
   - Broken code slips to production
   - Causes incidents

3. **Need to support multiple versions**
   - Desktop apps (v1.0, v2.0, v3.0 installed)
   - Enterprise software (customers on different versions)
   - Mobile apps (version lag on app stores)

4. **Large distributed teams**
   - Hard to keep synchronized
   - Risk of conflicting changes

5. **Slow / risky deployment**
   - Manual deployment process
   - Lengthy approval workflows
   - Regulatory requirements

---

## TBD vs GitFlow vs GitHub Flow (Comparison)

| Aspect | GitFlow | GitHub Flow | TBD |
| -------- | --------- | ------------- | ----- |
| **Branch strategy** | Multiple long-lived | main + feature PRs | main + feature flags |
| **Deployment speed** | Slow (weeks) | Medium (days) | Fast (hours/minutes) |
| **Merge conflicts** | High (branches diverge) | Medium | Minimal (constant integration) |
| **Testing required** | Basic | Good | Excellent |
| **Team maturity** | Structured (large teams) | Medium experience | Senior/experienced |
| **Best for** | Desktop/mobile, versioned | SaaS, web apps | High-velocity SaaS |
| **Complexity** | HIGH | MEDIUM | LOW (but disciplined) |
| **Feature availability** | Releases per month | Releases per week | Releases per day |

---
