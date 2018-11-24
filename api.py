import os
import json
import requests
from requests.compat import urljoin
from base64 import b64encode

CREDS_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    'secrets/credentials.json'
)
TOKEN_URL = 'https://accounts.spotify.com/api/token'
BASE_URL = 'https://api.spotify.com/v1'

class SpotifyAPI:
    def __init__(self, creds_path=None):
        with open(creds_path, 'r') as f:
            self.auth_dict = json.load(f)
        self.auth = (self.auth_dict['client_id'], self.auth_dict['client_secret'])
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

api = SpotifyAPI(creds_path=CREDS_PATH)
