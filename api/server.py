from flask import Flask, Response, request
from api import api

app = Flask(__name__)


@app.route('/<endpoint>')
@app.route('/<endpoint>/<id>')
def proxy(**kwargs):
    r = api.get(
        kwargs['endpoint'],
        kwargs.get('id', None),
        request.args
    )
    excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in r.raw.headers.items()
               if name.lower() not in excluded_headers]
    if r.ok:
        return Response(r.content, r.status_code, headers)
    else:
        raise Exception(r.text)

if __name__ == '__main__':
    app.run(debug=True, port=5000)