import React, { useState } from 'react';
import './assets/styles/app.scss';
import { Planes } from './components/Planes';
import { Home } from './components/Home';
import { Header } from './components/Header';

function App () {
  const [visiblePlanes, setVisiblePlanes] = useState(false);
  const [typeSearch, setTypeSearch] = useState('fse');
  const showPlanes = () => setVisiblePlanes(true);
  const hideSearch = () => setVisiblePlanes(false);
  return (
    <div className='App'>
      <Header
        hideSearch={hideSearch}
      />
      <Home
        showPlanes={showPlanes}
        visible={visiblePlanes}
      />
      <Planes
        visible={visiblePlanes}
        typeSearch={typeSearch}
        setTypeSearch={setTypeSearch}
      />
    </div>
  );
}

export default App;
