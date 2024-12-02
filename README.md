# Wellfound Job Scraper

This project consists of two main components: a **React frontend** and a **Flask-based backend**. Together, they provide a complete solution for scraping and displaying job listings from [Wellfound](https://wellfound.com).

---

## Frontend: React Application

### Features
- **Free Text Search**: Allows users to input any job role and retrieve matching job listings.
- **Category Search**: Enables users to select predefined categories and roles for a more guided search.
- **Real-Time Scraping**: Fetches job listings dynamically from the backend.
- **Interactive UI**: Displays job details, including role, company, location, salary, and a link to apply.

### Prerequisites
- Node.js (version 14 or later)
- A running backend server to handle scraping (accessible at `http://localhost:5000/scrape`)

### Installation
1. Clone the repository:
   ```bash
      git clone https://github.com/kanishka231/angellist.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

### Environment Variables
The app assumes the backend server is running at `http://localhost:5000/scrape`.

---

## Backend: Flask API

### Features
- Fetches job listings for a specific role from Wellfound.
- Supports pagination to retrieve results from multiple pages.
- Provides a REST API endpoint for querying job roles.
- Handles CORS for cross-origin requests.

### Tech Stack
- **Flask**: Web framework.
- **aiohttp**: Asynchronous HTTP client.
- **BeautifulSoup**: HTML parsing.
- **Flask-CORS**: CORS support for Flask.
- **Python 3.7+**

### Installation

#### Prerequisites
- Python 3.7 or higher
- `pip` package manager

#### Steps
1. Clone the repository:
   ```bash
  git clone https://github.com/kanishka231/angellist.git
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scriptsctivate
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

### API Usage

#### Endpoint
`GET /scrape`

#### Query Parameters
- **role** (required): The job role to search for.

#### Example Request
```bash
curl "http://127.0.0.1:5000/scrape?role=software-engineer"
```

#### Example Response
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

#### Error Responses
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

---

## File Structure
```
angelist/
│
├── wellfound-job-scraper/  
│   ├── src/                # Source code for React app
│   ├── public/             # Public assets
│   ├── package.json        # React app dependencies
│   └── README.md           # Documentation for frontend
│
├── backend/                # Flask-based backend application
│   ├── app.py              # Main application file
│   ├── requirements.txt    # Python dependencies
│   ├── README.md           # Documentation for backend
│
└── README.md               # Combined documentation
```

## Future Enhancements
- Add support for additional filtering options (e.g., location, company size).
- Implement caching to reduce repeated network requests.
- Improve error handling for edge cases.

## License
This project is open-source and available under the MIT License.

---

**Note:** Scraping websites may violate their terms of service. Use this application responsibly.