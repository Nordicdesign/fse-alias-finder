import React from 'react';
import './assets/styles/app.scss';
import { Planes } from './Planes';
import { Header } from './components/Header';

function App () {
  return (
    <div className="App">
      <Header />
      <main>
        <h2>Which aircraft do you want to fly?</h2>
        <Planes />
      </main>
    </div>
  );
}

export default App;
