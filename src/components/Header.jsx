import React from 'react';

export const Header = (props) => {
  // eslint-disable-next-line react/prop-types
  const { hideSearch } = props;
  return (
    <header>
      <h1 onClick={hideSearch}>
        <em>FSE</em> Alias Finder <sup>Alpha</sup>
      </h1>
      <p>Data last updated: 25/11/2021</p>
    </header>
  );
};
