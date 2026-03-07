---
title: Observability
---

# Observability for Python Automation

## Logging, Monitoring, Tracing — Production-Grade Guide

---

## 0. Observability (the real concept)

**Observability** is the ability to **understand the internal state of a system from its outputs**.

For automation, this means:

> “Given a failure at 3 AM, can I explain *what happened*, *where it happened*, and *why it happened* — without reproducing it?”

Observability is **not** a tool.
It is **not** dashboards.
It is a **design property**.

### The only valid model

```bash
OBSERVABILITY
│
├── Logs    → Evidence (what & why)
├── Metrics → Signals  (how much, how fast, how often)
└── Traces  → Context  (where, across steps)
```

Everything else fits **inside** these three.

---

## 1. Logging (Evidence Layer)

### What logging actually is (precise definition)

Logging is the act of recording **meaningful, structured events** emitted by a running system that allow **post-facto reconstruction of behavior**.

If a log cannot help you reconstruct:

* state
* decisions
* failures

then it is noise.

---

### Production-grade logging principles

#### 1. Log *events*, not code execution

❌ “Entered function X”
✅ “Job transitioned RUNNING → FAILED”

Logs represent **domain events**, not program flow.

---

#### 2. Log boundaries aggressively

Boundaries are where failures hide:

* External APIs
* Databases
* Queues
* File systems

```python
logger.info(
    "external_api_call",
    extra={
        "service": "payments",
        "endpoint": "/charge",
        "status": response.status_code,
        "trace_id": trace_id
    }
)
```

---

#### 3. Logs must be structured or they are useless

Plain text logs **do not scale**.

```python
logger.error(
    "job_failed",
    extra={
        "job_id": job_id,
        "step": "fetch_data",
        "error_type": type(e).__name__,
        "retryable": True,
        "trace_id": trace_id
    },
    exc_info=True
)
```

This enables:

* search
* aggregation
* correlation
* alerting

---

#### 4. Logging levels are semantic contracts

* `INFO` → business-meaningful events
* `WARNING` → anomaly, but system continues
* `ERROR` → operation failed
* `CRITICAL` → system integrity compromised

If everything is ERROR, nothing is.

---

### Error handling (mapped correctly)

**Error handling is not a separate system.**
It is **logging + control flow**.

Best practice:

* Catch errors at **logical boundaries**
* Log **once**, with full context
* Re-raise or fail fast

```python
try:
    charge_customer()
except PaymentTimeout as e:
    logger.error(
        "payment_timeout",
        extra={"order_id": order_id, "trace_id": trace_id},
        exc_info=True
    )
    raise
```

Never:

* swallow errors silently
* log the same error multiple times in a stack

---

### Audit logs (still logging)

Audit logs are **append-only, immutable, intent-focused logs**.

Differences from normal logs:

* No DEBUG
* No deletion
* Strong identity context
* Long retention

```python
audit_logger.info(
    "user_action",
    extra={
        "actor_id": user_id,
        "action": "delete_invoice",
        "resource_id": invoice_id,
        "ip": request_ip
    }
)
```

Still logging.
Just **stricter guarantees**.

---

## 2. Monitoring (Signal Layer)

### What monitoring actually is

Monitoring answers **binary questions**:

* Is the system alive?
* Is it healthy?
* Is it degrading?

Monitoring **does not explain** — it **detects**.

---

### Metrics that matter for automation

Forget vanity metrics.

You need:

* **Throughput** (jobs processed)
* **Success / failure rate**
* **Latency** (P95 matters more than average)
* **Queue depth**
* **Age of oldest job**

```python
metrics.increment("jobs.total")
metrics.increment("jobs.failed")
metrics.timing("job.duration", duration)
metrics.gauge("queue.depth", queue_size)
```

---

### Health checks (mapped correctly)

Health checks are **monitoring endpoints**, not logging.

Purpose:

* “Can this process accept work *right now*?”

```python
@app.get("/health")
def health():
    return {
        "db": db_alive(),
        "queue": queue_alive()
    }
```

Health checks should:

* be fast
* not depend on external APIs
* return **degraded**, not just pass/fail

---

### Monitoring async systems (automation reality)

Automation fails by:

* stopping silently
* stalling
* retrying forever

So you monitor:

* **absence of signals**
* not just error spikes

Example rule:

> If zero jobs complete in 60 minutes → system is broken

This is **observability maturity**.

---

## 3. Tracing (Context Layer)

### What tracing really is

Tracing is **causal context propagation**.

In Python automation, this is usually:

* a `trace_id`
* passed through:

  * logs
  * queue messages
  * API headers

---

### Production-grade tracing rule

> Every externally triggered workflow gets **exactly one trace ID**, created at the edge.

```python
trace_id = uuid.uuid4().hex
```

Then **never regenerate it**.

---

### Trace propagation example

```python
logger.info("job_enqueued", extra={"trace_id": trace_id})

queue.send({
    "job_id": job_id,
    "trace_id": trace_id
})
```

Worker:

```python
logger.info("job_started", extra={"trace_id": trace_id})
```

Now you can reconstruct:

* request → queue → worker → DB → API → retry → failure

---

## 4. Profiling & Performance (correctly framed)

Profiling is **not separate observability**.

It is:

* metrics (latency, CPU, memory)
* traces (where time is spent)

Examples:

* slow DB query → trace span
* CPU spike → metric
* memory leak → metric trend

Same pillars. Deeper usage.

---

## 5. Debugging (what it actually is)

Debugging is **the act of querying observability data**.

Tools:

* logs (why)
* traces (where)
* metrics (when & how much)

Debugging is **not**:

* print statements
* rerunning production logic
* SSH into servers (anti-pattern)

Good observability eliminates most debugging.

---

## 6. OpenTelemetry (proper positioning)

OpenTelemetry is:

* a **standard**
* for emitting logs, metrics, traces
* not a requirement
* not a concept

You adopt it when:

* you have multiple services
* you want vendor-neutral instrumentation

Conceptually, nothing changes.

---

## 7. APM tools (Datadog, New Relic, etc.)

APM tools:

* **consume** logs
* **consume** metrics
* **consume** traces

They do not replace observability design.

Bad systems with Datadog are still bad systems.

---

## 8. Final mental compression (this matters)

Everything reduces to this:

* Logs = evidence
* Metrics = signals
* Traces = context

Error handling, audit logs, health checks, profiling, debugging, APM —
**all live inside these three**.

That’s why senior engineers always come back here.
