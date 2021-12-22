import React, { useState } from 'react';
import { To, useNavigate } from "react-router-dom";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const Home = () => {
  const navigate = useNavigate();
  const findStuff = (where: To) => {
    navigate(where);
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
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
        <div className='what' onClick={openModal}>
          <p>What is this about? 🤷</p>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Example Modal"
      >
        <header>
          <h2>What is this about?</h2>
          <button onClick={closeModal}>Close</button>
        </header>

        <p>This is a tool for <a href='https://fseconomy.net/'>FSEconomy</a>, a multi-player "persistent world" add-on for flight simulators. The idea is to help pilots find planes with similar performances so they can alias them on their sim.</p>

        <hr/>

        <h3>Find alias to a FSE plane</h3>
        <p>Let's say you want to fly a Aeronca Champion, but your sim does not have that model. This option will help you find planes similar in performance, and hopefully you have one of them installed, so you can alias it to the Champion and fly your plane.</p>

        <h3>Find alias to a plane on your sim</h3>
        <p>On the flip side, maybe you love flying your Citation CJ4 on MSFS. Well turns out there are many planes on FSE with similar performance, so you could alias your CJ4 to a Citation II and save some money buying one!</p>

      </Modal>
    </>
  );
};
