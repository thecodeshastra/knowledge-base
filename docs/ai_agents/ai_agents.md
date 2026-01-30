---
title: AI Agent
---

# AI Agent

Doc Type: Notes
Tags: Agent, GAME, Re-Act, Tools

An AI agent sits at the highest end of the AI complexity spectrum. At its core, an agent is a specific type of **compound AI system** where the Large Language Model (LLM) is responsible for the overall **control logic** and planning.

## Fundamentals

### What is an AI Agent? (Simple Explanation)

**Basic Idea**

- **AI Agent = LLM in a loop with tools that accomplishes goals**
- Think of it like hiring an employee who can think, decide, and take actions autonomously
- Works 24/7 without getting tired, learns from every interaction

**Key Difference: Chatbot vs Agent**

- **Chatbot:**
  - Responds to your questions
  - Generates text
  - Stateless (no memory between conversations)
  - Example: ChatGPT answering "What is quantum physics?"
- **AI Agent:**
  - Takes on complete tasks/goals
  - Can break down complex problems into steps
  - Has memory and context
  - Takes real actions (emails, API calls, database updates)
  - Example: "Organize my entire calendar for this month" → Agent actually does it

**Real-World Analogy**

| **Thing** | **Comparison** |
| --- | --- |
| **Traditional Software** | Vending machine - very rigid, fixed rules |
| **Chatbot** | Customer service rep reading a script |
| **AI Agent** | Talented employee who understands business, makes decisions, calls other departments, solves problems |

---

### 🧠 From Monolithic Models to Compound AI Systems

A major shift in AI is moving from **monolithic models** to **compound AI systems.**

- **Monolithic Model Limitations:** A single model is limited by its training data. It doesn't know personal information (like your vacation days) and can't access live data. Adapting it requires significant investment in data and resources.
- **Compound AI Systems:** These systems "unlock the magic" by integrating a model into existing processes. They are **modular**, combining the model with other programmatic components like:
  - Database search
  - Output verifiers
  - Other tools
  - Retrieval augmented generation (RAG)
- This system approach is often faster and easier to adapt than re-tuning a model. A very common example is **Retrieval Augmented Generation (RAG)**.

---

### 🧭 The AI System Spectrum: Workflows vs. Agents

The main difference between AI systems is their **control logic**—how they decide what to do.

| **System Type** | **Control Logic** | **Description** | **Best For** | **Limitations** |
| --- | --- | --- | --- | --- |
| **Single LLM** | N/A (Direct Input) | A simple, single-turn request and response. | Simple, stateless tasks like summarization or translation. | No memory, no adaptability. |
| **Structured Workflow** | **Programmatic** | The path is predefined and deterministic, like code. | Repetitive, multi-step tasks that need to be predictable and auditable (e.g., compliance, data pipelines). | Rigid. It will fail if it receives a query it wasn't programmed for |
| **Autonomous Agent** | **LLM-Driven** | An LLM is put in charge of the logic21. It uses reasoning to create and adapt a plan. | Complex, open-ended, and ambiguous tasks that require dynamic planning and adaptation. | Unpredictable outcomes, higher cost, and more complex to debug. |

---

### The 5-Step Agent Problem-Solving Process

Every AI agent follows this cycle to accomplish tasks:

**1. Get the Mission**

- User provides a goal: "Book me a flight tomorrow from Mumbai to London"
- Or system triggers: "New high-priority support ticket arrived"

**2. Scan the Scene**

- Agent gathers context:
  - What information do I have in memory?
  - What tools do I have access to?
  - What happened in similar situations before?
  - What's the current state of the world?

**3. Think It Through**

- Agent uses LLM to reason and plan
- "To book a flight, I need to: (1) check your availability, (2) search flights, (3) check budget, (4) book ticket, (5) send confirmation"
- Creates a detailed strategy before acting

**4. Take Action**

- Agent executes one step of the plan
- Calls a tool: "Check calendar for February 15"
- Receives result: "You're free that day"

**5. Observe and Iterate**

- Agent learns from the result
- Adds new information to context
- Loops back to step 3 with updated understanding
- Continues until goal is achieved

### Example: Order Status Agent

```
USER: "Where is my order 12345?"

STEP 1: Mission = Find order status
STEP 2: Scan = I have order database, shipping API, customer context
STEP 3: Think = Need to: (1) Find order in DB (2) Get tracking number (3) Check shipping status
STEP 4: Take Action = Call database: find_order(12345)
STEP 5: Observe = Got order details + tracking number "ZYX987"

Loop back:
STEP 3: Think = Now I need to get current shipping status
STEP 4: Take Action = Call shipping API: get_status("ZYX987")
STEP 5: Observe = "Out for Delivery, will arrive tomorrow"

Final: Report to user: "Your order is out for delivery, arriving tomorrow!"

```

---

### When to Use Agents (Decision Framework)

**✅ USE AGENTS FOR:**

1. **Complex, Multi-Step Tasks**
    - Booking flights (search → compare → check budget → book)
    - Customer support (understand issue → research → propose solution → implement)
    - Report generation (gather data → analyze → write → format → publish)
