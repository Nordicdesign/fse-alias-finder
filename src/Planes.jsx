import React, { useRef, useState, useEffect } from 'react';
import data from './data/planes.json';

export const Planes = () => {
  const selectedAircraft = useRef(null);
  const [selectedPlane, setSelectedPlane] = useState(false);
  const [filteredPlanes, setFilteredPlanes] = useState();

  // const highlightSelectedPlace = selected => {
  //   const result = data.data.filter(plane => plane.makeModel === selected);
  // };

  const filterPlanes = async () => {
    const selectedData = data.data.filter(plane => plane.makeModel === selectedPlane);
    console.log('selected', selectedData);
    // same fuel type
    let result = data.data.filter(plane => plane.fuelType === selectedData[0].fuelType);
    // similar cruise speed
    result = result.filter(plane => {
      const variation = 60; // percentage up and down we allow
      const idealCruiseSpeed = selectedData[0].cruise;
      const maxCruise = idealCruiseSpeed + (idealCruiseSpeed * variation / 100);
      const minCruise = idealCruiseSpeed - (idealCruiseSpeed * variation / 100);

      return plane.cruise > minCruise && plane.cruise < maxCruise;
    });

    // similar GPH
    result = result.filter(plane => {
      const variation = 30; // percentage up and down we allow
      const ideal = selectedData[0].gph;
      const max = ideal + (ideal * variation / 100);
      const min = ideal - (ideal * variation / 100);

      return plane.gph > min && plane.gph < max;
    });
    // save in state
    setFilteredPlanes(result);
  };

  const showAllPlanes = () => {
    const selected = selectedAircraft.current.value;
    setSelectedPlane(selected);
  };

  useEffect(() => {
    filterPlanes();
  }, [selectedPlane]);
  return (
    <>
      <div className="aircraft-finder">
        <form>
          <label htmlFor="aircraft">Model</label>
          <select
            ref={selectedAircraft}
            name="aircraft"
            onChange={showAllPlanes}
          >
            <option value=''>Please select</option>
            {data.data.map((plane, key) => {
              return (
                <option key={key} value={plane.makeModel}>
                  {plane.makeModel}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      {filteredPlanes && (
        <table id="aircraft-data">
          <thead>
            <tr>
              <th>Make &amp; model</th>
              <th>Seats</th>
              <th>Cruise Speed</th>
              <th>Fuel Type</th>
              <th>GPH</th>
            </tr>
          </thead>
          <tbody>
            {data.data.filter(plane => plane.makeModel === selectedPlane).map((plane, key) => {
              console.log(plane);
              return (
                <>
                  <tr key="selected">
                    <td colSpan="5" className="separator">Selected</td>
                  </tr>
                  <tr key={key + 'asdf'}>
                    <td>{plane.makeModel}</td>
                    <td>{plane.seats}</td>
                    <td>{plane.cruise}</td>
                    <td>{plane.fuelType}</td>
                    <td>{plane.gph}</td>
                  </tr>
                  <tr key="selected">
                    <td colSpan="5" className="separator">Possible matches</td>
                  </tr>
                </>
              );
            })}

            {filteredPlanes.map((plane, key) => {
              // console.log(plane);
              return (
                <tr key={key}>
                  <td>{plane.makeModel}</td>
                  <td>{plane.seats}</td>
                  <td>{plane.cruise}</td>
                  <td>{plane.fuelType}</td>
                  <td>{plane.gph}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
