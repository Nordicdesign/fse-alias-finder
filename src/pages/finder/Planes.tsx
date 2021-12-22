import React, { useRef, useState, useEffect } from 'react';
import data from '../../app/data/aircraft.json';
import { filterFSEPlanes, filterSimPlane } from '../../app/utils/filterPlanes';
import { Plane, calcTotalFuel } from '../../app/utils/calculateTotalFuel';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

interface PlanesProps {
  header: string;
  searchType: string;
}

export const Planes = (props: PlanesProps) => {

  const { header, searchType } = props;

  const [filteredPlanes, setFilteredPlanes] = useState<Plane[] | undefined>();
  const [selectedPlane, setSelectedPlane] = useState<string | boolean>(false);

  const selectedAircraft = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (typeof(selectedPlane) === 'string') {
      if (searchType === 'fse') {
        setFilteredPlanes(filterFSEPlanes({data, selectedPlane}));
      }
      if (searchType === 'sim') {
        setFilteredPlanes(filterSimPlane({data, selectedPlane}));
      }
    }
  }, [selectedPlane, searchType]);

  const selectAPlane = () => {
    if (selectedAircraft && selectedAircraft.current) {
      const selected = selectedAircraft.current.value;
      setSelectedPlane(selected);
    }
  };

  return (
    <div className='finder-wrapper'>
      <div className='finder-search'>
        <div className='aircraft-finder'>
          <h2>{header}</h2>
          <form>
            <label htmlFor='aircraft'>Model</label>
            <select
              ref={selectedAircraft}
              name='aircraft'
              onChange={selectAPlane}
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
          {
            searchType === 'fse' && (
              <p><Link to='/sim'>Search for possible aliases on my sim plane instead</Link></p>
            )
          }

          {
            searchType === 'sim' && (
              <p><Link to='/fse'>Search for possible aliases for my FSE plane instead</Link></p>
            )
          }
        </div>
      </div>
      <div className='planes'>
        <>

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
                            <td colSpan={7} className='separator'>
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
                          <tr key='matches'>
                            <td colSpan={7} className='separator'>
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

      <div className='finder-notes'>
        <h2>Notes about fuel burn</h2>
        <p>FSEconomy will check that you use <em>around the same amount of fuel as your aliased model, or more</em>. If you burn more you'll always be fine (e.g. you may had to do a go-around and burn more than expected. But not too little. </p>
        <p>Check the GPH of your aliased plane, if your model burns less, try to burn as much as possible to get close to it.</p>
        <p><a href="https://sites.google.com/site/fseoperationsguide/aircraft/fuel-usage-requirements">Fuel burn information on the FSE Manual</a></p>
      </div>
    </div>
  );
};
