import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Planes } from './Planes';

export const Search = () => {
  const [header, setHeader] = useState('What FSE plane do you want to find alternatives to alias?');

  const params = useParams();
  const searchType = params.type;

  useEffect(() => {
    if (searchType === 'sim') {
      setHeader('What plane on your sim do you want to find alternatives to alias?');
    }
  }, [searchType]);

  return (
    <Planes
      header={header}
      searchType={searchType}
    />
  );
};
