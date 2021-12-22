import React, { useEffect } from 'react';
import { To, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  // const addBodyClass = (className: string) => document.body.classList.add(className);
  // const removeBodyClass = (className: string) => document.body.classList.remove(className);

  const findStuff = (where: To) => {
    // removeBodyClass('homepage');
    navigate(where);
  };

  // useEffect(() => {
  //   addBodyClass('homepage');
  // }, []);

  return (
    <div className='home-container'>
      <h2 className='home-intro-text'>What are you looking to alias?</h2>

      <main className='home'>
        <div className='home-fly-fse-plane' onClick={() => findStuff('/fse')}>
          <em>A plane on FSE</em>
          Find what planes on my sim I can alias it to
        </div>
        <div className='home-sim-plane' onClick={() => findStuff('/sim')}>
          <em>A plane on my sim</em>
          Find what plane on FSE I can alias it to
        </div>
      </main>
    </div>
  );
};
