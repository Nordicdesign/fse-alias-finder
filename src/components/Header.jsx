import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <h1>
        <Link to='/'>
          <em>FSE</em> Alias Finder <sup>Alpha</sup>
        </Link>
      </h1>
      <p>Data last updated: 25/11/2021</p>
    </header>
  );
};
