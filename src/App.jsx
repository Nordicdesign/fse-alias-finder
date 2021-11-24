import React, { useEffect } from 'react';
import data from './data/planes.json'
import './assets/styles/app.scss'

function App() {
    console.log(data.data);
    return (
        <div className="App">
        <header>
            <h1>FSE Alias Finder</h1>
        </header>
        <main>
            <h2>What aircraft do you want to fly?</h2>
            <div className="aircraft-finder">
                <form>
                    <label htmlFor="aircraft">
                        Choose a model
                    </label>
                    <select name="aircraft">
                        {
                            data.data.map(plane => {
                                return (
                                    <option value={plane.makeModel}>
                                        {plane.makeModel}
                                    </option>
                                )
                                
                            })
                        }
                    </select>
                </form>
            </div>
            <div id="aircraft-data">

            </div>
        </main>
    </div>
    )
}

export default App