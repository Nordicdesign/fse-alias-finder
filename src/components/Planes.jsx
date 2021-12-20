import React, { useRef, useState, useEffect } from 'react';
import data from '../data/aircraft.json';
import { config } from '../config/config';
import { useParams } from 'react-router-dom';

export const Planes = (props) => {
  // eslint-disable-next-line react/prop-types
  // const { typeSearch, setTypeSearch } = props;
  const selectedAircraft = useRef(null);
  const [selectedPlane, setSelectedPlane] = useState(false);
  const [filteredPlanes, setFilteredPlanes] = useState();

  const params = useParams();
  console.log(params);
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

    // Remove itself
    let result = data.data.filter(plane => plane.makeModel !== selectedPlane);

    // similar cruise speed
    result = result.filter(plane => {
      const idealCruiseSpeed = selectedData[0].cruise;
      const maxCruise = idealCruiseSpeed + (idealCruiseSpeed * config.cruiseVariation) / 100;
      const minCruise = idealCruiseSpeed - (idealCruiseSpeed * config.cruiseVariation) / 100;

      return plane.cruise > minCruise && plane.cruise < maxCruise;
    });

    // similar GPH
    result = result.filter(plane => {
      const ideal = selectedData[0].gph;
      const max = ideal + (ideal * config.gphVariationMax) / 100;
      const min = ideal - (ideal * config.gphVariation) / 100;

      return plane.gph > min && plane.gph < max;
      // return plane.gph > min;
    });
    // save in state
    setFilteredPlanes(result);
  };

  const calcTotalFuel = plane => {
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
    <div className='planes'>
      <>
        <div className='aircraft-finder'>
          <h2>What FSE plane do you want to find alternatives to alias?</h2>
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
          <p><button onClick={() => setTypeSearch('sim')}>Search for possible aliases on my sim plane instead</button></p>
        </div>
        {filteredPlanes && (
          <>
            <h2>Possible candidates</h2>
            <p>Highly experimental! Don&apos;t be surprised if things are wrong, for any feedback find me on FSE&apos;s Discord (Nordic-FSE)</p>
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
                          <td>{plane.mtow}</td>
                          <td>{plane.cruise}</td>
                          <td>{plane.fuelType}</td>
                          <td>{totalFuel}</td>
                          <td>{plane.gph}</td>
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
      </>
    </div>
  );
};
