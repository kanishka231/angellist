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
   git clone https://github.com/kanishka231/angellist.git
   cd backend
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   python app.py
   ```

The application will be accessible at `http://127.0.0.1:5000`.

## API Usage

### Endpoint
`GET /scrape`

### Query Parameters
- **role** (required): The job role to search for.

### Example Request
```bash
curl "http://127.0.0.1:5000/scrape?role=software-engineer"
```

### Example Response
```json
[
    {
        "Company": "Awesome Startup",
        "Link": "https://wellfound.com/jobs/12345",
        "Role": "Software Engineer"
    },
    {
        "Company": "Innovative Tech",
        "Link": "https://wellfound.com/jobs/67890",
        "Role": "Backend Developer"
    }
]
```

### Error Responses
- Missing role parameter:
  ```json
  {
      "error": "Please provide a role to search for jobs."
  }
  ```

- Unable to fetch data (e.g., network issues):
  ```json
  {
      "error": "Network error or invalid URL."
  }
  ```

## File Structure
```
backend/
│
├── app.py                  # Main application file
├── requirements.txt        # Python dependencies
├── README.md               # Documentation (this file)
```

## Dependencies
- Flask
- Flask-CORS
- aiohttp
- beautifulsoup4

Install these using:
```bash
pip install -r requirements.txt
```

## How It Works
1. The `/scrape` endpoint accepts a `role` query parameter.
2. It initiates asynchronous requests to Wellfound to fetch job listings.
3. The `BeautifulSoup` library parses the HTML response to extract relevant data.
4. Pagination is handled to retrieve all results.
5. The API returns the results as a JSON response.

## Future Enhancements
- Add support for additional filtering options (e.g., location, company size).
- Implement caching to reduce repeated network requests.
- Improve error handling for edge cases.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgements
- [Flask](https://flask.palletsprojects.com/)
- [aiohttp](https://docs.aiohttp.org/)
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/)

---
**Note:** Scraping websites may violate their terms of service. Use this application responsibly.
