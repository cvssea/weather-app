const key = '77c6da5e-990d-486a-bfc7-21e1778c1895';
const url = new URL('https://graphhopper.com/api/1/geocode');

// returns coordonates based on query
export const getGeoLocation = async query => {
  // construct URL
  const params = {
    key,
    q: query,
    limit: 1,
  };
  url.search = new URLSearchParams(params);

  // fetch
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { lat, lng } = data.hits[0].point;
    return { lat, lng };
  } catch (e) {
    console.log(e);
  }
};
