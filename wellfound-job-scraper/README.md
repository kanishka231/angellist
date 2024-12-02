
# Wellfound Job Scraper

This is a React-based web application for scraping job listings from Wellfound (formerly AngelList) based on user-defined criteria. The app offers both free-text and categorized job role searches.

## Features

- **Free Text Search**: Allows users to input any job role and retrieve matching job listings.
- **Category Search**: Enables users to select predefined categories and roles for a more guided search.
- **Real-Time Scraping**: Fetches job listings dynamically from the server.
- **Interactive UI**: Displays job details, including role, company, location, salary, and a link to apply.

## Prerequisites

- Node.js (version 14 or later)
- A running backend server to handle scraping (accessible at `http://localhost:5000/scrape`)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/kanishka231/angellist.git
   cd wellfound-job-scraper
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

## Usage

1. Choose a search method (Free Text or Category).
2. For Free Text:
   - Enter a job role (e.g., "Software Engineer").
   - Click "Scrape Jobs".
3. For Category:
   - Select a job category and specific role.
   - Click "Scrape Jobs".
4. View the scraped job listings and click "View Job Details" or "Apply Now" for more information.

## Environment Variables

The app requires no environment variables but assumes the backend scraping server is running on `http://localhost:5000/scrape`.

## Technologies Used

- React.js
- Axios for HTTP requests
- CSS for styling

## Error Handling

- Displays error messages for various issues, including:
  - No job role provided.
  - No jobs found.
  - Server errors (404, 500, etc.).
  - Network connectivity issues.

## Screenshots

![Screenshot](assets/screenshot.png)
_Above: Screenshot of the application interface._


## License

This project is open-source and available under the MIT License.

---

Feel free to contribute or report issues to improve the application. Enjoy job hunting!
