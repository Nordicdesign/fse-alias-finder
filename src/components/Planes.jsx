import React, { useRef, useState, useEffect } from 'react';
import data from '../data/aircraft.json';

export const Planes = () => {
  const selectedAircraft = useRef(null);
  const [selectedPlane, setSelectedPlane] = useState(false);
  const [filteredPlanes, setFilteredPlanes] = useState();

  // const filterType = (data,type, variation) => {
  //   const ideal = data[0][type];
  //   const max = ideal + (ideal * variation) / 100;
  //   const min = ideal - (ideal * variation) / 100;

  //   return plane.gph > min && plane.gph < max;
  // };

  const filterPlanes = () => {
    const selectedData = data.data.filter(
      plane => plane.makeModel === selectedPlane
    );
    // console.log('selected', selectedData);
    // same fuel type - Probably not needed
    // let result = data.data.filter(
    //   plane => plane.fuelType === selectedData[0].fuelType
    // );
    // similar cruise speed
    // result = result.filter(plane => {
    let result = data.data.filter(plane => {
      const variation = 30; // percentage up and down we allow
      const idealCruiseSpeed = selectedData[0].cruise;
      const maxCruise = idealCruiseSpeed + (idealCruiseSpeed * variation) / 100;
      const minCruise = idealCruiseSpeed - (idealCruiseSpeed * variation) / 100;

      return plane.cruise > minCruise && plane.cruise < maxCruise;
    });

    // similar GPH
    result = result.filter(plane => {
      const variation = 30; // percentage up and down we allow
      const ideal = selectedData[0].gph;
      const max = ideal + (ideal * 5) / 100;
      const min = ideal - (ideal * variation) / 100;

      return plane.gph > min && plane.gph < max;
    });
    // save in state
    setFilteredPlanes(result);
  };

  const calcTotalFuel = plane => {
    // "ext1": 0,
    // "leftTip": 0,
    // "leftAux": 0,
    // "leftMain": 16,
    // "center": 0,
    // "center2": 0,
    // "center3": 0,
    // "rightMain": 16,
    // "rightAux": 0,
    // "rightTip": 0,
    // "ext2": 0,

    return (
      plane.ext1 +
      plane.leftTip +
      plane.leftAux +
      plane.leftMain +
      plane.center +
      plane.center2 +
      plane.center3 +
      plane.rightMain +
      plane.rightAux +
      plane.rightTip +
      plane.ext2
    );
  };

  const showAllPlanes = () => {
    const selected = selectedAircraft.current.value;
    setSelectedPlane(selected);
  };

  useEffect(() => {
    selectedPlane && filterPlanes();
  }, [selectedPlane]);

  return (
    <>
      <div className='aircraft-finder'>
        <form>
          <label htmlFor='aircraft'>Model</label>
          <select
            ref={selectedAircraft}
            name='aircraft'
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
        <table id='aircraft-data'>
          <thead>
            <tr>
              <th>Make &amp; model</th>
              <th>Seats</th>
              <th>Cruise speed</th>
              <th>Fuel type</th>
              <th>Total fuel</th>
              <th>GPH</th>
              <th>MTOW</th>
            </tr>
          </thead>
          <tbody>
            {data.data
              .filter(plane => plane.makeModel === selectedPlane)
              .map((plane, key) => {
                // console.log(plane);
                const totalFuel = calcTotalFuel(plane);

                return (
                  <>
                    <tr key='selected'>
                      <td colSpan='7' className='separator'>
                        Selected
                      </td>
                    </tr>
                    <tr key={key + 'asdf'}>
                      <td>{plane.makeModel}</td>
                      <td>{plane.seats}</td>
                      <td>{plane.cruise}</td>
                      <td>{plane.fuelType}</td>
                      <td>{totalFuel}</td>
                      <td>{plane.gph}</td>
                      <td>{plane.mtow}</td>
                    </tr>
                    <tr key='selected'>
                      <td colSpan='7' className='separator'>
                        Possible matches
                      </td>
                    </tr>
                  </>
                );
              })}

            {filteredPlanes.map((plane, key) => {
              const totalFuel = calcTotalFuel(plane);
              return (
                <tr key={key}>
                  <td>{plane.makeModel}</td>
                  <td>{plane.seats}</td>
                  <td>{plane.cruise}</td>
                  <td>{plane.fuelType}</td>
                  <td>{totalFuel}</td>
                  <td>{plane.gph}</td>
                  <td>{plane.mtow}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
