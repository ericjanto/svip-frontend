import json
from time import sleep
from matplotlib.font_manager import json_dump
import requests
import datetime
from time import sleep
from bs4 import BeautifulSoup

NoneType = type(None)

# get yesterday's date
yesterday_fmt = datetime.date.today() - datetime.timedelta(days=1)

# format the date as a string in the format YYYY-MM-DD
yesterday = yesterday_fmt.strftime('%Y-%m-%d')

# URL for the Harry Potter fandom on Archive of Our Own
url = 'https://archiveofourown.org/works?work_search%5Bsort_column%5D=created_at&work_search%5Bother_tag_names%5D=&work_search%5Bexcluded_tag_names%5D=&work_search%5Bcrossover%5D=&work_search%5Bcomplete%5D=&work_search%5Bwords_from%5D=&work_search%5Bwords_to%5D=&work_search%5Bdate_from%5D='+yesterday+'&work_search%5Bdate_to%5D='+yesterday+'&work_search%5Bquery%5D=&work_search%5Blanguage_id%5D=&commit=Sort+and+Filter&tag_id=Harry+Potter+-+J*d*+K*d*+Rowling'

# Retrieve the page HTML using requests
page = requests.get(url).text

# Parse the page HTML using BeautifulSoup
soup = BeautifulSoup(page, 'html.parser')

# Find the second-to-last item in the list of pages in the navigation bar
num_pages = int(soup.find(class_='pagination actions').find_all('li')[-2].get_text())
print(num_pages)
# Dictionary to store the results for each unique story
results = {}

