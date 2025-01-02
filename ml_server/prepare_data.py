import pandas as pd

def get_training_data():
    df = pd.read_csv('./ml_server/datasets/processed/games_2023_2024.csv')
    feature_cols = ['Team 1 Win %', 'Team 2 Win %']
    X = df[feature_cols]
    y = y = df['Team 1 Won']
    
    return {'X': X, 'y':  y}