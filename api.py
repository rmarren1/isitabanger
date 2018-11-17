import os
import json
import requests
from functools import partialmethod
from requests.compat import urljoin
from base64 import b64encode

CREDS_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    'credentials.json'
)
TOKEN_URL = 'https://accounts.spotify.com/api/token'
BASE_URL = 'https://api.spotify.com/v1'

ENDPOINTS = [
    'audio-features',
    'audio-analysis',
    'search'
]

class SpotifyAPI:
    def __init__(self, creds_path=None):
        with open(creds_path, 'r') as f:
            self.auth_dict = json.load(f)
        self.auth = (self.auth_dict['client_id'], self.auth_dict['client_secret'])
        self.token = self.get_token()

    def get_token(self):
        return requests.post(
            TOKEN_URL,
            auth=self.auth,
            data={'grant_type': 'client_credentials'}
        ).json()['access_token']

    def get(self, *args, params={}, endpoint='' ):
        url = '/'.join([BASE_URL, endpoint] + list(args))
        return requests.get(
            url,
            params=params,
            headers={
                'Authorization': 'Bearer {}'.format(self.token)
            })

for e in ENDPOINTS:
    setattr(
        SpotifyAPI,
        e.replace('-', '_'),
        partialmethod(SpotifyAPI.get, endpoint=e)
    )

api = SpotifyAPI(creds_path=CREDS_PATH)
