import json
import datetime
import pickle as pkl
from flask import Flask, Response, request
from pymongo import MongoClient
from api import api

FEATURE_COLUMNS = sorted(list([
    'acousticness', 'danceability', 'energy', 'instrumentalness',
    'key', 'liveness', 'speechiness', 'loudness', 'tempo', 'valence'
]))

HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': True,
    'Access-Control-Allow-Headers': 'Accept, Authorization, Origin, Content-Type, Retry-After',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH'
}

with open('model/model.pkl', 'rb') as f:
    model = pkl.load(f)


app = Flask(__name__)
with open('secrets/dbconn.json', 'r') as f:
    conn = json.load(f)
    db = MongoClient(
        '{}:{}'.format(conn['url'], conn['port']),
        username=conn['username'],
        password=conn['password'],
        authSource=conn['database']
    ).banger

@app.route('/<endpoint>')
@app.route('/<endpoint>/<id>')
def proxy(**kwargs):
    def _get():
        return api.get(
            kwargs['endpoint'],
            kwargs.get('id', None),
            request.args
        )
    r = _get()
    excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in r.raw.headers.items()
               if name.lower() not in excluded_headers]
    if r.ok:
        return Response(r.content, r.status_code, headers)
    # The token needs to be refreshed.
    elif r.status_code == 401:
        api.refresh_token()
        r = _get()
        if r.ok:
            return Response(r.content, r.status_code, headers)
    raise Exception(r.text)

@app.route('/vote', methods=['POST'])
def vote():
    receipt = db.votes.insert_one({
        'songId': request.args.get('id'),
        'bangerVote': request.args.get('banger'),
        'voteTime': datetime.datetime.now()
    }).inserted_id
    return Response(
        json.dumps({
            'success': True,
            'receipt': str(receipt)
        }),
        200,
        HEADERS
    )

@app.route('/predict/<id>')
def prediction(id):
    data = api.get('audio-features', id)
    if data.ok:
        data = data.json()
        x = [data[f] for f in FEATURE_COLUMNS]
        y = model.predict([x])
        print(y)
        return Response(json.dumps({'prediction': bool(y[0]),}), 200, HEADERS)
    raise Exception(data.text)

if __name__ == '__main__':
    app.run(debug=True, port=5000)