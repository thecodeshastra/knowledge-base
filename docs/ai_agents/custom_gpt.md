---
title: Custom GPTs
---

# Custom GPT

## Building a Custom GPT

Building a custom GPT is fundamentally about **programming its future behavior** through specialized instructions, rather than just engaging in a standard conversation. It involves creating a mini-application within an AI model that combines specific personas, knowledge bases, and functional tools.

Below are detailed notes on building a custom GPT, structured by the core development phases identified in the sources.

### **1. Defining the Core Instructions and Persona**

The "Instructions" section is the most critical part of programming a GPT, acting as a **contract** for its behavior.

- **The Persona Pattern:** Instead of a generic assistant, assign a specific role (e.g., "Senior Python Engineer" or "Conservative Financial Manager"). This implicitly changes the tone, vocabulary, and reasoning of the model.
- **Structured Prompt Blocks:** Avoid free-form text. Organize instructions into fixed sections: **Role, Context, Task, Specific Instructions, and Output Format**.
- **The CAPITAL Framework:** Use this to fine-tune the GPT’s interaction style:
    ◦ **C**onfidence: Assured vs. Measured.
    ◦ **A**micability: Friendly vs. Neutral.
    ◦ **P**rofessionalism: Formal vs. Casual.
    ◦ **I**nteractivity: Engaging (back-and-forth) vs. Informative.
    ◦ **T**ransparency: Open vs. Discreet about its reasoning.
    ◦ **A**daptability: Adaptive (matching user tone) vs. Consistent.
    ◦ **L**exicography: Specialized jargon vs. Universal language.

### **2. Integrating Knowledge (Retrieval-Augmented Generation)**

Custom GPTs allow you to provide proprietary data that the model wasn't originally trained on.

- **Retrieval-Augmented Generation (RAG):** When a user asks a question, the system searches your uploaded documents for relevant "chunks" of text and pastes them into the hidden prompt for the AI to reference.
- **Citation & Fact-Checking:** Instruct the GPT to provide **direct quotations** and page numbers from your uploaded files. This helps the user verify the information and reduces the risk of "hallucinations" (the AI making things up).
- **Handling Missing Knowledge:** Explicitly tell the GPT what to do if the answer isn't in its documents (e.g., "refer them to the support desk" or "state that the answer is unclear") rather than letting it guess.

### **3. Configuring Capabilities and Tools**

Select only the tools your specific use case requires to reduce complexity and errors.

- **Standard Capabilities:** These include **Web Browsing** (for current info), **DALL-E** (image generation), and **Code Interpreter** (for math and data analysis).
- **Actions:** These are custom APIs that allow the GPT to interact with the outside world, such as looking up an employee in a corporate directory or submitting an expense report.
- **Menu Actions Pattern:** You can pre-bake "slash commands" (e.g., `/email` or `/rules`) into your GPT so users can trigger complex tasks with a short command.

### **4. Advanced Interaction Strategies**

To make a GPT more effective, you can program it with specific logic patterns:

- **Flipped Interaction Pattern:** Instruct the GPT to **ask the user questions** until it has enough information to solve a problem. This is ideal when the user might not know what information is relevant.
- **Cognitive Verifiers Pattern:** Program the GPT to break a complex user query into 3–4 sub-questions, answer them individually, and then combine those answers for a final response.
- **Question Refinement:** Have the GPT automatically suggest a better, more specific version of the user's question before answering to reduce ambiguity.

### **5. Testing and Benchmarking**

Building a successful custom GPT requires systematic testing to ensure it doesn't "regress" when you update its instructions.

- **Create a Benchmark:** Build a table of sample prompts, expected answers, and a **scoring rubric (1–10)**.
- **"What If" Scenarios:** Test the GPT with edge cases, such as a user using technical jargon incorrectly or asking for a non-existent product.
- **Adversarial Testing:** Try to "break" the GPT’s guardrails by acting as a malicious user to see if you can get it to say something inappropriate or generate unauthorized content.

### **6. Ethics and Responsibility**

The developer (or the business) is legally and reputationally responsible for the GPT's output, not the AI itself.

- **Human-in-the-Loop:** Design the GPT to support human reasoning (Augmented Intelligence) rather than replacing it.
- **Transparency:** If a GPT makes a promise (like a discount), courts may hold the organization to that promise. Always provide an "escape valve" where a user can reach a real human if the AI is insufficient.

Below are detailed notes on building a custom GPT, structured by the core development phases identified in the sources.

## Trustworthy GenAI

### 1. The Core Philosophy: Augmented Intelligence

- Navigation vs. Generation: Do not use GenAI to generate facts; use it to navigate to them. Instead of asking the AI for an answer, ask it where in a specific document or app that answer can be found.
- Hallucination as a Feature: Hallucination is a "bug" for factual tasks but a "feature" for creative work like brainstorming, poetry, or storytelling.
- Output as a "Draft": Treat every AI response as a starting point or a "first draft" that must be fact-checked, edited, and improved by a human expert.

### 2. The ACHIEVE Framework for Trustworthy Use

This framework helps identify appropriate ways to leverage AI while keeping the human in the loop:

- A: Aiding Human Coordination: Use AI to summarize meetings, identify ambiguities in plans, or list follow-up items.
- C: Cutting Out Tedious Tasks: Use it for repetitive work like categorizing free-text survey responses into groups.
- H: Helping Provide a Safety Net: Ask the AI to review your work for errors, such as finding undefined technical terms in a presentation or identifying conflicting decisions between two different teams.
- IEV: Inspiring Better Problem Solving: Use AI to spark imagination or look for new perspectives (e.g., "Act as a skeptic and find flaws in my assumptions").
- E: Enabling Great Ideas to Scale: Use it to expand a single idea into many variations, such as creating personalized email prompts for dozens of different departments.

### 3. Practical Techniques for Reliability

- The Cost of Checking: Only use AI for tasks where the cost of checking the answer is lower than the cost of producing it yourself. For example, AI is great for solving a crossword (easy to verify), but bad for translating rare ancient scripts (hard to verify).
- Filtering and Traceability: Filtering is one of the safest operations because the output is a subset of the input. Always enforce traceability by requiring the AI to provide line numbers, IDs, or direct quotations to support its claims.
- Flipped Interaction: If the user doesn't know what info is needed, instruct the AI to ask the user questions until it has enough context to solve the problem.
- Alternative Approaches: If an answer is unclear due to policy ambiguity, instruct the AI to suggest "alternative approaches" that are clearly allowable instead of guessing the right answer.

### 4. Where to Use Trustworthy GenAI

You can use these principles in various high-value, low-risk scenarios:

- Internal Support Systems: Building custom GPTs for accounting, HR, or policy questions where the AI can provide direct quotes from internal manuals.
- Education and Training: Creating learning aids that explain complex concepts using analogies (e.g., explaining "attention" in AI to a finance professional).
- Safe Navigation in Apps: Enhancing mobile apps (like healthcare portals) so users can ask "Where is my last lab result?" and the AI navigates them to the correct screen instead of reciting the data.
- Adversarial Testing: Before releasing a GPT to the public, use these principles to "Red Team" or attack it to see if it can be tricked into making inappropriate promises or unethical statements.

### 5. When to AVOID Using GenAI

- High-Risk Decision Making: Avoid tasks involving a high risk to human life, health, or legal reputation (e.g., asking if a medication is safe).
- Unverifiable Expertise: If you lack the expertise to evaluate the output, using the AI is a risk. You must be able to perform a "code review" or "policy check" on everything it produces.
