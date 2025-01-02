from webScrapers import games, teamStandings

season_years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]

months = ['october', 'november', 'december', 'january', 'february', 'march', 'april', 'may', 'june']

games.scrape_games(season_years, months)
teamStandings.scrape_team_standings(season_years)