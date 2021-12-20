import React from 'react';
import './assets/styles/app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { Home } from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:type/:plane' element={<Search />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
