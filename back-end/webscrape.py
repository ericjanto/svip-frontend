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

# Loop through each story link and retrieve the content, story ID, chapter IDs, and tags
for link in story_links:
    # Get the story ID from the URL
    story_id = link.get('href').split('/')[-1]
    
    # Send a GET request to the story page
    story_response = requests.get(link.get('href'))
    story_soup = BeautifulSoup(story_response.content, 'html.parser')
    
    # Find the content of the story
    story_content = story_soup.find('div', class_='userstuff').get_text()
    
    # Find the chapter IDs of the story
    chapter_links = story_soup.find_all('li', class_='chapter')
    chapter_ids = [link.find('a').get('href').split('/')[-1] for link in chapter_links]
    
    # Find the tags of the story
    tag_links = story_soup.find_all('li', class_='tag')
    tags = [link.find('a').get_text() for link in tag_links]
    
    # Print the story ID, chapter IDs, content, and tags
    print("Story ID:", story_id)
    print("Chapter IDs:", chapter_ids)
    print("Content:", story_content)
    print("Tags:", tags)