2. **Tasks Requiring Real-Time Decisions**
    - Dynamic pricing (adjust based on demand)
    - Fraud detection (analyze transaction in real-time)
    - Customer support escalation
3. **Repetitive, Time-Consuming Work**
    - Email management (read, categorize, draft responses)
    - Lead qualification (score hundreds of prospects)
    - Data processing (transform large datasets)
4. **Tasks Needing Learning/Personalization**
    - Product recommendations (learns preferences)
    - Email marketing (learns what works)
    - Content curation (learns interests)
5. **Need 24/7 Availability**
    - Customer support
    - Monitoring systems
    - Automated operations

**❌ DON'T USE AGENTS FOR:**

1. **Simple, Repetitive Tasks** → Use basic automation
2. **Tasks with Fixed Rules** → Use traditional if-then logic
3. **High-Stakes Decisions** → Medical diagnoses, legal decisions (need human approval)
4. **Ultra-Low Latency** → Needs sub-100ms response (agent thinking adds overhead)
5. **No Clear ROI** → If task happens once/year, not worth building

**4 Questions to Ask Before Building**

1. Is the task genuinely complex (multi-step, ambiguous, adaptive)?
2. Will automation save significant time/resources?
3. Does the agent need to learn/improve over time?
4. What happens if the agent makes a mistake?

---

## Core Architecture

### The 4 Essential Components

Every AI agent has these 4 parts working together:

**1. 🧠 Brain (LLM)**

- **What:** The reasoning engine (GPT-4, Claude, Gemini, etc.)
- **Job:** Think, reason, plan, decide
- **Examples:** "I need to search for flights → check budget → book ticket"
- **It does NOT:** Execute actions itself, access real data, take actions

**2. 📝 Instructions (System Prompt)**

- **What:** The agent's "constitution" - guidelines and personality
- **Job:** Tell agent who it is, how to behave, what rules to follow
- **Example:** "You are Sarah, a helpful sales assistant. Always verify customer information before making changes. If unsure, ask for clarification."
- **Impact:** Bad prompts = bad agent. Good prompts = good agent.

**3. ⚙️ Control Logic (Orchestration)**

- **What:** Your code that manages the agent loop
- **Job:** Decide when to call LLM, what to pass to it, what to do with output
- **Responsibility:** The actual intelligence comes from LLM, not your code
- **Example:**

    ```python
    while goal_not_achieved:
        thought = llm(context + tools_available)
        if thought.needs_tool:
            result = execute_tool(thought.tool_name, thought.params)
            context += result
        else:
            return thought.final_answer
    
    ```

**4. 🛠️ Tools (Optional but Powerful)**

- **What:** External capabilities (APIs, databases, functions)
- **Job:** Let agent interact with real world
- **Examples:** Gmail API, Salesforce API, calculator, web search, database queries
- **Without tools:** Just a smart text generator. With tools: Real problem solver.

---

### ⚖️ When to Use an Agent (The 4-Criteria Framework)

Agents are powerful but not always the best choice38. Before using an agent, ask these four questions:

1. **Is the task ambiguous or predictable?**
    - **Use a Workflow** for **predictable** tasks where you can define all the rules and steps in advance.
    - **Use an Agent** for **ambiguous** tasks where the path is unclear, or the task requires exploration and creativity.
2. **Is the value of the task worth the cost?**
    - Agents are expensive and can consume **10 to 100 times more tokens** than a simple workflow.
    - **Use a Workflow** for basic, low-value tasks (like simple customer support).
    - **Use an Agent** only for high-value tasks (like strategic planning) where the cost is justified44.
3. **Does the agent meet minimum capabilities?**
    - Test the agent on its 3-5 key skills. For example, a coding agent *must* be able to write, fix, and validate code snippets. If it fails, scale back.
4. **What happens if the agent makes a mistake?**
    - Evaluate the risk. **Use an Agent** only when the risk is manageable or easily reversible.
    - **Avoid Agents** for:
        - High-volume, low-margin tasks
        - Real-time applications (e.g., instant fraud detection)
        - Zero-error systems (e.g., medical or security decisions)

---

### The Basic Agent Loop (Core Idea)

All agents follow this loop (simple or complex):

```
Input
 ↓
Think (LLM)
 ↓
Decide
 ↓
Act (optional)
 ↓
Stop or repeat
```

Stateless agents **stop after one loop**.

---

## Agent Types

Agents vary based on their capabilities and complexity. Here's the hierarchy from simple to complex:

**Level 0: Core Reasoning System**

- **Just LLM:** No tools, no memory, no interaction
- **Ability:** Explain concepts, plan approaches
- **Limitation:** Doesn't know real-time data (can't answer "What was the score last night?")
- **Use:** Learning concepts, high-level advice

**Level 1: Connected Problem-Solver**

- **LLM + Tools:** Can call external systems
- **New Ability:** Access real-time data, do calculations, retrieve information
- **Example:** "What's the score of Yankees game today?" → Uses Google Search tool → Gets real answer
- **Use:** Simple automation with external data access

**Level 2: Strategic Problem-Solver**

