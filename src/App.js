import React, { useState, useEffect } from 'react';
// import Search from './components/Search';
import { getWeather } from './services/weather';
import { getIpLocation } from './services/ipLocation';

const App = () => {
  const [coordonates, setCoordonates] = useState({ lat: null, lon: null });

  // useEffect(() => {
  //   (async () => {
  //     setCoordonates(await getIpLocation());
  //   })();
  // }, []);

  // console.log(coordonates);
  getWeather();
  return (
    <div>
      <h1>Weather</h1>
      {/* <Search /> */}
    </div>
  );
};

export default App;
