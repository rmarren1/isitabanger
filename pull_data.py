import json
import pandas as pd
from api import api
from pymongo import MongoClient

with open('secrets/dbconn.json', 'r') as f:
    conn = json.load(f)
    db = MongoClient(
        '{}:{}'.format(conn['url'], conn['port']),
        username=conn['username'],
        password=conn['password'],
        authSource=conn['database']
    ).banger

data = list(db.votes.find())
D = pd.DataFrame(data)
ids = D['songId'].tolist()
responses = [api.get(endpoint='audio-features', id=i) for i in ids]
R = pd.DataFrame([r.json() for r in responses])
S = R.merge(D, left_on='id', right_on='songId', how='outer')
S.to_csv('data.csv', index=False)

