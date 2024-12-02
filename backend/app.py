from flask import Flask, request, jsonify
import aiohttp
import asyncio
from bs4 import BeautifulSoup
import re

app = Flask(__name__)

async def fetch_page(session, role, page):
    """
    Fetch a single page of job listings and parse it.
    """
    base_url = "https://wellfound.com"
    url = f"{base_url}/role/{role}?page={page}"

    try:
        async with session.get(url) as response:
            if response.status == 404:
                return [], False
            
            response.raise_for_status()
            text = await response.text()
            soup = BeautifulSoup(text, 'html.parser')

            job_listings = soup.find_all('div', class_=re.compile(r'mb-6 w-full rounded'))

            results = []
            for job in job_listings:
                role_tag = job.find('a', href=re.compile(r'/jobs/'))
                job_id = role_tag['href'] if role_tag else None

                if job_id:
                    company_tag = job.find('h2', class_=re.compile(r'text-md font-semibold'))
                    company_name = company_tag.text.strip() if company_tag else "Unknown Company"

                    job_role = role_tag.text.strip() if role_tag else "Unknown Role"
                    job_link = base_url + job_id if job_id else "No Link"

                    results.append({
                        "Company": company_name,
                        "Job Link": job_link,
                        "Role": job_role,
                    })

            return results, bool(results)

    except Exception as e:
        return {"error": str(e)}, False

async def scrape_wellfound(role=""):
    if not role:
        return {"error": "You must provide a role to search for jobs."}

    results = []
    page = 1

    async with aiohttp.ClientSession() as session:
        while True:
            page_results, has_next = await fetch_page(session, role, page)
            if isinstance(page_results, dict) and "error" in page_results:
                return page_results
            
            results.extend(page_results)

            if not has_next:
                break

            page += 1

    return results

@app.route('/scrape', methods=['GET'])
async def scrape():
    role = request.args.get('role')
    if not role:
        return jsonify({"error": "Please provide a role to search for jobs."}), 400

    results = await scrape_wellfound(role)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)