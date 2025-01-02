# https://www.basketball-reference.com/leagues/NBA_2019_games-october.html

from bs4 import BeautifulSoup
import requests
import csv
from selenium import webdriver
import time
import pandas as pd

def scrape_games(season_years, months):
    for seasonYear in season_years:
        csvFile = open(
            f'./ml_server/datasets/raw/games/games_{seasonYear}_{seasonYear+1}.csv', 'w')
        csvWriter = csv.writer(csvFile)
        csvWriter.writerow(['Home', 'Home Points', 'Visitor', 'Visitor Points', ])
        
        for month in months:
            url = f'https://www.basketball-reference.com/leagues/NBA_{seasonYear}_games-{month}.html'

            driver = webdriver.Chrome()
            driver.get(url)
            time.sleep(5)
            res = driver.execute_script(
                "return document.documentElement.outerHTML")
            driver.quit()
            
            soup = BeautifulSoup(res, 'lxml')

            table = soup.find('div', id='div_schedule').table.tbody

            rows = table.find_all('tr')
            
            
            for row in rows:

                try:
                    tds = row.find_all('td')
                    visitorName = tds[1].a.text
                    visitorPts = tds[2].text
                    homeName = tds[3].a.text
                    homePts = tds[4].text

                except Exception as e:
                    continue

                csvWriter.writerow([homeName, homePts, visitorName,visitorPts])
    