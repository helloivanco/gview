# GView - Google Trends x TradingView

GView is a Node.js tool that converts Google Trends data into TradingView Pine Script format, allowing you to visualize search trend data directly on TradingView charts.

## Features

- Fetch historical Google Trends data since 2004
- Convert trend data into TradingView Pine Script
- Support for multiple search terms
- Automatic file generation on desktop
- Interactive command-line interface

## Installation

1. Clone this repository:

```bash
git clone https://github.com/helloivanco/gview.git
cd gview
```

2. Install dependencies:

```bash
npm install
```

## Usage

1. Run the tool:

```bash
node run.js
```

2. When prompted, enter your search terms separated by commas:

```bash
Enter search terms (comma-separated): buy nvda
```

3. The tool will generate a Pine Script file on your desktop named after your search terms (e.g., `buy_nvda.txt`)

4. Copy the contents of the generated file and paste it into TradingView's Pine Script Editor

## Output

The tool generates a Pine Script (version 5) that:

- Plots the Google Trends data as a step line
- Uses an orange line for visibility
- Displays data on the left scale
- Overlays the data on the main chart

## Dependencies

- google-trends-api
- Node.js fs and path modules

## File Structure

- `run.js` - Main entry point
- `google-trends.js` - Handles Google Trends API interactions
- `format-data-to-pine.js` - Converts data to Pine Script format

## Error Handling

The tool includes error handling for:

- API rate limiting
- Network issues
- Invalid JSON responses
- File system operations

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open-source and free to use.
