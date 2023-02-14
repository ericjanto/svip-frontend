import requests
from bs4 import BeautifulSoup

# URL for the Harry Potter fandom on Archive of Our Own
url = 'https://archiveofourown.org/tags/Harry%20Potter%20-%20J*d*%20K*d*%20Rowling/works'

# Retrieve the page HTML using requests
page = requests.get(url).text

# Parse the page HTML using BeautifulSoup
soup = BeautifulSoup(page, 'html.parser')

# Find the second-to-last item in the list of pages in the navigation bar
num_pages = int(soup.find(class_='pagination').find_all('li')[-2].get_text())

# Iterate over each page of stories
for page_num in range(1, num_pages + 1):

    # Construct the URL for the page of stories
    page_url = url + '?page=' + str(page_num)

    # Retrieve the page HTML using requests
    page = requests.get(page_url).text

    # Parse the page HTML using BeautifulSoup
    soup = BeautifulSoup(page, 'html.parser')

    # Find the list of stories on the page
    story_list = soup.find(class_='work index group')

    # Iterate over each story in the list
    for story in story_list.find_all('li'):

        # Retrieve the story ID from the story link
        story_link = story.find(class_='heading').find('a')
        story_id = story_link['href'].split('/')[-1]

        # Retrieve the content of each chapter in the story
        content = ''
        for chapter_link in story.find_all(class_='chapter index group'):
            chapter_id = chapter_link['id'].split('_')[-1]
            chapter_url = 'https://archiveofourown.org' + chapter_link.find('a')['href']
            chapter_page = requests.get(chapter_url).text
            chapter_soup = BeautifulSoup(chapter_page, 'html.parser')
            chapter_content = chapter_soup.find(class_='userstuff')
            if chapter_content:
                content += chapter_content.get_text().strip() + '\n'

        # Retrieve the tags for the story
        tag_list = story.find(class_='tags commas').find_all('li')
        characters = []
        freeforms = []
        warnings = []
        relationships = []
        for tag in tag_list:
            tag_type = tag['class'][0]
            tag_text = tag.get_text().strip()
            if tag_type == 'character':
                characters.append(tag_text)
            elif tag_type == 'freeform':
                freeforms.append(tag_text)
            elif tag_type == 'warning':
                warnings.append(tag_text)
            elif tag_type == 'relationship':
                relationships.append(tag_text)

        # Print the results for the story
        print('Story ID:', story_id)
        print('Chapter IDs:', [c['id'].split('_')[-1] for c in story.find_all(class_='chapter index group')])
        print('Content:', content)
        print('Characters:', characters)
        print('Freeforms:', freeforms)
        print('Warnings:', warnings)
        print('Relationships:', relationships)
        print('===============================')

