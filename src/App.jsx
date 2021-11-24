import React from 'react';
import './assets/styles/app.scss'
import { Planes } from './Planes';

function App() {
    return (
        <div className="App">
        <header>
            <h1>FSE Alias Finder</h1>
        </header>
        <main>
            <h2>What aircraft do you want to fly?</h2>
            <Planes />            
        </main>
    </div>
    )
}

export default App