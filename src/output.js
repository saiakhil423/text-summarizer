import chalk from "chalk";

// Maps sentiment value to a chalk color function
const sentimentColor = {
  positive: chalk.green,
  neutral: chalk.yellow,
  negative: chalk.red,
};

export function printResult(result) {
  console.log("\n" + chalk.bold.cyan("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log(chalk.bold.white("         📊 TEXT ANALYSIS RESULT"));
  console.log(chalk.bold.cyan("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));

  // Summary section
  console.log(chalk.bold.white("📄 Summary:"));
  console.log("   " + chalk.white(result.summary));

  console.log();

  // Key points section
  console.log(chalk.bold.white("🔑 Key Points:"));
  result.keyPoints.forEach((point, index) => {
    console.log(`   ${chalk.cyan(index + 1 + ".")} ${chalk.white(point)}`);
  });

  console.log();

  // Sentiment section — color changes based on value
  const colorFn = sentimentColor[result.sentiment] || chalk.white;
  console.log(chalk.bold.white("😊 Sentiment:"));
  console.log("   " + colorFn.bold(result.sentiment.toUpperCase()));

  console.log("\n" + chalk.bold.cyan("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
}

export function printError(message) {
  console.error("\n" + chalk.bold.red("❌ Error: ") + chalk.red(message) + "\n");
}
