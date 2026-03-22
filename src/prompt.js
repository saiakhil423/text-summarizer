export function buildPrompt(text) {
  return `
Extract a structured summary from the text below.

Return ONLY this JSON shape:
{
  "summary": "exactly one sentence describing the main idea",
  "keyPoints": [
    "first key point",
    "second key point",
    "third key point"
  ],
  "sentiment": "positive | neutral | negative"
}

Rules:
- "summary" must be exactly ONE sentence
- "keyPoints" must have EXACTLY 3 items
- "sentiment" must be ONLY: "positive", "neutral", or "negative"
- No markdown, no backticks, no text outside the JSON

Text to analyze:
"""
${text}
"""
`.trim();
}