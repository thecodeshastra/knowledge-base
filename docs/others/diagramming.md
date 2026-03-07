---
title: "Diagramming"
---

# Automation Diagramming Playbook

> **Goal**: Design, build, review, and operate automation systems faster with fewer mistakes.
>
> **Mission**: Reduce risk in automation design and operation.
>
> **Principle**: Diagrams exist to reduce risk, not to look pretty.

---

## 0. The Mental Model (explain like I’m 5)

Automation is a robot doing work for us.

Diagrams are **maps** for the robot:

* Where it starts
* What decisions it makes
* What can go wrong
* How it remembers things

If the map is unclear, the robot breaks.

---

## 1. Why Diagrams Exist (Automation-First)

Diagrams are **thinking tools**, not documentation for later.

They help you:

* Catch bugs *before* writing code
* Estimate real ROI (time, cost, risk)
* Avoid fragile automations
* Teach others without re-explaining everything

### What diagrams do NOT do

* They do not replace code
* They do not explain libraries or SDK internals
* They do not guarantee correctness

> If a diagram doesn’t change a decision, it probably shouldn’t exist.

---

## 2. The Only 7 Diagrams You Ever Need

### Golden Rule

> **One diagram = one question**

If it answers more than one question → split it.

### Summary table

| Diagram Type       | Answers     | Mandatory?        |
| ------------------ | ----------- | ----------------- |
| System Context     | Why / Where | ✅ Always         |
| Architecture       | What        | ✅ Always         |
| Workflow           | How         | ✅ Always         |
| Decision Logic     | Brain       | ⚠️ If AI/rules    |
| State              | Memory      | ⚠️ If long-lived  |
| Failure & Recovery | Reality     | ⚠️ For production |
| Security           | Trust       | Optional          |

---

### 1️⃣ System Context Diagram

**Question it answers**: Why does this system exist and where does it sit?

**Shows**:

* Users / roles
* External systems
* High-level inputs & outputs

**Does NOT show**:

* Internal services
* Databases
* Business logic

**Mandatory**: Always

**Smell test**:

* Can you explain the system in 30–60 seconds using only this?

---

### 2️⃣ Architecture Diagram

**Question it answers**: What are the major building blocks?

**Shows**:

* Services / layers
* Datastores
* Clear boundaries

**Does NOT show**:

* Step-by-step flows
* Retry logic

**Mandatory**: Always

**Smell test**:

* Can you assign one owner per box?

---

### 3️⃣ Workflow Diagram

**Question it answers**: How does the automation work step by step?

**Shows**:

* Sequence of actions
* Decision points
* Loops & retries

**Does NOT show**:

* UI styling
* Code details

**Mandatory**: Always

**Smell test**:

* Can someone implement this without asking questions?

---

### 4️⃣ Decision / Logic Diagram

**Question it answers**: How does the system decide?

**Shows**:

* Conditions
* Thresholds
* Outcomes
* Human overrides

**Mandatory**: If rules or AI exist

**Smell test**:

* Can a non-engineer understand why a decision was made?

---

### 5️⃣ State Diagram

**Question it answers**: What states can this object be in over time?

**Shows**:

* Valid states
* Allowed transitions
* Terminal states

**Mandatory**: If data lives beyond one request

**Smell test**:

* Is every transition intentional?

---

### 6️⃣ Failure & Recovery Diagram

**Question it answers**: What breaks, and what happens next?

**Shows**:

* Failure points
* Retries
* Dead ends
* Human escalation

**Mandatory**: Before production

**Smell test**:

* At 2 AM, is the response obvious?

---

### 7️⃣ Security & Audit Diagram

**Question it answers**: Who can access what, and who did what?

**Shows**:

* Auth boundaries
* Sensitive data flow
* Audit logs

**Mandatory**: Enterprise / sensitive data

**Smell test**:

* Can you answer “who accessed this and when?”

---

## 3. Diagram → Execution Mapping (CRITICAL)

Diagrams must map to real artifacts.

