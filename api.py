import os
import json
import requests
from requests.compat import urljoin
from base64 import b64encode

TOKEN_URL = 'https://accounts.spotify.com/api/token'
BASE_URL = 'https://api.spotify.com/v1'

class SpotifyAPI:
    def __init__(self):
        self.auth = (os.environ['SPOTIFY_CLIENT_ID'],
                     os.environ['SPOTIFY_CLIENT_SECRET'])
        self.refresh_token()

    def refresh_token(self):
        self.token = requests.post(
            TOKEN_URL,
            auth=self.auth,
            data={'grant_type': 'client_credentials'}
        ).json()['access_token']

    def get(self, endpoint, id=None, params={}):
        url = '/'.join([BASE_URL, endpoint])
        if id:
            url = '/'.join([url, id])
        return requests.get(
            url,
            params=params,
            headers={
                'Authorization': 'Bearer {}'.format(self.token)
            })

api = SpotifyAPI()