- **LLM + Tools + Context Management:** Can break complex tasks into steps
- **New Ability:** Plan multi-step workflows, adjust strategy based on results
- **Example:** "Find a good coffee shop halfway between office A and office B"
  - Step 1: Calculate midpoint using Maps
  - Step 2: Search coffee shops in that area
  - Step 3: Compare options
  - Step 4: Recommend best one
- **Use:** Complex, multi-step tasks

**Level 3: Collaborative Multi-Agent System**

- **Multiple Agents + Orchestration:** Teams of specialized agents
- **New Ability:** Delegate work, specialize in different tasks
- **Example:** Support team: Triage Agent → routes to Billing/Technical/Complaint Specialist
- **Use:** Very complex problems requiring different expertise

**Level 4: Self-Evolving System**

- **Agents + Learning:** Can create new tools/agents on the fly
- **New Ability:** Identify gaps in capabilities and fill them autonomously
- **Example:** Agent realizes it needs social media monitoring → Creates new agent for it
- **Use:** Advanced research, long-term systems

---

## ⚙️ The Core Components of an AI Agent

AI agents are made possible by three key capabilities:

- **Reasoning:** The agent uses an LLM at its core to solve problems. It is prompted to "think slow", break down complex problems, and create a plan to solve them.
- **Action (Tools):** Agents can act by using external programs called **tools**. The LLM decides *when* and *how* to call these tools to execute its plan. Examples of tools include:
  - Web or database search
  - A calculator
  - Running code
  - Calling other models or APIs
- **Memory:** This refers to the agent's ability to access stored information. This can mean:
  - Its own "inner logs" or "thought process" from solving a problem.
  - The history of its conversation with a user, allowing for a personalized experience.

A popular agent framework is **ReAct**, which combines **Reasoning** and **Acting**. The LLM reasons to create a plan, acts by calling a tool, observes the tool's output, and then reasons again to decide the next step, iterating until the problem is solved.

---

### ReAct Pattern

**What is ReAct?**

**ReAct = Reasoning + Acting**

The most popular framework for building agents. Instead of trying to solve everything in one LLM call, the agent:

1. **Thinks** - Plans next step
2. **Acts** - Calls a tool
3. **Observes** - Gets result
4. **Repeats** - Until goal is achieved

This loop is called **ReAct pattern** and it's the foundation of most modern agents.

**The Loop**

```
Thought → Action → Observation → Thought → Action → Observation → ... → Final Answer
```

**Example: "What's the weather in Paris and should I bring an umbrella?"**

**Step 1:**

```
Thought: I need to check weather in Paris
Action: weather_api(location="Paris")
```

**Step 2:**

```
Observation: {"temperature": 12, "condition": "Rainy"}
Thought: It's rainy, so yes, bring umbrella
Final Answer: Yes, bring an umbrella. It's rainy in Paris, 12°C.
```

**Example 2: Travel Planning**

```
User: "Book me a flight to New York, organize a meeting while there, and book a hotel"

THOUGHT: This is complex. I need to:
1. Check availability
2. Search and book flights
3. Book hotel
4. Schedule meeting

ACTION: Check calendar → "Available Feb 15-20"
OBSERVATION: Got dates
THOUGHT: Now search flights for those dates
ACTION: Search flights → Got options
OBSERVATION: Best option: Feb 15 departure, Feb 20 return
THOUGHT: Now book hotel for 5 nights
ACTION: Book hotel → Confirmed
OBSERVATION: Hotel booking confirmed
THOUGHT: Now schedule the meeting at the hotel
ACTION: Create meeting → Confirmed
THOUGHT: I've completed all tasks
FINAL ANSWER: "Flight booked for Feb 15-20. Hotel reserved for 5 nights. Meeting scheduled for Feb 17 at 2 PM. Total cost: $800 flight + $500 hotel."
```

**Why ReAct Works**

**Problem:** Traditional LLMs are "one-shot" - they think once and output an answer

**Solution:** ReAct gives LLMs a way to:

- ✅ Think multiple times
- ✅ Get feedback from tools
- ✅ Adjust strategy based on results
- ✅ Handle unexpected situations
- ✅ Improve accuracy with iteration
- **Code Example with LiteLLM**

    ```python
    from litellm import completion
    import json
    
    def react_agent(user_query):
        """Simple ReAct agent using LiteLLM"""
    
        tools = {
            "weather": "Get current weather",
            "calendar": "Check user calendar",
            "booking": "Book flights/hotels"
        }
    
        context = f"""
        You are a helpful assistant. You have these tools: {tools}
    
        Think through the problem step by step:
        1. THOUGHT: What do you need to do?
        2. ACTION: Which tool to use?
        3. OBSERVATION: What did you learn?
    
        Repeat until goal is achieved.
        """
    
        messages = [
            {"role": "system", "content": context},
            {"role": "user", "content": user_query}
        ]
    
        max_iterations = 5
        iteration = 0
    
        while iteration < max_iterations:
            # LLM thinks about what to do next
            response = completion(
                model="gpt-3.5-turbo",
                messages=messages,
                temperature=0.7
            )
    
            assistant_response = response.choices[0].message.content
            messages.append({"role": "assistant", "content": assistant_response})
    
            # Check if agent wants to use a tool
            if "THOUGHT:" in assistant_response and "ACTION:" in assistant_response:
                # Parse action and execute it
                # (In real code, you'd parse and execute actual tools)
                observation = "Tool execution result here"
                messages.append({"role": "user", "content": f"Observation: {observation}"})
                iteration += 1
            else:
                # Final answer reached
                return assistant_response
    
        return "Max iterations reached"
    
    # Use it
    result = react_agent("Book me a flight to London next week")
    print(result)
    ```

