import { useState, useEffect } from "react";
import data from "../../app/data/aircraft.json";
import { filterFSEPlanes } from "../../app/utils/filterPlanes";
import { Plane, calcTotalFuel } from "../../app/utils/calculateTotalFuel";
import { Sidenav } from "../components/Sidenav";

interface PlanesProps {
  selectedPlane: string | boolean;
}

export const Planes = (props: PlanesProps) => {
  const { selectedPlane } = props;
  const [filteredPlanes, setFilteredPlanes] = useState<Plane[] | undefined>();

  useEffect(() => {
    if (typeof selectedPlane === "string") {
      setFilteredPlanes(filterFSEPlanes({ data, selectedPlane }));
    }
  }, [selectedPlane]);

  return (
    <div className="finder-wrapper">
      <div className="finder-search"></div>
      <div className="planes visible">
        <div>
          {filteredPlanes && (
            <>
              <h2>Possible candidates</h2>
              <table id="aircraft-data">
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
                    .filter((plane) => plane.makeModel === selectedPlane)
                    .map((plane, key) => {
                      const totalFuel = calcTotalFuel(plane);

                      return (
                        <>
                          <tr key="selected">
                            <td colSpan={7} className="separator">
                              Selected
                            </td>
                          </tr>
                          <tr key={key + "asdf"}>
                            <td>{plane.makeModel}</td>
                            <td>{plane.seats}</td>
                            <td>{plane.mtow}</td>
                            <td>{plane.cruise}</td>
                            <td>{plane.fuelType}</td>
                            <td>{totalFuel}</td>
                            <td>{plane.gph}</td>
                          </tr>
                          <tr key="matches">
                            <td colSpan={7} className="separator">
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
        </div>
        <Sidenav />
      </div>
    </div>
  );
};
