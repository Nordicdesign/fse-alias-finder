import { useState } from "react";
import { Search } from "../finder/Search";
import { Planes } from "../finder/Planes";
import { PlanesManual } from "../finder/PlanesManual";
import { planeDataType } from "../../types";
import { AboutModal } from "../components/AboutModal";

const initialManual = {
  cruiseSpeed: 0,
  fuelConsumption: 0,
  mtow: 0,
};

export const Home = () => {
  const [selectedPlane, setSelectedPlane] = useState<string | boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [manualData, setManualData] = useState<planeDataType>(initialManual);
  const [searchType, setSearchType] = useState<string>("model-fse");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="home-container">
        <Search
          selectedPlane={selectedPlane}
          setSelectedPlane={setSelectedPlane}
          setSearchType={setSearchType}
          searchType={searchType}
          manualData={manualData}
          setManualData={setManualData}
        />
        {searchType === "model-fse" && selectedPlane && (
          <Planes selectedPlane={selectedPlane} />
        )}
        {searchType === "manual" && <PlanesManual manualData={manualData} />}

        <div className="what" onClick={openModal} role="button">
          <p>What is this about? 🤷</p>
        </div>
      </div>
      <AboutModal isOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};
