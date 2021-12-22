import React from 'react';
import { useParams } from 'react-router-dom';
import { Planes } from './Planes';

export const Search = () => {
  const params = useParams();
  const searchType = params.type;

  return (
    <Planes
      searchType={searchType}
    />
  );
};
