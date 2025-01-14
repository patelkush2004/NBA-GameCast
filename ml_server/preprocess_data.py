import csv
import pandas as pd
import random
from collections import defaultdict

# 1. Delete row if there is a null value

team_standings_file = 'teamStandings_2022_2023'
games_file = 'games_2023_2024'

team_standings_df = pd.read_csv(f'./ml_server/datasets/raw/teamStandings/{team_standings_file}.csv')
games_df = pd.read_csv(f'./ml_server/datasets/raw/games/{games_file}.csv')

missing_values = team_standings_df.isnull().sum().sum()

if missing_values > 0:
    raise TypeError(f'{missing_values} required cell(s) in Team Standings are Null or NaN')

missing_values = games_df.isnull().sum().max()
if missing_values > 0:
    num_of_rows = games_df.shape[0]
    games_df = games_df.dropna(how='any', axis=0)
    print(f'{num_of_rows - games_df.shape[0]} rows were dropped from Games due to NaN values.')
    
    
# 2. Create dictionary for 'Previous Win %'

previous_win_percent = {}

for row in team_standings_df.itertuples():
    previous_win_percent[row._1] = row.Wins / (row.Wins + row.Losses)
    
    
# 3. Calculate and add 'Home Win %', 'Visitor Win %', and 'Home Won' in Games

num_of_wins = {}
num_of_wins = defaultdict(lambda: 0, num_of_wins)
num_of_losses = {}
num_of_losses = defaultdict(lambda: 0, num_of_losses)

team1_win_perc_col = []
team2_win_perc_col = []
team1_won_col = []
processed_game_csv = open(f'./ml_server/datasets/processed/{games_file}.csv', 'w')
csv_writer = csv.writer(processed_game_csv)
csv_writer.writerow(['Team 1', 'Team 2', 'Team 1 Win %', 'Team 2 Win %', 'Team 1 At Home', 'Team 1 Won'])

for row in games_df.itertuples():
    rnd = random.randint(0, 1)
    
    if rnd == 0:
        team1_at_home = 0
        team1 = row.Visitor
        team1_pts = row._4
        team2 = row.Home
        team2_pts = row._2
    elif rnd == 1:
        team1_at_home = 1
        team1 = row.Home
        team1_pts = row._2
        team2 = row.Visitor
        team2_pts = row._4
        
    # 3.2
    if team1_pts > team2_pts:
        team1_won = 1
        num_of_wins[team1] = num_of_wins[team1] + 1
        num_of_losses[team2] = num_of_losses[team2] + 1
    else:
        team1_won = 0
        num_of_wins[team2] = num_of_wins[team2] + 1
        num_of_losses[team1] = num_of_losses[team1] + 1
        
    curr_team1_perc = num_of_wins[team1] / (num_of_wins[team1] + num_of_losses[team1])
    curr_team2_perc = num_of_wins[team2] / (num_of_wins[team2] + num_of_losses[team2])
    
    adjusted_team1_perc = (previous_win_percent[team1] + 2*curr_team1_perc)/3
    adjusted_team2_perc = (previous_win_percent[team2] + 2*curr_team2_perc)/3
    
    csv_writer.writerow([team1, team2, adjusted_team1_perc, adjusted_team2_perc, team1_at_home, team1_won])