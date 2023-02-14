import requests
from bs4 import BeautifulSoup

# Define the URL of the Harry Potter fandom page on AO3
url = "https://archiveofourown.org/tags/Harry%20Potter%20-%20J*d*%20K*d*%20Rowling/works"

# Send a GET request to the URL
response = requests.get(url)

# Parse the HTML content of the page with Beautiful Soup
soup = BeautifulSoup(response.content, 'html.parser')

# Find all the story links on the page
story_links = soup.find_all('a', class_='work')

# Print the titles of each story
for link in story_links:
    print(link.text)
