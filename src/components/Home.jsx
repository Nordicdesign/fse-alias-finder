import React from 'react';

export const Home = (props) => {
  // eslint-disable-next-line react/prop-types
  const { showPlanes, visible } = props;
  return (
    <>
      <div className='home-intro-text'>
        <h2>What are you looking to alias?</h2>
      </div>
      <main className={`home ${visible ? 'home-hidden' : ''}`}>
        <div className='home-fly-fse-plane'>
          <button onClick={showPlanes}>
            <em>A plane on FSE</em>
            Find what planes on my sim I can alias it to
          </button>
        </div>
        <div className='home-sim-plane'>
          <button onClick={showPlanes}>
            <em>A plane on my sim</em>
            Find what plane on FSE I can alias it to
          </button>
        </div>
      </main>
    </>
  );
};
