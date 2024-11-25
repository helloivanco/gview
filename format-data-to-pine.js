const fs = require('fs');
const path = require('path');

function formatDataToPine(jsonData, keywords) {
  let pineScript = '//@version=5\n';
  // Create title from keywords
  const keywordTitle = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  pineScript += `indicator('${keywordTitle} - Google Trends Data', overlay=true, scale=scale.left)\n\n`;

  pineScript += '// Initialize your data variable\n';
  pineScript += 'var float data = na\n\n';
  pineScript += '// Define your data points\n';

  jsonData.forEach((entry) => {
    const timestamp = Number(entry.time) * 1000; // Convert seconds to milliseconds
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // JS months are 0-based
    const day = date.getUTCDate();
    const value = entry.value[0]; // Access the value
    pineScript += `data := time >= timestamp(${year}, ${month}, ${day}, 00, 00) ? ${value} : data\n`;
  });

  pineScript += '\n// Plot the data on the chart\n';
  pineScript += `plot(data, title='${keywordTitle}', style=plot.style_stepline, color=color.new(color.orange, 0), linewidth=3)`;

  // Create filename from keywords (handle both string and array inputs)
  const keywordString = Array.isArray(keywords) ? keywords.join('_') : keywords;
  const filename = `${keywordString
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()}.txt`;

  // Construct desktop path and full filepath
  const desktopPath = path.join(require('os').homedir(), 'Desktop');
  const filepath = path.join(desktopPath, filename);

  // Write the formatted data to a file on desktop
  fs.writeFileSync(filepath, pineScript, { flag: 'w' });

  return pineScript;
}

module.exports = {
  formatDataToPine,
};
