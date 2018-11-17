import pandas as pd
from api import api

search_query = 'edm electronic dance'
num = 200
step = 50
data = []
for i in range(num // step):
    res = api.search({
        'q': search_query,
        'limit': step,
        'offset': i * step,
        'type': ['track']
    })
    tracks = res.json()['tracks']['items']
    data.extend([{
        'id': track['id'],
        'sample': track['preview_url']
    } for track in tracks])
pd.DataFrame(data).to_csv('data.csv')