---

### Tool Calling

**Why Agents Need Tools**

**Problem:** LLMs are pattern-matching machines, not truth machines

- They can't access real-time data
- They can't do math reliably
- They don't know your personal information
- They hallucinate when unsure

**Solution:** Connect LLMs to tools (APIs, functions, databases)

Now the LLM becomes:

- ✅ Factually accurate (uses real data)
- ✅ Capable (can do calculations, access systems)
- ✅ Powerful (can take real actions)

**How Tool Calling Works**

**Step 1: LLM Decides a Tool is Needed**

```
User: "How much did I spend on Uber last month?"
LLM: "I need to check the user's Uber account"
```

**Step 2: LLM Generates Structured Request**

```json
{
  "tool_name": "get_uber_spending",
  "parameters": {
    "month": "January",
    "year": 2026
  }
}
```

**Step 3: System Executes Tool**

```python
result = get_uber_spending(month="January", year=2026)
# Returns: {"total": 245.50, "trips": 12}
```

**Step 4: Result Returned to LLM**

```
Observation: You spent $245.50 on Uber in January 2026 (12 trips)
```

**Step 5: LLM Continues Reasoning**

```
LLM: "User spent $245.50 on Uber last month. That's about $20/trip."
```

**Defining a Tool (Schema)**

Tools must be clearly defined so LLM knows how to use them:

```python
# Example: Tool Definition

def get_user_expenses(category: str, month: int) -> dict:
    """
    Get user's spending in a category for a month.

    Args:
        category: Type of spending (uber, food, entertainment, etc.)
        month: Month number (1-12)

    Returns:
        {"total": float, "transactions": int, "average": float}
    """
    # Implementation here
    pass
```

The LLM needs to understand:

- ✅ **Name:** `get_user_expenses`
- ✅ **Description:** What it does (get spending data)
- ✅ **Parameters:** What inputs it takes (category, month)
- ✅ **Output format:** What it returns (dict with total, transactions, average)
- **Tool Calling with LiteLLM**

    ```python
    from litellm import completion
    import json
    
    # Define tools
    tools = [
        {
            "name": "get_weather",
            "description": "Get current weather for a city",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "City name"}
                },
                "required": ["city"]
            }
        },
        {
            "name": "search_flights",
            "description": "Search for flights",
            "parameters": {
                "type": "object",
                "properties": {
                    "from_city": {"type": "string"},
                    "to_city": {"type": "string"},
                    "date": {"type": "string", "description": "YYYY-MM-DD"}
                },
                "required": ["from_city", "to_city", "date"]
            }
        }
    ]
    
    # Tool implementations
    def get_weather(city):
        return {"city": city, "temp": 22, "condition": "Sunny"}
    
    def search_flights(from_city, to_city, date):
        return {"flights": 5, "cheapest": 150}
    
    # Agent with tool calling
    def agent_with_tools(user_query):
        messages = [
            {"role": "user", "content": user_query}
        ]
    
        response = completion(
            model="gpt-4",
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )
    
        # Check if model wants to call a tool
        if response.choices[0].message.tool_calls:
            tool_call = response.choices[0].message.tool_calls[0]
            tool_name = tool_call.function.name
            tool_args = json.loads(tool_call.function.arguments)
    
            # Execute the tool
            if tool_name == "get_weather":
                result = get_weather(**tool_args)
            elif tool_name == "search_flights":
                result = search_flights(**tool_args)
    
            # Return result to agent
            messages.append({"role": "assistant", "content": response.choices[0].message.content})
            messages.append({"role": "user", "content": f"Tool result: {json.dumps(result)}"})
    
            # Get final response
            final_response = completion(model="gpt-4", messages=messages)
            return final_response.choices[0].message.content
    
        return response.choices[0].message.content
    
    # Use it
    print(agent_with_tools("What's the weather in Paris and are there flights to London next week?"))
    
    ```

---

### Memory Systems

**Why Memory Matters**

- **Without memory:**
  - Agent treats every conversation as brand new
  - Repeats the same questions
  - Can't build on past learnings
  - No personalization
- **With memory:**
  - Agent remembers user preferences
  - Learns from past interactions
  - Provides personalized experience
  - Improves over time

**Two Types of Memory**

