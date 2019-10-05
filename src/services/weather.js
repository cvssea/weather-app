const key = 'a7018e2d6fa3ab96af1ddb581ba78af8';
const proxy = process.env.CORS_PROXY;
const baseUrl = 'https://api.darksky.net/forecast';

console.log('proxy', proxy);

export const getWeather = async (lat = 37.8267, lon = -122.4233) => {
  // construct URL
  const url = new URL(`${proxy && proxy}${baseUrl}/${key}/${lat},${lon}`);
  const params = {
    units: 'si',
    lang: 'ro',
  };
  url.search = new URLSearchParams(params);

  // fetch
  const response = await fetch(url);
  const weather = await response.json();
  console.log(weather);
};
