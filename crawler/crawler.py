import json
import string
import time
import datetime
import requests
from bs4 import BeautifulSoup

today = datetime.datetime.today()
limit = datetime.date(2014, 4, 25)

dates = []

# dirty berto is dirty
while True:
    dates.append(today.strftime('%Y%m%d'))
    today = today - datetime.timedelta(days=1)
    if today.date() == limit:
        break

domain_url = 'http://www.dailymail.co.uk'
base_url = domain_url + '/home/sitemaparchive/day_{0}.html'
headlines = []

for date in dates:
    url = base_url.format(date)
    print 'Parsing url ...', url
    r = requests.get(url)
    soup = BeautifulSoup(r.text)

    for link in soup.select('.archive-articles li a'):
        clean_headline = [word.strip(string.punctuation) for word in link.text.split(' ')]
        headlines.append(' '.join(clean_headline))

    print 'Done'
    time.sleep(1)

with open('../data/headlines.json', 'w') as outfile:
    json.dump(headlines, outfile)
