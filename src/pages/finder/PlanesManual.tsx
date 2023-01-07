import React, { useState, useEffect } from "react";
import data from "../../app/data/aircraft.json";
import { filterManualPlanes } from "../../app/utils/filterPlanes";
import { Plane, calcTotalFuel } from "../../app/utils/calculateTotalFuel";
import { planeDataType } from "../../types";

interface PlanesProps {
  manualData: planeDataType;
}

export const PlanesManual = (props: PlanesProps) => {
  const { manualData } = props;

  const [filteredPlanes, setFilteredPlanes] = useState<Plane[] | undefined>();
  const [showManualData, setShowManualData] = useState<boolean>(false);

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
        <div className="finder-notes">
          <p className="note">
            Highly experimental! Don&apos;t be surprised if things are wrong,
            for any feedback find me on FSE&apos;s Discord (Nordic-FSE)
          </p>
          <h2>About fuel burn</h2>
          <p>
            FSEconomy will check that you use{" "}
            <em>
              around the same amount of fuel as your aliased model, or more
            </em>
            .
          </p>
          <p>
            If you burn more you&apos;ll always be fine, just try not to burn
            too little.{" "}
          </p>
          <p>
            Check the GPH of your aliased plane, if your model burns less, try
            to burn as much as possible to get close to it.
          </p>
          <p>
            <a href="https://sites.google.com/site/fseoperationsguide/aircraft/fuel-usage-requirements">
              Fuel burn information on the FSE Manual
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
