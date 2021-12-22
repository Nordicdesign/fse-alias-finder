import React from 'react';
import './assets/styles/app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Search } from './pages/finder/Search';
import { Home } from './pages/home/Home';

function App () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:type' element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
