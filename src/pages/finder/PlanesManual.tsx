import { useState, useEffect } from "react";
import data from "../../app/data/aircraft.json";
import { filterManualPlanes } from "../../app/utils/filterPlanes";
import { Plane, calcTotalFuel } from "../../app/utils/calculateTotalFuel";
import { planeDataType } from "../../types";
import { Sidenav } from "../components/Sidenav";

interface PlanesProps {
  manualData: planeDataType;
}

export const PlanesManual = (props: PlanesProps) => {
  const { manualData } = props;

  const [filteredPlanes, setFilteredPlanes] = useState<Plane[] | undefined>();
  const [showManualData, setShowManualData] = useState(false);

  useEffect(() => {
    setFilteredPlanes(filterManualPlanes({ data, manualData }));
  }, [manualData]);

  useEffect(() => {
    if (
      manualData.cruiseSpeed !== 0 ||
      manualData.fuelConsumption !== 0 ||
      manualData.mtow !== 0
    ) {
      setShowManualData(true);
    }
  }, [manualData]);

  return (
    <div className="finder-wrapper">
      <div className="planes visible">
        <div>
          {filteredPlanes && showManualData && (
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
