import React, { useRef, useState, useEffect } from 'react';
import data from '../../app/data/aircraft.json';
import { filterManualPlanes } from '../../app/utils/filterPlanes';
import { Plane, calcTotalFuel } from '../../app/utils/calculateTotalFuel';
import { planeDataType } from '../../types';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

interface PlanesProps {
  manualData: planeDataType,
  visible: boolean
}

export const PlanesManual = (props: PlanesProps) => {
  const { manualData, visible } = props;
  const [filteredPlanes, setFilteredPlanes] = useState<Plane[] | undefined>();

  useEffect(() => {
    setFilteredPlanes(filterManualPlanes({data, manualData}));
  }, [manualData]);

  // <div className={`planes ${selectedPlane ? 'visible' : ''}`}>

  return (
    <div className='finder-wrapper'>
      <div className='finder-search'>
      </div>
      <div className={`planes ${visible ? 'visible': ''}`}>
        <div>

          {filteredPlanes && (
            <>
              <h2>Possible candidates</h2>
              <table id='aircraft-data'>
                <thead>
                  <tr>
                    <th>Make &amp; model</th>
                    <th>Seats</th>
                    <th>MTOW</th>
                    <th>Cruise speed</th>
                    <th>Fuel type</th>
                    <th>Total fuel</th>
                    <th>GPH</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlanes.map((plane, key) => {
                    const totalFuel = calcTotalFuel(plane);
                    return (
                      <tr key={key}>
                        <td>{plane.makeModel}</td>
                        <td>{plane.seats}</td>
                        <td>{plane.mtow}</td>
                        <td>{plane.cruise}</td>
                        <td>{plane.fuelType}</td>
                        <td>{totalFuel}</td>
                        <td>{plane.gph}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className='finder-notes'>
          <p className='note'>Highly experimental! Don&apos;t be surprised if things are wrong, for any feedback find me on FSE&apos;s Discord (Nordic-FSE)</p>
          <h2>About fuel burn</h2>
          <p>FSEconomy will check that you use <em>around the same amount of fuel as your aliased model, or more</em>.</p>
          <p>If you burn more you'll always be fine, just try not to burn too little. </p>
          <p>Check the GPH of your aliased plane, if your model burns less, try to burn as much as possible to get close to it.</p>
          <p><a href="https://sites.google.com/site/fseoperationsguide/aircraft/fuel-usage-requirements">Fuel burn information on the FSE Manual</a></p>
        </div>
      </div>
    </div>
  );
};
