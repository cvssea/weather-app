const url = 'http://ip-api.com/json/';

// returns coordonates based on ip location
export const getIpLocation = async () => {
  const response = await fetch(url);
  const { lat, lon } = await response.json();
  return { lat, lon };
};
