import pandas as pd
import pickle

df = pd.read_csv('./ml_server/datasets/processed/games_2023_2024.csv')

X_new = df[['Team 1 Win %', 'Team 2 Win %']]
y_new = df['Team 1 Won']
model = pickle.load(open('./ml_server/Prediction_Models/logistic_reg_model.sav', 'rb'))

print(model.score(X_new, y_new))