1. **Short-Term Memory (Current Conversation)**
    - **What:** Last few messages, current context
    - **Where:** Conversation history
    - **Lifespan:** Current session only
    - **Example:** Last 5 messages with user

    ```python
    short_term_memory = [
        {"role": "user", "content": "I like spicy food"},
        {"role": "assistant", "content": "Great! I'll remember that."},
        {"role": "user", "content": "What restaurants do you recommend?"},
        {"role": "assistant", "content": "Here are spicy restaurants..."}
    ]
    ```

2. **Long-Term Memory (Historical Context)**
    - **What:** Important facts, preferences, past outcomes
    - **Where:** Database, vector database
    - **Lifespan:** Months/years
    - **Example:** User profile, past purchases, conversation history

    ```python
    long_term_memory = {
        "user_preferences": {
            "food": "spicy",
            "cuisine": "Indian",
            "price_range": "moderate"
        },
        "past_interactions": [
            "Asked about restaurants 3 times",
            "Booked Indian restaurant twice",
            "Complained about slow delivery once"
        ],
        "learned_patterns": {
            "orders_on": "Friday nights",
            "preferred_delivery_time": "6-7 PM"
        }
    }
    ```

- **Implementing Memory with LiteLLM**

    ```python
    from litellm import completion
    from typing import List, Dict
    
    class AgentWithMemory:
        def __init__(self):
            self.short_term = []  # Current conversation
            self.long_term = {}   # Stored facts
    
        def update_short_term(self, role: str, content: str):
            """Add to conversation history"""
            self.short_term.append({
                "role": role,
                "content": content
            })
            # Keep only last 10 messages
            if len(self.short_term) > 10:
                self.short_term = self.short_term[-10:]
    
        def save_to_long_term(self, key: str, value: str):
            """Store important facts"""
            self.long_term[key] = value
    
        def build_context(self) -> str:
            """Create full context for LLM"""
            context = "LONG-TERM MEMORY:\\n"
            for key, value in self.long_term.items():
                context += f"- {key}: {value}\\n"
    
            context += "\\nRECENT CONVERSATION:\\n"
            for msg in self.short_term[-5:]:  # Last 5 messages
                context += f"{msg['role']}: {msg['content']}\\n"
    
            return context
    
        def chat(self, user_message: str) -> str:
            """Process user message with memory"""
            self.update_short_term("user", user_message)
    
            # Build context including memory
            context = self.build_context()
    
            # Call LLM with full context
            response = completion(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": f"You are helpful. Remember these facts:\\n{context}"},
                    {"role": "user", "content": user_message}
                ]
            )
    
            assistant_response = response.choices[0].message.content
            self.update_short_term("assistant", assistant_response)
    
            # Extract and save important facts
            if "remember" in user_message.lower():
                self.save_to_long_term("user_preference", user_message)
    
            return assistant_response
    
    # Use it
    agent = AgentWithMemory()
    print(agent.chat("I like spicy Indian food"))
    print(agent.chat("What restaurants do you recommend?"))
    # Agent will remember preference and use it
    ```

---

## GAME Framework

Simple framework to design agents before building them.

**The 4 Components**

1. **G - Goals & Instructions**
    - **What:** What the agent should achieve
    - **Include:** Purpose, constraints, rules, tone
    - **Example:**

    ```
    Goal: Qualify sales leads with 90% accuracy
    Instructions:
    - Ask about company size, budget, timeline
    - Respond within 5 minutes
    - Be professional but friendly
    - Never promise specific features
    - If unsure, escalate to human
    ```

2. **A - Actions**
    - **What:** What the agent can do (not how, just what)
    - **Example:**

    ```
    Actions:
    - Ask question (get information)
    - Search database (find company info)
    - Fetch details (get lead history)
    - Create record (add to CRM)
    - Escalate (send to human)
    ```

3. **M - Memory**
    - **What:** Information the agent can access/remember
    - **Example:**

    ```
    Memory:
    - Conversation history with this lead
    - Company profile (from database)
    - Past interactions (if any)
    - Lead scoring rules
    - FAQs for common answers
    ```

4. **E - Environment**
    - **What:** Where the agent runs and what it connects to
    - **Example:**

    ```
    Environment:
    - Slack chatbot (interface)
    - Salesforce API (CRM)
    - Company database (data)
    - Email system (sending)
    - Web search (research)
    ```

**Key Insight**

- **Actions** = What agent thinks it can do
- **Environment** = How those actions actually work
- This separation means you can:
  - Change how actions work without changing agent logic
  - Test locally, deploy to cloud without code changes
  - Swap tools (Salesforce → HubSpot) easily

---

## MATE Model

Framework for optimizing agent design across 4 dimensions.

**The 4 Factors**

1. **M - Model Efficiency**
    - **Question:** Which LLM should I use?
    - **Strategy:** Match model capability to task complexity
    - **Trade-off:** Speed/cost vs. quality
    - **Examples:**
        - Simple categorization → Claude Haiku or GPT-3.5
        - Complex reasoning → GPT-4 or Claude 3 Opus
        - Medium tasks → Claude 3 Sonnet or GPT-4-Turbo

    ```python
    # Use different models for different agents
    if task_complexity == "simple":
        model = "gpt-3.5-turbo"  # Cheaper, faster
    elif task_complexity == "complex":
        model = "gpt-4"  # Smarter, slower
    else:
        model = "gpt-4-turbo"  # Balanced
    ```

