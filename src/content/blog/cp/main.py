import os
import sys
import cloudscraper
from bs4 import BeautifulSoup
from datetime import datetime
import re

def extract_codeforces_problem_details(problem_url):
    scraper = cloudscraper.create_scraper()

    response = scraper.get(problem_url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch problem page, status code: {response.status_code}")

    # Parse the page content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract the problem title
    title_tag = soup.find('div', class_='title')
    title = title_tag.text.strip() if title_tag else "Unknown Title"

    # Extract problem rating
    rating_tag = soup.find('span', class_='tag-box', title='Difficulty')
    problem_rating = rating_tag.text.strip().replace('*', '') if rating_tag else "Unrated"

    # Extract contest ID using regex
    contest_id_match = re.search(r'/contest/(\d+)/|/problemset/problem/(\d+)/', problem_url)
    contest_id = contest_id_match.group(1) if contest_id_match and contest_id_match.group(1) else contest_id_match.group(2) if contest_id_match else "Unknown Contest ID"

    # Extract problem code from URL (A, B, etc.)
    problem_code = problem_url.split('/')[-1]

    # Extract round number using rtable
    rtable_tag = soup.find('table', class_='rtable')
    if rtable_tag:
        round_link_tag = rtable_tag.find('a')
        round_number = round_link_tag.text.strip() if round_link_tag else "Unknown Round"
    else:
        round_number = "Unknown Round"

    return title, problem_rating, round_number, problem_code, contest_id


def generate_template(author, problem_url):
    # Extract problem details
    title, problem_rating, round_number, problem_code, contest_id = extract_codeforces_problem_details(problem_url)

    # Generate today's date
    pub_datetime = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

    # Generate slug (remove periods and extra spaces)
    slug = f"{contest_id}-{title.replace(' ', '-').replace('.', '')}"

    # Format description
    description = f"{title}, {problem_rating} RATED - {round_number}"

    # Create markdown template
    template = f"""---
author: {author}
pubDatetime: {pub_datetime}
title: '{title} (CF{contest_id} {problem_rating} RATED)'
slug: {slug}
tags: [CPP, Codeforces, CF{problem_rating}]
description: '{description}'
---

<p class="hidden">Problem {problem_code} {contest_id}</p>

Problem Link: [{description}]({problem_url})

## Approach


## Code Implementation
```c++

```
"""
    return template

def save_to_file(contest_id, problem_code, markdown_content):
    # Create directory with contest ID
    directory = f"./{contest_id}"
    os.makedirs(directory, exist_ok=True)

    # Create markdown file with problem code (e.g., A.md, B.md)
    filepath = os.path.join(directory, f"{problem_code}.md")
    with open(filepath, 'w') as f:
        f.write(markdown_content)

if __name__ == '__main__':
    # Ensure a link is provided as a command-line argument
    if len(sys.argv) < 2:
        print("Usage: python main.py <codeforces_problem_url>")
        sys.exit(1)

    problem_url = sys.argv[1]
    author = "Shravan Goswami"

    # Generate markdown content
    markdown_template = generate_template(author, problem_url)

    # Extract problem details to get contest ID and problem code
    _, _, _, problem_code, contest_id = extract_codeforces_problem_details(problem_url)

    # Save the markdown content to a file
    save_to_file(contest_id, problem_code, markdown_template)

    print(f"Markdown file created: {contest_id}/{problem_code}.md")
