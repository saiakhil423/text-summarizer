import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { summarizeText } from "./llm.js";
import { printResult, printError } from "./output.js";

dotenv.config({ quiet: true });

async function main() {
  // Get the argument passed after "node src/index.js"
  const input = process.argv[2];

  // Guard: no input provided at all
  if (!input || input.trim() === "") {
    printError("No input provided.\n\n   Usage:\n   node src/index.js \"your text here\"\n   node src/index.js ./path/to/file.txt");
    process.exit(1);
  }

  let text = "";

  // Check if input is a file path or raw text
  const isFilePath = input.endsWith(".txt") || input.endsWith(".md");

  if (isFilePath) {
    // File mode — read from disk
    const filePath = path.resolve(input);

    if (!fs.existsSync(filePath)) {
      printError(`File not found: ${filePath}`);
      process.exit(1);
    }

    text = fs.readFileSync(filePath, "utf-8").trim();

    if (!text) {
      printError("The file is empty. Please provide a file with content.");
      process.exit(1);
    }

    console.log(`\n📂 Reading from file: ${input}`);

  } else {
    // Direct text mode — use the argument as-is
    text = input.trim();
  }

  // Final guard: text must have some substance
  if (text.length < 10) {
    printError("Input text is too short to summarize. Please provide more context.");
    process.exit(1);
  }

  try {
    console.log("\n⏳ Analyzing text...\n");
    const result = await summarizeText(text);
    printResult(result);
  } catch (err) {
    printError(err.message);
    process.exit(1);
  }
}

main();
