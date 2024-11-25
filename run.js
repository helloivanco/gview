const { getTrendsData } = require('./google-trends');
const { formatDataToPine } = require('./format-data-to-pine');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function runTrendsSearch() {
  try {
    // Prompt for search terms
    const keywords = await new Promise((resolve) => {
      rl.question('Enter search terms (comma-separated): ', (answer) => {
        resolve(answer.split(',').map((term) => term.trim()));
      });
    });

    console.log('Fetching trends data for:', keywords);
    const trendsData = await getTrendsData(keywords);

    // Save to file
    formatDataToPine(trendsData.default.timelineData, keywords);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
}

// Run the search
runTrendsSearch();
