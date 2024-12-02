from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import re

app = Flask(__name__)

def scrape_wellfound(role=""):
    base_url = "https://wellfound.com"

    if not role:
        return {"error": "You must provide a role to search for jobs."}

    page = 1  # Start with the first page
    results = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }

    while True:
        url = f"{base_url}/role/{role}?page={page}"
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()

            soup = BeautifulSoup(response.text, 'html.parser')

            # Dynamically find job listings
            job_listings = soup.find_all('div', class_=re.compile(r'mb-6 w-full rounded'))

            if not job_listings:
                # Break loop if no jobs are found on the current page
                break

            for job in job_listings:
                # Extract company name
                company_tag = job.find('h2', class_=re.compile(r'text-md font-semibold'))
                company_name = company_tag.text.strip() if company_tag else "Unknown Company"

                # Extract job role
                role_tag = job.find('a', href=re.compile(r'/jobs/'))
                job_role = role_tag.text.strip() if role_tag else "Unknown Role"
                job_link = base_url + role_tag['href'] if role_tag else "No Link"

                # Extract location
                location_tag = job.find('span', text=re.compile(r'[a-zA-Z]+'))
                location = location_tag.text.strip() if location_tag else "Unknown Location"

                # Extract experience
                experience_tag = job.find('span', text=re.compile(r'\d+\s+years'))
                experience = experience_tag.text.strip() if experience_tag else "Not Mentioned"

                # Extract actively hiring status
                hiring_status_tag = job.find('div', text=re.compile(r'Actively Hiring'))
                actively_hiring = "Yes" if hiring_status_tag else "No"

                # Append to results
                results.append({
                    "Company": company_name,
                    "Role": job_role,
                    "Job Link": job_link,
                    "Location": location,
                    "Experience": experience,
                    "Actively Hiring": actively_hiring,
                })

            # Move to the next page
            page += 1

        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

    return results

@app.route('/scrape', methods=['GET'])
def scrape():
    role = request.args.get('role')
    if not role:
        return jsonify({"error": "Please provide a role to search for jobs."}), 400

    results = scrape_wellfound(role)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)

