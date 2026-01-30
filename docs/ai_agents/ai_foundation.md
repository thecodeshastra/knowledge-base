---
title: AI Foundations
---

# AI Foundations

## Artificial Intelligence (AI)

- Meaning: Computer systems performing tasks typically requiring human intelligence, teaching computers to "think".

### Types of AI (by Capability Level)

- Narrow AI
  - Meaning: AI excelling at specific, narrow tasks; cannot transfer skills.
  - Example: Email spam filters, voice assistants like Siri.
- Artificial General Intelligence (AGI)
  - Meaning: Theoretical AI that can understand, learn, and apply knowledge across any domain like a human.
- Artificial Super Intelligence (ASI)
  - Meaning: Purely theoretical AI that exceeds human intelligence in all domains.

### Main AI Approaches

- Discriminative AI
  - Meaning: Analyzes data to make classifications or predictions.
  - Example: Identifying "cat" or "dog" in photos.
- Generative AI
  - Meaning: Creates new content (text, images, music) based on learned patterns.
  - Example: Writing new articles after reading many existing ones

### What is NLP? 🗣️

- **Definition:** NLP is the process of asking a computer to understand the words and sentences that humans form to derive comprehension, much like a person does when listening or reading.
- **Core Function:** NLP's job is to translate between **unstructured text** (what humans naturally say or write) and a **structured representation** that a computer can process.
  - **Unstructured Text Example:** "add eggs and milk to my shopping list".
  - **Structured Example:** A shopping list element with sub-elements for an item like "eggs" and an item like "milk".
- **Sub-processes of NLP:**
  - **Natural Language Understanding (NLU):** Translating from **unstructured** data to **structured** data.
  - **Natural Language Generation (NLG):** Translating from **structured** data to **unstructured** data.

**Common Use Cases for NLP 💡-** NLP has high utility in various AI applications. Examples include:

- **Machine Translation:** Requires understanding the overall **context** and structure of a sentence, not just word-for-word translation, to avoid critical errors (e.g., the "spirit is willing, but the flesh is weak" example).
- **Virtual Assistants/Chatbots:**
  - **Virtual Assistants (like Siri/Alexa):** Derive a command to execute from human spoken utterances.
  - **Chatbots:** Use written language to traverse a decision tree and take an action.
- **Sentiment Analysis:** Analyzing text (like emails or product reviews) to determine the expressed sentiment (e.g., positive vs. negative, serious vs. sarcastic).
- **Spam Detection:** Examining email content for indicators like overused words, poor grammar, or inappropriate claims of urgency to determine if a message is spam.

**Fundamental NLP Tools/Stages 🛠️ -** NLP is not a single algorithm but a "bag of tools" applied to unstructured text.

1. **Tokenization:** The first stage; it breaks a string of text into smaller chunks called **tokens** (e.g., words) to work with them one at a time.
2. **Stemming:** Deriving the **word stem** for a token by removing prefixes and suffixes and normalizing the tense (e.g., *running*, *runs*, *ran* all stem to *run*).
    - *Note:* Stemming can fail for certain words (e.g., *universal* and *university* do not stem well to *universe*).
3. **Lemmatization:** A preferred tool for tokens where stemming fails; it learns a token's meaning through a **dictionary definition** to derive its **root** or **lemma**.
    - *Example:* The lemma of *better* is **good** (the word it is derived from), while its stem would be *bet*.
4. **Part of Speech (POS) Tagging:** Identifies the grammatical role of a token (e.g., noun, verb) based on its use within the sentence context.
    - *Example:* *Make* is a **verb** in "I'm going to make dinner" but a **noun** in "what make is your laptop?".
