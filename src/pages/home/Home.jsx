import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  // eslint-disable-next-line
  // const { showPlanes, visible } = props;
  return (
    <>
      <div className='home-intro-text'>
        <h2>What are you looking to alias?</h2>
      </div>
      <main className='home'>
        <div className='home-fly-fse-plane'>
          <Link to='/fse'>
            <em>A plane on FSE</em>
            Find what planes on my sim I can alias it to
          </Link>
        </div>
        <div className='home-sim-plane'>
          <Link to='/sim'>
            <em>A plane on my sim</em>
            Find what plane on FSE I can alias it to
          </Link>
        </div>
      </main>
    </>
  );
};
