import React, { useEffect } from 'react';
import { getGeoLocation } from '../services/geoLocation';

const Search = () => {
  useEffect(() => {
    const geo = async () => {
      await getGeoLocation('bucharest');
    };
    geo();
  });

  return <h2>Search</h2>;
};

export default Search;