5. **Named Entity Recognition (NER):** Identifies if an **entity** (like a person's name, location, or organization) is associated with a token.
    - *Examples:* The token *Arizona* has the entity of a U.S. state; *Ralph* has the entity of a person's name.

## Machine Learning (ML)

- Meaning: Teaching computers to learn patterns from data without explicit programming, much like learning from examples.
- Three Main Types of ML
  - Supervised Learning
    - Meaning: Learns from data with known correct answers (like a teacher providing solutions).
    - Example: AI learns to recognize handwritten numbers from labeled examples.
  - Unsupervised Learning
    - Meaning: Finds hidden patterns or groupings in data without pre-labeled answers.
    - Example: Grouping customers by similar purchasing behavior without being told what groups exist.
  - Reinforcement Learning
    - Meaning: Learns optimal actions through trial and error, based on rewards and penalties.
    - Example: AI learns to play chess by being rewarded for wins and penalized for losses.
- Foundation Models
  - Meaning: Large, general-purpose AI models trained on vast data, adaptable to many specific tasks (efficient, versatile)
  - Key features: Versatile, efficient, transfer learning, cost effective
  - How they work: Pre-training, fine-tuning, prompt engineering, few-shot learning

## Large Language Models (LLMs)

- Definition: A specific type of AI designed to understand and generate human language.
- They are like highly sophisticated predictive text systems that have "read" most of the internet.
- How LLMs Work (Simplified)
  - Training Process:
    - Data Collection: Massive amounts of text (books, websites, articles) are gathered.
    - Tokenization: Text is broken into smaller pieces (words/parts of words).
    - Pattern Learning: Statistical relationships between words and phrases are learned.
    - Context Understanding: How words relate in context is learned.
    - Response Generation: New text is generated by predicting likely next words.
  - Generation Process (when prompted):
    - Input Processing: Prompt is broken into tokens.
    - Context Analysis: Meaning and context are understood.
    - Pattern Matching: Relevant patterns from training are found.
    - Word Prediction: Most likely next words are predicted.
    - Sequential Generation: Continues predicting word by word.
    - Output Formation: Predictions combine into coherent responses.
- Most LLMs undergo a two-phase training process:
  - Pre-training (on massive datasets to predict the next word)
  - Fine-tuning (with human feedback for alignment and safety).
- Key Technical Concepts
  - Transformer Architecture: An innovation allowing AI to process entire text sequences at once, using an "Attention Mechanism" to focus on relevant input parts, improving context understanding.
  - Parameters: The "neurons" or connections in the AI's "brain" that store learned patterns and relationships. Modern LLMs have billions or trillions of parameters, impacting sophistication.
  - Context Window: Defines how much text the AI can consider simultaneously, measured in "tokens." This limits how much conversation the AI can "remember" at one time.
- Capabilities of Modern LLMs
  - Language Understanding: Comprehends complex texts, maintains coherent conversations, recognizes nuances (sarcasm, humor), and works multi-lingually.
  - Language Generation: Creates new content like creative writing (stories, poems), technical writing, code, and structured outputs (tables, lists).
  - Reasoning and Analysis: Engages in logical thinking, identifies patterns, synthesizes information, and performs critical analysis.
  - Multimodal Capabilities: Integrates with other AI systems to process images, audio, video, and various document types beyond just text.
- Real world applications:- Content creation, Analysis and research, programming and technical tasks, education and training, etc.
- Important Limitations
  - Knowledge Boundaries: Knows information only up to its training cutoff date, has static knowledge, and cannot learn from real-time conversations. May have gaps on recent events or specialized topics.
  - Accuracy Concerns (Hallucination): Can generate false but plausible-sounding information, often sounding confident even when incorrect. Requires fact-checking.
  - Context Limitations: Finite context window means it can "forget" details from earlier in long conversations, potentially leading to inconsistencies.
  - Understanding Boundaries: Operates primarily on pattern matching, lacking deep understanding of specialized fields, common sense, emotional intelligence, or cultural nuances. It does not possess consciousness or subjective experience.

## The Science Behind AI: How It Actually Works

- This step explains the basic "brain" and "learning" process that allows AI, especially those smart language models, to do what they do.

1. The "Brain" of AI: Neural Networks
    1. What they are: Computer systems inspired by how your brain works. They use simple connected "nodes" (like tiny brain cells) to process information.
    2. Imagine: A committee of tiny decision-makers. Each person (neuron) gets information, decides if it's important, and passes their thoughts to the next group. The last group makes the final call.
2. "Deep" Learning: More Layers, Smarter Learning
    1. What it is: Just neural networks with many layers. The more layers, the deeper the learning.
    2. Imagine: Learning to recognize a cat:
        1. **First Layer**: Detects basic features (edges, lines)
        2. **Second Layer**: Combines edges to recognize shapes
        3. **Third Layer**: Combines shapes to identify objects parts
        4. **Final Layers**: Recognizes complete objects (car, cat, person)
3. How AI Learns (The Training Process) AI learns through a cycle of trial and error:
    1. Forward pass - "Guess": The AI gets some input (like a picture) and makes a guess.
    2. Error calculation - "Check My Work": It compares its guess to the correct answer and figures out how wrong it was.
    3. Backward pass (Back-propagation) - "Adjust": It subtly tweaks its internal connections (the "weights") to be a tiny bit better next time.
    4. Iteration - "Repeat, Repeat, Repeat": It does this millions of times with tons of examples, slowly becoming very good at its task.
4. How Language Models (LLMs) are "Taught" LLMs learn in two main stages:
    1. Phase 1: Reading Everything (Pre-training)
        1. The AI reads a huge amount of text (like most of the internet!).
        2. Its main job is to simply guess the next word in a sentence.
        3. By doing this over and over, it secretly learns grammar, facts, and how to reason. This takes weeks or months.
    2. Phase 2: Learning Manners (Fine-tuning)
        1. After "reading everything," humans give it feedback: "This answer was good," "This one was bad".
        2. The AI uses this feedback to learn to give responses that humans prefer and to avoid harmful or biased content.
5. The "Magic" Behind Understanding Context: Transformers
    1. Key Idea: Self-Attention
        1. Older AI read words one by one, like you reading a book sentence by sentence.
        2. Transformers (the current smart design) are different. They look at all the words in a sentence at once, like reading the whole sentence and instantly seeing how all the words connect.
        3. Why it's great: This lets the AI understand phrases like "The cat sat on the mat because it was tired." The "attention" mechanism helps it know "it" refers to the "cat," not the "mat".
6. The "Power" Needed (Computational Requirements)
    1. Training: Teaching these massive AI models takes huge amounts of computer power (like thousands of powerful graphics cards working for months) and tons of electricity. It can cost millions of dollars.
    2. Using it: When you ask the AI a question, it still needs significant computer power, but much less than training  
7. Why AI Seems So Smart
    1. Super-Scale Pattern Recognition: It has read and processed more information than any human ever could. It finds complex patterns that we would miss.
    2. Smart Guessing: It's constantly predicting the most likely next word or action based on all that training data.
    3. Surprise Abilities: Sometimes, when models get very big, they suddenly gain unexpected skills, like being able to write code or do math, even if they weren't specifically taught to.
8. Limitations of current AI:
    1. No true understanding - Symbol manipulations, pattern matching, lack of consciousness
    2. Training data dependencies - Bias inheritance, knowledge gaps, temporal boundaries
    3. Computational constraints - Context limits, resource requirements, efficiency

## **AI Tools and Platform Categories**

The goal of this module is to shift focus from *how* to prompt to *what* tools are available, recognizing that the ecosystem changes rapidly, so expertise should focus on categories rather than specific products.

The learning here involves understanding the functional **categories** of AI tools and establishing a **framework** for tool selection. This ensures that as a prompt engineer, you can effectively match the task requirements to the most suitable technological platform.

- **Understanding Core AI Platform Categories:** You must be able to categorize platforms based on their function.
  - **General-Purpose Conversational AI:** These are multi-functional AI assistants used for varied tasks like text generation, editing, analysis, and brainstorming. Criteria for evaluating them include model quality, context window size, multimodal support, and cost structure.
  - **Specialized Domain AI:** These are optimized for specific industries (e.g., Legal AI, Healthcare AI, Code Generation AI) and should be chosen when deep expertise is required.
  - **AI Development Platforms:** These are for technical users (developers) who need to build custom AI applications and manage workflow orchestration.
  - **No-Code AI Tools:** These provide AI capabilities to non-technical users via visual workflow builders and pre-built templates, requiring no programming skills.
- **The AI Tool Selection Framework:** You need to know how to evaluate tools systematically.
  - **Performance Factors:** Assess accuracy, consistency, speed, and context understanding.
  - **Practical Factors:** Consider ease of use, cost structure, reliability, and support.
  - **Strategic Factors:** Evaluate scalability, integration with existing workflows, future-proofing, and data privacy policies.
- **Local and Open-Source AI:** You must understand the trade-offs of using models locally.
  - **Benefits:** Increased privacy (data never leaves the system), cost savings (no ongoing usage fees), and full customization.
  - **Considerations:** Requires powerful hardware, more complex technical setup, and model quality may not match state-of-the-art cloud models.

## **Common Challenges and Solutions**

This module prepares you to troubleshoot issues that inevitably arise when applying prompt engineering at scale or in complex workflows.

This step uses a **Symptom-Cause-Solution** format to structure problem-solving, teaching you systematic refinement rather than trial-and-error.

- **Handling Inconsistent or Poor-Quality Outputs:**
  - **Challenge:** Responses are too vague, inconsistent, or don't meet requirements.
  - **Solution:** **Implement Prompt Standardization** (using clear templates) and **Quality Gates** (defined criteria for acceptance).
- **Mitigating Information Accuracy and Hallucination:**
  - **Challenge:** AI generates false but plausible-sounding information because it is predicting the most likely words, not accessing verified facts.
  - **Solution:** Use **Source-Grounded Approaches** (like Retrieval-Augmented Generation, or RAG) to ensure the AI bases its answers on verifiable external data. Also, implement **Fact-Checking Workflows**.
- **Managing Context and Memory Limitations:**
  - **Challenge:** The AI forgets details from earlier in the conversation because it has a finite context window.
  - **Solution:** Use **Context Management Strategies**, such as summarizing previous conversation segments or using **Structured Context Passing** where key information is included in every prompt.
- **Optimizing Costs and Efficiency:**
  - **Challenge:** High usage costs or time spent crafting complex prompts.
  - **Solution:** Practice **Task-Model Matching** (using smaller, less expensive models for simpler tasks) and focus on **Prompt Efficiency** (removing unnecessary words to save on token usage).

## **AI Safety and Ethics**

This module emphasizes responsible AI usage, preparing you to handle ethical risks, biases, and regulatory requirements.

The content is framed around four core ethical principles and practical strategies for risk mitigation, focusing on the responsible deployment of AI outputs.

- **Core Ethical Principles (The Four Principles):**
  - **Beneficence:** Use AI to create positive outcomes and benefits for society.
  - **Non-Maleficence:** Ensure AI usage avoids causing harm, such as spreading misinformation or amplifying bias.
  - **Autonomy:** Maintain human control; AI should enhance human decision-making and be transparent about its role.
  - **Justice and Fairness:** AI applications must be equitable and non-discriminatory.
- **Understanding and Addressing Bias:**
  - You must recognize sources of bias, including **Training Data Bias** (AI learns past discrimination) and **Algorithmic Bias** (design choices that favor certain outcomes).
  - A **Bias-Aware Prompting Framework** should be used to actively mitigate unfair outputs.
- **Privacy and Data Protection:**
  - You must know which data is sensitive (e.g., health, financial, confidential business information) and **never share regulated data** (e.g., subject to GDPR, HIPAA).
  - Use **Privacy-Protecting Prompting Strategies**, such as data anonymization or hypothetical framing, when handling sensitive topics.
- **Avoiding Misuse and Ensuring Compliance:**
  - Be aware of deceptive practices (e.g., generating fake testimonials, impersonating humans).
  - You must understand the need to adhere to relevant **Regulatory Compliance** guidelines, such as data protection laws and industry-specific regulations.

## **Choosing the Right AI Approach**

This module is the capstone of your prompt engineering strategy, teaching you how to decide when basic prompting is enough, and when you need to escalate to more complex, costly, and resource-intensive methods.

This step provides a **Decision Framework** based on **Task Analysis**, **Resource Assessment**, and a comparison of the three main customization approaches, culminating in a **Progressive Implementation Strategy**.

- **The Three Main Approaches and Their Trade-offs:** You must know how Prompt Engineering stacks up against alternatives.
  - **Prompt Engineering:** **Immediate speed**, **low cost**, and **high flexibility**. It is ideal for prototypes and varied tasks.
  - **Fine-Tuning:** High cost and low flexibility but achieves high-volume, consistent performance for specialized domains. Requires technical expertise.
  - **AI Agents:** Very high cost and highly complex, reserved for autonomous systems that plan and execute ongoing processes.
- **The Crucial Hybrid Approach (RAG):**
  - **RAG (Retrieval-Augmented Generation)** is the middle ground.
  - It is used when you need **current, specific information** that was not in the model’s training data.
  - **RAG Benefits:** It is more accurate than pure prompting but less expensive than fine-tuning, and its knowledge base can be updated without retraining the core model.
- **Strategic Implementation (Progressive Strategy):**
  - Always start with **Prompt Engineering** to establish the foundation.
  - Only scale up to **Optimization and RAG Integration** if you need current data or higher accuracy.
  - Reserve **Selective Fine-Tuning** and **Agent Development** for high-volume, highly complex tasks where the cost is justified.
- **Success Factor:** The key to success is using the **simplest approach** that meets your needs and only scaling to more sophisticated methods (like fine-tuning) when results and requirements justify the investment.
