import qs from 'qs';

const BASE_URL = 'http://localhost:5000';

const search = async (q, limit) => {
  const queryString = qs.stringify({
    type: 'track',
    q,
    limit,
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

export { getArtistInfo, search };