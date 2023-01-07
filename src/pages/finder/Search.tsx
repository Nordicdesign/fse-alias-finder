import React, { useRef } from "react";
import data from "../../app/data/aircraft.json";
import { planeDataType } from "../../types";

const initialManual = {
  cruiseSpeed: 0,
  fuelConsumption: 0,
  mtow: 0,
};

interface SearchProps {
  selectedPlane: string | boolean;
  setSelectedPlane: React.Dispatch<React.SetStateAction<string | boolean>>;
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  manualData: planeDataType;
  setManualData: React.Dispatch<React.SetStateAction<planeDataType>>;
}

export const Search = (props: SearchProps) => {
  const { setSelectedPlane, searchType, setSearchType, setManualData } = props;

  const selectedAircraft = useRef<HTMLSelectElement>(null);
  const cruiseSpeed = useRef<HTMLInputElement>(null);
  const fuelConsumption = useRef<HTMLInputElement>(null);
  const mtow = useRef<HTMLInputElement>(null);

  // const searchManually = () => setSearchType("manual");
  // const searchModel = () => setSearchType("model-fse");

  const selectAPlane = () => {
    if (selectedAircraft && selectedAircraft.current) {
      // revert manual data to nothing
      setManualData(initialManual);
      const selected = selectedAircraft.current.value;
      selected === "" ? setSelectedPlane(false) : setSelectedPlane(selected);
    }
  };

  const manualPlaneData = () => {
    const speed = cruiseSpeed.current && parseFloat(cruiseSpeed.current.value);
    const fuel =
      fuelConsumption.current && parseFloat(fuelConsumption.current.value);
    const weight = mtow.current && parseFloat(mtow.current.value);
    setManualData({
      cruiseSpeed: speed,
      fuelConsumption: fuel,
      mtow: weight,
    });
  };

  const changeSearchType = () =>
    searchType === "manual"
      ? setSearchType("model-fse")
      : setSearchType("manual");

  const SearchTypeToggle = () => {
    return (
      <div className="search-model-toggle">
        <label className="switch">
          <input
            type="checkbox"
            name="searchType"
            checked={searchType === "manual" ? true : false}
            onChange={changeSearchType}
          />
          <span className="slider round"></span>Manual search
        </label>
      </div>
    );
  };

  return (
    <div className="search">
      <div className="search--header">
        <h2 className="home-intro-text">What are you looking to alias?</h2>
        <SearchTypeToggle />
      </div>

      {searchType === "model-fse" ? (
        <form id="model-fse" name="model-fse">
          <div className="search-model">
            <div className="search-formItem">
              <label htmlFor="aircraft">Aircraft model</label>
              <select
                ref={selectedAircraft}
                name="aircraft"
                onChange={selectAPlane}
              >
                <option value="">Please select</option>
                {data.data.map((plane, key) => {
                  return (
                    <option key={key} value={plane.makeModel}>
                      {plane.makeModel}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </form>
      ) : null}
      {searchType === "manual" ? (
        <form id="manual" name="manual">
          <div className="search-manual">
            <div className="search-formItem">
              <label htmlFor="speed">Cruise Speed</label>
              <input
                type="number"
                name="cruiseSpeed"
                ref={cruiseSpeed}
                placeholder="In kts"
                onChange={() => manualPlaneData()}
              />
            </div>
            <div className="search-formItem">
              <label htmlFor="gph">Fuel consumption (GPH)</label>
              <input
                type="number"
                name="fuelConsumption"
                ref={fuelConsumption}
                placeholder="In GPH"
                onChange={() => manualPlaneData()}
              />
            </div>
            <div className="search-formItem">
              <label htmlFor="mtow">MTOW (Kg)</label>
              <input
                type="number"
                name="mtow"
                ref={mtow}
                placeholder="In Kg"
                onChange={() => manualPlaneData()}
              />
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
};
