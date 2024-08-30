from bs4 import BeautifulSoup
import requests
import csv
from selenium import webdriver
import time

for seasonYear in range(2013, 2024):
    endSeason = seasonYear - 2000 + 1
    seasonStatsUrl = f'https://fantasydata.com/nba/fantasy-basketball-leaders?scope=season&sp={seasonYear}-{endSeason}_REG&scoring=fpts&order_by=fpts'
    driver = webdriver.Chrome()

    driver.get(seasonStatsUrl)
    time.sleep(5)
    res = driver.execute_script("return document.documentElement.outerHTML")
    driver.quit()

    soup = BeautifulSoup(res, 'lxml')
    
    statsGrid = soup.find('table', class_="stats csv xls")
    
    stats = statsGrid.find_all('tr')
    
    # we want to skip stats[0] because it is the header row
    updatedStats = stats[1:]
    
    csv_file = open(
        f'./ml_server/datasets/seasonStats/seasonStats{seasonYear}-{endSeason}.csv', 'w')
    csvWriter = csv.writer(csv_file)
    csvWriter.writerow(['name', 'team', 'pos', 'gms', 'pts', 'reb', 'ast', 'blk', 'stl',
                        'fg%', 'ft%', '3p%', 'ftm', '2pm', '3pm', 'to', 'min', 'dd2', 'td3', 'fpts'])

    for stat in updatedStats:
        statsColumn = stat.find_all('td')
        name = statsColumn[1].text
        team = statsColumn[2].text
        pos = statsColumn[3].text
        gms = statsColumn[4].text
        pts = statsColumn[6].text
        reb = statsColumn[7].text
        ast = statsColumn[8].text
        blk = statsColumn[9].text
        stl = statsColumn[10].text
        fgperc = statsColumn[11].text
        ftperc = statsColumn[12].text
        threepperc = statsColumn[13].text
        ftm = statsColumn[14].text
        twopm = statsColumn[15].text
        threepm = statsColumn[16].text
        to = statsColumn[17].text
        min = statsColumn[5].text
        dd2 = statsColumn[18].text
        td3 = statsColumn[19].text
        fpts = statsColumn[20].text
        
        csvWriter.writerow([name, team, pos, gms, pts, reb, ast, blk, stl,
                            fgperc, ftperc, threepperc, ftm, twopm, threepm, to, min, dd2, td3, fpts])