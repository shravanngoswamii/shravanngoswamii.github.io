import os
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

def extract_approach_and_code(text_block):
    """
    Extract the approach and C++ code from the formatted block.
    """
    # Extract the URL and Approach from the comment block
    url_match = re.search(r"url:\s*(https://[^\s]+)", text_block)
    approach_match = re.search(r"Approach:\n((?:.|\n)*?)\*/", text_block)

    problem_url = url_match.group(1) if url_match else "No URL"
    approach = approach_match.group(1).strip() if approach_match else "No Approach"

    # Remove the comment block (/* ... */) from the C++ code
    cpp_code_cleaned = re.sub(r"/\*[\s\S]*?\*/", '', text_block).strip()

    return problem_url, approach, cpp_code_cleaned

def generate_template(author, problem_url, approach, cpp_code):
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
{approach}

## Code Implementation

```cpp
{cpp_code}
```
"""
    return template

def save_to_file(contest_id, problem_code, markdown_content):
    # Create directory with contest ID
    directory = f"./{contest_id}"
    os.makedirs(directory, exist_ok=True)

    # Create markdown file with problem code (e.g., A.md, B.md)
    filepath = os.path.join(directory, f"{problem_code}.md")

    # Check if file already exists
    if os.path.exists(filepath):
        print(f"File already exists: {filepath}. Skipping generation.")
        return

    with open(filepath, 'w') as f:
        f.write(markdown_content)

    print(f"Markdown file created: {filepath}")

def process_cpp_files_in_folder(folder_path):
    """
    Process all C++ files in the specified folder.
    """
    cpp_files = [f for f in os.listdir(folder_path) if f.endswith('.cpp')]

    for cpp_file in cpp_files:
        cpp_file_path = os.path.join(folder_path, cpp_file)

        with open(cpp_file_path, 'r') as f:
            text_block = f.read()

        # Extract approach and code
        problem_url_extracted, approach, cpp_code = extract_approach_and_code(text_block)

        if problem_url_extracted == "No URL":
            print(f"Skipping {cpp_file}: No URL found.")
            continue

        # Generate markdown content
        author = "Shravan Goswami"
        markdown_template = generate_template(author, problem_url_extracted, approach, cpp_code)

        # Extract problem details to get contest ID and problem code
        _, _, _, problem_code, contest_id = extract_codeforces_problem_details(problem_url_extracted)

        # Save the markdown content to a file
        save_to_file(contest_id, problem_code, markdown_template)

if __name__ == '__main__':
    # Hardcoded folder path
    folder_path = "/mnt/d/College-Work/CP/Competitive-Programming/Online Judges/Codeforces/2. PROBLEMSET"

    # Process all C++ files in the specified folder
    process_cpp_files_in_folder(folder_path)