# Iterate over each page of stories
for page_num in range(1, 2):#num_pages + 1):

    #url reset
    url2 = 'https://archiveofourown.org/tags/Harry%20Potter%20-%20J*d*%20K*d*%20Rowling/works?commit=Sort+and+Filter&page='+ str(page_num) +'&work_search%5Bcomplete%5D=&work_search%5Bcrossover%5D=&work_search%5Bdate_from%5D='+yesterday+'2&work_search%5Bdate_to%5D='+yesterday+'&work_search%5Bexcluded_tag_names%5D=&work_search%5Blanguage_id%5D=&work_search%5Bother_tag_names%5D=&work_search%5Bquery%5D=&work_search%5Bsort_column%5D=created_at&work_search%5Bwords_from%5D=&work_search%5Bwords_to%5D='

    # Construct the URL for the page of stories
    page_url = url2

    # Retrieve the page HTML using requests
    page = requests.get(page_url).text

    # Parse the page HTML using BeautifulSoup - can replace the original soup now we have page numbers
    soup = BeautifulSoup(page, 'html.parser')

    # Find the list of stories on the page
    story_list = soup.find(class_='work index group')
    
    # print(story_list.find_all('li'))
    preamble = soup.find('pre')
    if preamble:
        text = preamble.text.strip() == 'Retry later'
        print('AO3 Failed to load page | ',text)
        sleep(300)
        page_num -= 1
        break

    metaData = {}
    results = {}

    if page_num%5 == 0:
        print("sleeping for 5 mins to avoid IP restrictions")
        sleep(300)

    # Iterate over each story in the list
    for story in story_list.find_all('li', {'role': 'article'}):
        
        # Retrieve the story ID from the story link
        story_link = story.find(class_='heading').find('a')
        story_id = story_link['href'].split('/')[-1]

        fullView = '?view_full_work=true'
        adultTrue = '?view_adult=true'

        storyURL = 'https://archiveofourown.org/works/'+ story_id + fullView

        badreadURL = 'https://archiveofourown.org/works/'+ story_id + adultTrue + fullView

        #print(storyURL)
        print("story", story_id)
        print("on page" ,page_num)
        
        storypage = requests.get(storyURL).text

        # Parse the page HTML using BeautifulSoup
        worksoup = BeautifulSoup(storypage, 'html.parser')

        #heading group with tags etc
        heading_group = worksoup.find('dl', class_='work meta group')

        # preface with title/author and notes
        preface_group = worksoup.find('div', class_='preface group')

        # find the main content section of the page
        main_content = worksoup.find('div', {"id": "chapters"})

        pre = soup.find('pre')
        if pre:
            text = pre.text.strip() == 'Retry later'
            print('AO3 Failed to load page | ',text)
            break

        if main_content is []:
            break

        try:
            # extract the summary of the story (if any)
            summary = preface_group.find('blockquote', class_='userstuff')
            if summary:
                print(summary.text.strip())
                summary = summary.text.strip()
            else:
                summary = ''
            # print(summary)

            # extract the title of the story
            title = preface_group.find('h2', class_='title heading').text.strip()

            # extract the author of the story
            author = preface_group.find('a', rel='author')
            if author:
                author = author.text.strip()
            else:
                author = preface_group.find('h3', class_='byline heading').text.strip()

        except Exception as prefaceError:
            print(prefaceError)
            summary = ''
            author = 'Anonymus'
            title = 'Undefined'

        try:
            # extract the rating tags of the story (if any)
            ratingsec = heading_group.find('dd', class_='rating tags')
            if ratingsec:
                ratingTags = [tag.text.strip() for tag in ratingsec.find_all('li')]
            else:
                ratingTags = []

            # extract the warning tags of the story (if any)
            warningsec = heading_group.find('dd', class_='warning tags')
            if warningsec:
                warningTags = [tag.text.strip() for tag in warningsec.find_all('li')]
            else:
                warningTags = []

            # extract the category tags of the story (if any)
            catagorysec = heading_group.find('dd', class_='category tags')
            if catagorysec:
                categoryTags = [tag.text.strip() for tag in catagorysec.find_all('li')]
            else:
                categoryTags = []

            # extract the fandom of the story(if one)
            fandomsec = heading_group.find('dd', class_='fandom tags')
            if fandomsec:
                fandomTags = [tag.text.strip() for tag in fandomsec.find_all('li')]
            else:
                fandomTags = []

            # extract the relationships of the story (if any)
            relsec = heading_group.find('dd', class_='relationship tags')
            if relsec:
                relationshipTags = [tag.text.strip() for tag in relsec.find_all('li')]
            else:
                relationshipTags = []

            # extract the characters of the story (if any)
            charsec = heading_group.find('dd', class_='character tags')
            if charsec:
                characterTags = [tag.text.strip() for tag in charsec.find_all('li')]
            else:
                characterTags = []

            # extract the freeform tags of the story (if any)
            freesec = heading_group.find('dd', class_='freeform tags')
            if freesec:
                freeformTags = [tag.text.strip() for tag in freesec.find_all('li')]
            else:
                freeformTags = []


            # extract the language of the story (if one)
            language_section = heading_group.find('dd', class_='language')
            if language_section:
                language = language_section.text.strip()
            else:
                language = ''

            # extract the stats of the story
            stats_section = heading_group.find('dl', class_='stats')
            stats = {}

            stat_value = [stat.text.strip() for stat in stats_section.find_all('dd')]
            stat_label = [statName.text.strip() for statName in stats_section.find_all('dt')]
            
            stats = list(zip(stat_label, stat_value))
            # print(stats)

        except Exception as headingGError:
            print(headingGError)
            warningTags = []
            categoryTags = []
            fandomTags = []
            relationshipTags = []
            characterTags = []
            freeformTags = []
            language = []
            stats = []

        #=============================================== skip notes
        # extract the notes section of the story (if any)
        # notes_section = main_content.find('div', class_='notes')
        # if notes_section:
        #     notes = notes_section.text.strip()
        # else:
        #     notes = ''
        #===========================================================


        metaDataKey = story_id
        meta = {'summary':summary,
                'warnings':warningTags,
                'categories':categoryTags,
                'fandom': fandomTags,
                'relationships':relationshipTags,
                'characters':characterTags,
                'freefrom': freeformTags,
                'language': language,
                'stats':stats
            }
        metaData.update({story_id:meta})
        # print(metaData[story_id])

        chNames = []
        chContents = []

        # look for chapters in the main body
        ch_list = main_content.find_all('div', class_='chapter')
        chapSingle = main_content.find('div', class_='userstuff')

        if ch_list:
            # print("ChGroup", ch_list)
        
            print('chaptergroup', len(ch_list))
            for i, chapterNum in enumerate(ch_list):

                name_div = chapterNum.find('div', class_='chapter preface group')
                
                if not isinstance(name_div, NoneType):
                    chNames.append(name_div.text.strip())
                else:
                    chNames.append('')
                # print("got chapter name")

                content = chapterNum.find('div', class_='userstuff module')
                # print("got chapter content")

                # print("content: ",content.find_all('p'))

                if isinstance(content, NoneType):
                    chContents = ''
    
                elif content:
                    # print("list comp paras")
                    chContents = [para.text.strip() for para in content.find_all('p')]
                else:
                    chContents = ''
                
                # Store the results for the story in the dictionary
                chapterID = int(story_id) * 1000 + i - 1
                results.update({chapterID: chContents})

        elif chapSingle:
            # print("single Section Text")
            chapterID = int(story_id) * 1000
            results.update({chapterID: chapSingle.text.strip()})

        else:
            print('No Text')
            chapterID = int(story_id) * 1000
            results.update({chapterID: ''})

        print("sleep 1 sec -> next post")
        sleep(1)

# print(results)

with open('./chapters'+yesterday+'.json', 'w', encoding='utf8') as f1:
    json.dump(results, f1, ensure_ascii=False)

with open('./metaData'+yesterday+'.json', 'w', encoding='utf8') as f2:
    json.dump(metaData, f2, ensure_ascii=False)