2. **A - Action Specificity**
    - **Question:** How should I define tools?
    - **Strategy:** Create narrow, specific tools (not broad ones)
    - **Bad:** `execute_file_operation()`
    - **Good:** `read_file()`, `write_file()`, `delete_file()`
    - **Why:** Specific tools reduce hallucination (agent won't misuse them)
3. **T - Token Efficiency**
    - **Question:** How do I reduce costs?
    - **Strategy:** Minimize token usage without sacrificing quality
    - **Techniques:**
        - Use concise prompts
        - Cache common results
        - Summarize long contexts
        - Filter unnecessary information
    - **Example:**

    ```python
    # Bad: Long, verbose prompt
    prompt = """You are a very helpful customer support assistant
    who is knowledgeable about all products. Please try your best
    to help the customer with their query about ordering. Be as
    detailed and thorough as possible..."""
    
    # Good: Concise prompt
    prompt = """You are a support agent. Answer this order question: """
    ```

4. **E - Environmental Safety**
    - **Question:** How do I prevent harm?
    - **Strategy:** Constrain what agent can do
    - **Approaches:**
        - Start with read-only access
        - Add human approval for critical actions
        - Use sandboxes
        - Rate limit requests
        - Log all actions
    - **Example:**

    ```python
    # Agent can read database
    Agent allowed: get_user_info()
    
    # Agent cannot delete production data
    Agent blocked: delete_customer_records()
    
    # Agent can suggest refund but human approves
    Agent: suggest_refund($50)
    Human: approve/reject
    Then Agent: execute_refund() if approved
    ```

**MATE in Practice**

```
Balance these 4 factors without optimizing just one:

M (Model): Use GPT-3.5 for lead scoring (cheap)
A (Actions): 5 specific tools (search, create, score, etc.)
T (Token): Concise prompts, caching enabled
E (Safe): Read-only access, human approves refunds > $100

Result: Fast, cheap, accurate, safe agent
```

---

## Multi-Agent Systems

**When Single Agent Isn't Enough**

**Problem:** One agent trying to do everything

```
Same Agent:
- Research competitive prices
- Write product description
- Take payment
- Arrange shipping
- Handle customer support

Result: Confused, makes mistakes, forgets context

```

**Solution:** Team of specialized agents

```
Specialized Agents:
- Researcher Agent: Analyzes competitors
- Writer Agent: Writes descriptions
- Finance Agent: Handles payments
- Logistics Agent: Arranges shipping
- Support Agent: Helps customers

Result: Each expert in their area, better quality

```

**Single Agent vs Multi-Agent**

| Challenge | Single Agent | Multi-Agent |
| --- | --- | --- |
| **Handling complex tasks** | One agent gets confused | Specialists excel |
| **Error detection** | Makes confident wrong answers | Multiple agents verify |
| **Processing speed** | Slow (sequential) | Fast (parallel) |
| **System failure** | Everything stops | Partial degradation |
| **Routing different tasks** | Expensive (same cost for all) | Smart routing (cheap tasks cheap) |
| **Long conversations** | Forgets early messages | Keeps memory separate |
| **Cost** | Cheaper | 2-5x more expensive |
| **Complexity** | Simple | Complex coordination |

**When Multi-Agent Makes Sense**

✅ **Use Multi-Agent if:**

- Tasks naturally divide into specialties
- You need parallel processing speed
- You need validation/error checking
- You can afford 2-5x cost increase
- Tasks are read-heavy (not write-heavy)
- You have debugging infrastructure

❌ **Don't use Multi-Agent if:**

- Single agent can handle it
- Ultra-fast response needed (less than 100ms)
- Budget is tight
- Tasks heavily interdependent
- No monitoring/debugging capability

**Multi-Agent Patterns**

1. Hierarchical (Manager Model)

    ```
    User Request
        ↓
    Manager Agent (routes work)
        ├→ Specialist Agent 1
        ├→ Specialist Agent 2
        └→ Specialist Agent 3
        ↓
    Manager synthesizes → Response
    ```

    **Use:** Clear hierarchy, supervisor oversees work

2. Sequential (Pipeline)

    ```
    Input → Agent 1 → Agent 2 → Agent 3 → Output
         (Research)  (Write)   (Edit)
    ```

    **Use:** Linear workflows, one agent's output is next's input

3. Parallel (Teams)

    ```
            ├→ Agent 1
    Input →─┼→ Agent 2 → Aggregator Agent → Output
            └→ Agent 3
         (All work simultaneously)
    ```

    **Use:** Independent tasks, combine results

4. Peer Network

    ```
    Agent 1 ←→ Agent 2
      ↓   ↘ ↗   ↑
      Agent 3 ← Agent 4
    ```

    **Use:** Agents communicate freely, emergent behavior

- **Example: Multi-Agent E-Commerce System**

    ```python
    from datetime import datetime
    
    class MultiAgentSystem:
        def __init__(self):
            self.agents = {
                "inventory": InventoryAgent(),
                "pricing": PricingAgent(),
                "payment": PaymentAgent(),
                "shipping": ShippingAgent(),
                "support": SupportAgent()
            }
    
        def process_order(self, user_request):
            """Process order with multiple agents"""
    
            # Inventory Agent: Check if in stock
            inventory_ok = self.agents["inventory"].check_stock(
                product_id=user_request.product_id,
                quantity=user_request.qty
            )
    
            if not inventory_ok:
                return "Out of stock"
    
            # Pricing Agent: Calculate dynamic price
            price = self.agents["pricing"].calculate_price(
                product_id=user_request.product_id,
                qty=user_request.qty,
                customer_tier=user_request.customer_tier
            )
    
            # Payment Agent: Process payment
            payment_ok = self.agents["payment"].process(
                amount=price,
                customer_id=user_request.customer_id
            )
    
            if not payment_ok:
                return "Payment failed"
    
            # Shipping Agent: Arrange logistics
            tracking = self.agents["shipping"].book_shipment(
                product_id=user_request.product_id,
                qty=user_request.qty,
                address=user_request.address
            )
    
            # Support Agent: Send confirmation
            self.agents["support"].send_confirmation(
                customer_id=user_request.customer_id,
                tracking=tracking
            )
    
            return {
                "status": "success",
                "price": price,
                "tracking": tracking
            }
    
    # Use it
    system = MultiAgentSystem()
    order = system.process_order(user_request)
    
    ```

---

## Frameworks & Tools

### 1. LangChain

**Best for:** Custom agents with fine control

**Strengths:**

- Most flexible
- Huge ecosystem
- Best documentation
- Easiest to get started

**Weaknesses:**

- Too many options (complexity)
- Requires more code

**Example:**

```python
from langchain_openai import ChatOpenAI
from langchain.agents import initialize_agent, AgentType
from langchain.tools import Tool

llm = ChatOpenAI(model="gpt-4")
tools = [
    Tool(name="Search", func=search_web, description="Search the web"),
    Tool(name="Calculator", func=calculate, description="Do math")
]

agent = initialize_agent(tools, llm, agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION)
result = agent.run("What is 25 * 4 and who won the World Cup in 2022?")

```

### 2. CrewAI

**Best for:** Role-based multi-agent teams

**Strengths:**

- Simple role assignments
- Built for teams
- Good for business workflows
- Easy memory management

**Weaknesses:**

- Less flexible than LangGraph
- Hierarchical only

**Example:**

```python
from crewai import Agent, Task, Crew

researcher = Agent(
    role="Research Analyst",
    goal="Research topics thoroughly",
    tools=[search_tool]
)

writer = Agent(
    role="Content Writer",
    goal="Write compelling content",
    tools=[document_tool]
)

research_task = Task(description="Research AI agents", agent=researcher)
write_task = Task(description="Write article", agent=writer)

crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task]
)

result = crew.kickoff()

```

### 3. LangGraph

**Best for:** Complex state machines and workflows

**Strengths:**

- Full control over state
- Can visualize workflows
- Best for debugging
- Handles complex logic

**Weaknesses:**

- Steepest learning curve
- More code required

### 4. LiteLLM

**Best for:** Switching between LLM providers

**Strengths:**

- One interface for 100+ LLMs
- Easy to experiment
- Cost tracking
- Fallback support

**Weaknesses:**

- Not a complete framework
- Requires your own orchestration

**Example:**

```python
from litellm import completion

# Same code works with any LLM
models = [
    "gpt-4",
    "claude-3-opus-20240229",
    "gemini-pro"
]

for model in models:
    response = completion(
        model=model,
        messages=[{"role": "user", "content": "Hello"}]
    )
    print(f"{model}: {response.choices[0].message.content}")

```

### 5. AutoGen

**Best for:** Flexible multi-agent conversations

**Strengths:**

- Very flexible
- Good for chatting agents
- Code execution support
- Microsoft-backed

**Weaknesses:**

- Less structured
- Harder to debug

### Framework Comparison Table

| Factor | LangChain | CrewAI | LangGraph | LiteLLM | AutoGen |
| --- | --- | --- | --- | --- | --- |
| **Ease** | Medium | Easy | Hard | Easy | Medium |
| **Multi-agent** | Yes | Native | Native | No | Native |
| **Flexibility** | Very High | Medium | Very High | High | High |
| **Learning curve** | Medium | Easy | Hard | Easy | Medium |
| **Best for** | Custom | Teams | Complex | Experiments | Flexible |

---

## Common Pitfalls & Solutions

1. **Hallucination (Agent Confidently Lies)**

    **Problem:** Agent makes up facts with confidence

    ```
    Agent: "XYZ Company was founded in 1892 by John Smith"
    Reality: Founded in 2005 by Sarah Johnson
    ```

    **Solutions:**

    - ✅ Use tools to verify facts
    - ✅ Add fact-checking agent
    - ✅ Reduce temperature (more conservative)
    - ✅ Add instruction: "If unsure, say 'I don't know'"

    ```python
    # Bad: No verification
    response = llm("Tell me about XYZ Company")
    
    # Good: With verification
    research = search_web("XYZ Company founded")
    response = llm("Based on this research, tell me about XYZ Company", context=research)
    ```

2. **Infinite Loops (Agent Gets Stuck)**

    **Problem:** Agent keeps repeating same action

    ```
    Iteration 1: Call search tool
    Iteration 2: Call search tool again (same query)
    Iteration 3: Call search tool again (same query)
    ... never stops
    ```

    **Solutions:**

    - ✅ Set max iteration limit
    - ✅ Track previous actions, don't repeat
    - ✅ Check if progress is being made
    - ✅ Clear termination conditions

    ```python
    max_iterations = 10
    iteration_count = 0
    previous_actions = []
    
    while iteration_count < max_iterations:
        action = agent_think()
    
        # Don't repeat same action
        if action in previous_actions:
            break
    
        previous_actions.append(action)
        result = execute_action(action)
        iteration_count += 1
    ```

3. **Tool Misuse (Using Wrong Tool)**

    **Problem:** Agent calls wrong tool or with wrong params

    ```
    User: "How much did I spend on Uber?"
    Agent calls: get_netflix_spend() instead of get_uber_spend()
    ```

    **Solutions:**

    - ✅ Clear tool descriptions
    - ✅ Limit tools (don't give 50 options)
    - ✅ Few-shot examples ("When to use each tool")
    - ✅ Validation before execution

    ```python
    # Bad: Vague descriptions
    tools = [
        Tool(name="search", description="Search"),
        Tool(name="get_data", description="Get data")
    ]
    
    # Good: Specific descriptions
    tools = [
        Tool(
            name="search_uber_spending",
            description="Get Uber spending for specified month. Returns total spent and number of trips."
        ),
        Tool(
            name="search_netflix_spending",
            description="Get Netflix spending for specified month. Returns subscription cost."
        )
    ]
    ```

4. **Context Overload (Confused by Too Much Info)**

    **Problem:** Agent receives too much context, forgets important parts

    ```
    Agent receives: 50 page document
    Tries to process: Everything at once
    Result: Gets lost, makes mistakes
    
    ```

    **Solutions:**

    - ✅ Summarize before passing to agent
    - ✅ Pass only relevant context
    - ✅ Break into smaller chunks
    - ✅ Use hierarchical agents (split work)

    ```python
    # Bad: Whole document
    context = full_50_page_document
    agent_response = llm(context)
    
    # Good: Summarized
    summary = summarize_document(full_50_page_document)
    agent_response = llm(summary)
    
    # Better: Only relevant parts
    relevant_section = extract_relevant_section(full_document, query)
    agent_response = llm(relevant_section)
    ```

5. **Cost Explosion (Tokens = Money)**

    **Problem:** Agent uses way more tokens than expected

    ```
    Simple query costs: $0.10
    Agent processes same query: $2.00 (20x more!)
    ```

    **Reasons:**

    - Passing unnecessary context
    - Multiple agents repeating work
    - Tool results not being cached
    - Agent retrying unnecessarily

    **Solutions:**

    - ✅ Monitor token usage per agent
    - ✅ Cache tool results
    - ✅ Compress context
    - ✅ Use cheaper models for simple tasks
    - ✅ Batch similar requests

    ```python
    from litellm import completion
    
    # Track tokens
    response = completion(
        model="gpt-4",
        messages=messages
    )
    
    tokens_used = response.usage.total_tokens
    cost = tokens_used * 0.00003  # Cost per token
    
    print(f"Tokens: {tokens_used}, Cost: ${cost:.4f}")
    
    # Optimize
    if cost > budget:
        switch_to_cheaper_model("gpt-3.5-turbo")
    ```

---

## Quick Reference

### When Building an Agent, Remember

1. **Start simple** - One agent, few tools
2. **Test thoroughly** - Real data, edge cases
3. **Monitor everything** - Tokens, errors, accuracy
4. **Iterate fast** - Small improvements add up
5. **Add safeguards** - Human approval for important actions
6. **Document clearly** - Tool descriptions matter

### The Agent Development Cycle

```
Define Goal
    ↓
Design Agent (GAME framework)
    ↓
Build MVP (5-7 core tools)
    ↓
Test extensively
    ↓
Deploy with monitoring
    ↓
Iterate based on metrics
    ↓
Repeat ↑

```

### Tools to Know

- **LangChain** - Full agent framework
- **LiteLLM** - LLM abstraction layer
- **CrewAI** - Multi-agent teams
- **LangGraph** - Complex state management
- **OpenAI API** - Direct LLM access
- **Claude API** - Alternative LLM

---

### Final Checklist

Before building your agent, ensure you have:

- [ ]  Clear problem statement
- [ ]  Defined success metrics
- [ ]  Tool list (5-7 core ones)
- [ ]  Sample test cases
- [ ]  Error handling strategy
- [ ]  Cost estimation
- [ ]  Monitoring plan
- [ ]  Safety guardrails
- [ ]  Human approval gates (if critical)
- [ ]  Documentation
