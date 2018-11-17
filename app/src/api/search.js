import qs from 'qs';


const BASE_URL = 'http://localhost:5000';

const search = async (q, limit) => {
  const queryString = qs.stringify({
    type: 'track',
    q,
    limit,
  });
  const res = await fetch(
      BASE_URL + "/search" + "?" + queryString, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Accept": "application/json"
          }
      }
  );
  const data = await res.json();
  return data.tracks.items;
};

export default search;