| Diagram      | Maps To                           |
| ------------ | --------------------------------- |
| Context      | README, pitch, scope              |
| Architecture | Repo structure, services          |
| Workflow     | n8n / Celery / Temporal / Airflow |
| Decision     | Rules engine, config, prompts     |
| State        | DB tables, enums                  |
| Failure      | Retries, DLQs, alerts             |
| Security     | IAM, auth middleware, audit logs  |

> If you cannot point to the code/config this diagram represents, it is lying.

---

## 4. Excalidraw Standards (Non-Negotiable)

### Naming

* One diagram = one file
* Filename answers the question

  * `workflow_email_triage.excalidraw`

### Colors (keep minimal)

* Blue: systems
* Green: happy path
* Red: failure
* Yellow: decision

### Boundaries

* Draw system boundaries explicitly
* External systems always outside

### Versioning

* Diagrams live in the repo
* Updated with logic changes
* PRs must include diagram updates

---

## 5. AI-Aware Automation Diagrams

AI introduces uncertainty. Diagrams must show it.

### Always mark

* AI decision points
* Confidence thresholds
* Human-in-the-loop gates

### Never let AI

* Change money
* Delete data
* Escalate humans

Without a human checkpoint.

> If AI decides, humans must be able to override.

---

## 6. Failure & Ops Readiness

Before production, you must answer:

* What fails first?
* What retries?
* When do we stop retrying?
* Who gets notified?

If it’s not drawn, it’s not owned.

---

## 7. Diagram Review Checklist

Before building:

* Context diagram approved
* Workflow fully defined
* Decisions explicit

Before production:

* State diagram validated
* Failure paths clear
* Security reviewed

---

## 8. Example: Automation System (Email → AI Triage → Action Automation)

* System context

```markdown
[ External Senders ]
          ↓
       [ Email ]
          ↓
 ┌────────────────────┐
 │  Email Triage Bot  │
 └────────────────────┘
    ↓        ↓        ↓
 [ Slack ] [ CRM ] [ Task DB ]
```

**Architecture**:

```markdown
┌──────────────┐
│ Email Ingest │  ← IMAP / Gmail API
└──────┬───────┘
       ↓
┌──────────────┐
│ Preprocessor │  ← validation, cleaning
└──────┬───────┘
       ↓
┌──────────────┐
│ Decision     │  ← AI + rules
│ Engine       │
└──────┬───────┘
       ↓
┌──────────────┐
│ Action Layer │  ← Slack / CRM / Tasks
└──────┬───────┘
       ↓
┌──────────────┐
│ Persistence  │  ← DB + audit logs
└──────────────┘

```

**Workflow**:

```markdown
Email Received
      ↓
Validate Sender
      ↓
Extract Content
      ↓
Is Email Processable?
   ┌─────Yes─────┐
   ↓             ↓
Run AI Triage   Ignore / Log
   ↓
Decide Action
   ↓
Execute Action
   ↓
Store Result

```

**Decision**:

```markdown
Is Urgent?
  |
  |-- Yes → Confidence ≥ 0.85?
  |           |
  |           |-- Yes → Notify Slack (Immediate)
  |           |
  |           |-- No  → Human Review Queue
  |
  |-- No  → Create Task (Normal Priority)

```

**State**:

```markdown
RECEIVED
   ↓
PROCESSING
   ↓
DECIDED
   ↓
ACTION_TAKEN
   ↓
COMPLETED


Failure transition

PROCESSING → FAILED → RETRYING → PROCESSING
                    ↓
                 DEAD_LETTER

```

**Failure**:

```markdown
Email API Fails
     ↓
Retry (x3, backoff)
     ↓
Still Fails?
   | Yes
   ↓
Store in DLQ
   ↓
Alert Ops (Slack / Email)

```

**Security**:

```markdown
Email API
   ↓ (OAuth)
Ingestion Service
   ↓ (Service Token)
Decision Engine
   ↓
Encrypted Database
   ↓
Audit Log (append-only)


Audit record example

email_id | decision | confidence | action | timestamp

```

---

## Final Rule (Memorize This)

> **Context → Architecture → Workflow → Decision → State → Failure → Security**

This order will never fail you.
