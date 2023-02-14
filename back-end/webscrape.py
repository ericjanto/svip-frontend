import requests
from bs4 import BeautifulSoup

# Define the base URL of the Harry Potter fandom page on AO3
base_url = "https://archiveofourown.org/tags/Harry%20Potter%20-%20J*d*%20K*d*%20Rowling/works"

# Send a GET request to the base URL and parse the HTML content with Beautiful Soup
response = requests.get(base_url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find the total number of works in the Harry Potter fandom
total_works = int(soup.find('h2', class_='heading').find('a').get_text().replace(',', '').split()[-1])

# Find the number of pages from the navigation bar at the bottom of the page
navigation = soup.find('ol', class_='pagination actions')
if navigation is not None:
    pages = navigation.find_all('li')
    if len(pages) > 1:
        total_pages = int(pages[-2].get_text())
    else:
        total_pages = 1
else:
    total_pages = 1

# Loop through all the pages of works in the Harry Potter fandom on AO3
for page_num in range(1, total_pages + 1):
    # Construct the URL of the current page
    url = base_url + "?page=" + str(page_num)
    
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
