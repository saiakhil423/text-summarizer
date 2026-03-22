# Text Summarizer CLI

A command-line tool that takes unstructured text and returns a clean structured summary using an LLM.

Built as part of an AI Developer Intern assignment.

---

## What It Does

You give it messy text. It gives you back:
- A one-sentence summary
- Three key points
- A sentiment label (positive / neutral / negative)

---

## Tech Stack

| Part | Tool | Why |
|---|---|---|
| Runtime | Node.js | Simple, no extra setup |
| LLM API | Groq (llama-3.3-70b-versatile) | Free, fast, reliable JSON output |
| Terminal colors | Chalk | Makes output readable |
| Env variables | Dotenv | Keeps API key out of code |

---

## Setup

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/text-summarizer.git
cd text-summarizer
```

**2. Install dependencies**
```bash
npm install
```

**3. Add your API key**
```bash
cp .env.example .env
```
Then open `.env` and paste your Groq API key:
```
GROQ_API_KEY=your_key_here
```
Get a free key at console.groq.com — no credit card needed.

---

## How to Run

**With direct text:**
```bash
node src/index.js "Your text here"
```

**With a file:**
```bash
node src/index.js ./sample.txt
```

---

## Example Output
```
⏳ Analyzing text...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         📊 TEXT ANALYSIS RESULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Summary:
   Tesla reported record profits this quarter driven by strong EV demand.

🔑 Key Points:
   1. Strong EV demand
   2. Expansion into new global markets
   3. Record profits reported

😊 Sentiment:
   POSITIVE
<img width="1511" height="454" alt="image" src="https://github.com/user-attachments/assets/5609410e-1d4e-4ed8-92e3-b33d66129389" />


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Prompt Design

The prompt tells the model three things:
1. **What it is** — a JSON-only analyst (system prompt)
2. **What shape to return** — exact JSON structure with an example
3. **What rules to follow** — one sentence summary, exactly 3 key points, only 3 allowed sentiment values

The strictness is intentional. Without clear rules the model sometimes adds markdown, extra keys, or returns "mostly positive" instead of just "positive" — all of which break JSON parsing.

---

## Project Structure
```
text-summarizer/
  src/
    index.js      ← entry point, reads input
    llm.js        ← calls Groq API, parses response
    prompt.js     ← builds the strict prompt
    output.js     ← prints result in terminal
  .env.example
  package.json
  README.md
```

---

## Trade-offs I Made

- **No web UI** — CLI is simpler and meets the brief. A React frontend would add 2+ hours for no real benefit here.
- **No test coverage** — out of scope for a 1-2 hour task. Would add Jest tests with more time.
- **Single text input only** — no batch processing. Straightforward to add but not required.
- **LLM handles sentiment** — chose this over a separate library like `sentiment` because the LLM understands context. A keyword counter would misread something like "avoided bankruptcy" as negative.

---

## What I'd Add With More Time

- Batch processing — summarize multiple files at once
- Custom output schema — let the user define their own JSON shape via a config file
- Web UI — simple React frontend to make it accessible to non-technical users
- Token count display — show how many tokens were used per request

---
