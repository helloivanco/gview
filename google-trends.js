const googleTrends = require('google-trends-api');

/**
 * Fetches Google Trends data for given keywords
 * @param {string[]} keywords - Array of keywords to compare
 * @param {Object} options - Optional parameters
 * @param {string} options.startTime - Start date (default: 7 days ago)
 * @param {string} options.endTime - End date (default: current date)
 * @param {string} options.geo - Geographic location (default: worldwide)
 * @returns {Promise<Object>} Parsed Google Trends data
 */
async function getTrendsData(keywords, options = {}) {
  try {
    const defaultOptions = {
      startTime: new Date('2004-01-01'),
      endTime: new Date(),
      geo: '',
    };

    const searchOptions = {
      ...defaultOptions,
      ...options,
      keyword: keywords,
    };

    const results = await googleTrends.interestOverTime(searchOptions);

    if (results.startsWith('<')) {
      throw new Error(
        'Received HTML response instead of JSON. This might be due to rate limiting or network issues.'
      );
    }

    try {
      return JSON.parse(results);
    } catch (parseError) {
      throw new Error(
        `Failed to parse Google Trends response: ${parseError.message}`
      );
    }
  } catch (error) {
    console.error('Error fetching Google Trends data:', error);
    throw error;
  }
}

module.exports = {
  getTrendsData,
};
