import qs from 'qs';

const BASE_URL = process.env.NODE_ENV == 'production' ? 
                 'https://isitabanger.herokuapp.com/api' :
                 'http://localhost:5000/api'
console.log(BASE_URL);

async function search(q, limit, offset=0) {
  const queryString = qs.stringify({
    type: 'track',
    q,
    limit,
    offset
  });
  const result = await fetch(
      BASE_URL + "/search" + "?" + queryString, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Accept": "application/json"
          }
      }
  );
  const json = await result.json();
  return json.tracks.items;
};

const vote = async (id, banger) => {
  const queryString = qs.stringify({
    id: id,
    banger: banger
  });
  const result = await fetch(
      BASE_URL + "/vote" + "?" + queryString, {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Accept": "application/json"
          }
      }
  );
  return await result.json();
};

const getArtistInfo = async (id) => {
  const result = await fetch(
      BASE_URL + "/artists/" + id, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Accept": "application/json"
          }
      }
  );
  const json = await result.json();
  return json;
};

const classifyBanger = async (id) => {
  const result = await fetch(
      BASE_URL + "/predict/" + id, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Accept": "application/json"
          }
      }
  );
  const json = await result.json();
  return json;
};

export { getArtistInfo, search, vote, classifyBanger };