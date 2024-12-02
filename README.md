# Wellfound Job Scraper API

This project is a Flask-based web application that scrapes job listings from [Wellfound](https://wellfound.com) for a specified role. It uses `aiohttp` for asynchronous HTTP requests and `BeautifulSoup` for HTML parsing. The application is designed to handle multiple pages of results efficiently.

## Features
- Fetches job listings for a specific role from Wellfound.
- Supports pagination to retrieve results from multiple pages.
- Provides a REST API endpoint for users to query job roles.
- Handles CORS for cross-origin requests.

## Tech Stack
- **Flask**: Web framework.
- **aiohttp**: Asynchronous HTTP client.
- **BeautifulSoup**: HTML parsing.
- **Flask-CORS**: CORS support for Flask.
- **Python 3.7+**

## Installation

### Prerequisites
- Python 3.7 or higher
- `pip` package manager

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wellfound-job-scraper.git
   cd wellfound-job-scraper
