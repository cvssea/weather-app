const key = 'a7018e2d6fa3ab96af1ddb581ba78af8';
const proxy = process.env.CORS_PROXY || null;
const baseUrl = 'https://api.darksky.net/forecast';

export const getWeather = async (lat, lon) => {
  // construct URL
  const url = new URL(`${proxy && proxy}${baseUrl}/${key}/${lat},${lon}`);
  const params = {
    units: 'si',
    lang: 'ro',
  };
  url.search = new URLSearchParams(params);

  // fetch
  try {
    const response = await fetch(url);
    const weather = await response.json();
    return weather;
  } catch (e) {
    console.log(e);
  }
};
