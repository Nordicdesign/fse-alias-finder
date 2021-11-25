import React, { useRef, useState } from 'react';
import data from './data/planes.json';

export const Planes = () => {
  const selectedAircraft = useRef(null);
  const [selectedPlane, setSelectedPlane] = useState(false);

  const showAllPlanes = () => {
    console.log(selectedAircraft.current.value);
    setSelectedPlane(selectedAircraft.current.value);
  };
  return (
    <>
      <div className="aircraft-finder">
        <form>
          <label htmlFor="aircraft">Choose a model</label>
          <select
            ref={selectedAircraft}
            name="aircraft"
            onChange={showAllPlanes}
          >
            {data.data.map((plane, key) => {
              return <option key={key} value={plane.makeModel}>{plane.makeModel}</option>;
            })}
          </select>
        </form>
      </div>
      {selectedPlane && (
        <table id="aircraft-data">
          <thead>
            <tr>
              <th>Make &amp; model</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((plane, key) => {
              console.log(plane);
              return (
                <tr key={key}>
                  <td>{plane.makeModel}</td>
                  <td>{plane.Seats}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
