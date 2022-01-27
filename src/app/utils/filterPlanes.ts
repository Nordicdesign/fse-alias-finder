import { config } from '../../config/config';
import { planeDataType } from '../../types';
import { Plane } from './calculateTotalFuel';

interface FilterProps {
  data: {
    data: Plane[]
  };
  selectedPlane: string;
}

interface FilterManualProps {
  data: {
    data: Plane[]
  };
  manualData: planeDataType
}

export const filterFSEPlanes = (props:FilterProps): Plane[] => {
  const { data, selectedPlane } = props;
  const selectedData = data.data.filter((plane: Plane) => plane.makeModel === selectedPlane);
  // console.log('selected', selectedData);
  // same fuel type - Probably not needed
  // let result = data.data.filter(
  //   plane => plane.fuelType === selectedData[0].fuelType
  // );

  // Remove itself
  let result = data.data.filter((plane:Plane) => plane.makeModel !== selectedPlane);

  // similar cruise speed
  result = result.filter((plane:Plane) => {
    const idealCruiseSpeed = selectedData[0].cruise;
    const maxCruise = idealCruiseSpeed + (idealCruiseSpeed * config.cruiseVariation) / 100;
    const minCruise = idealCruiseSpeed - (idealCruiseSpeed * config.cruiseVariation) / 100;

    return plane.cruise > minCruise && plane.cruise < maxCruise;
  });

  // similar GPH
  result = result.filter((plane: Plane) => {
    const ideal = selectedData[0].gph;
    const max = ideal + (ideal * config.gphVariationMax) / 100;
    const min = ideal - (ideal * config.gphVariation) / 100;

    return plane.gph > min && plane.gph < max;
    // return plane.gph > min;
  });

  return result;
};


export const filterManualPlanes = (props:FilterManualProps): Plane[] => {
  const { data, manualData } = props;
  const { cruiseSpeed, fuelConsumption, mtow } = manualData;
  // const selectedData = data.data.filter((plane: Plane) => plane.makeModel === selectedPlane);
  // console.log('selected', selectedData);
  // same fuel type - Probably not needed
  // let result = data.data.filter(
  //   plane => plane.fuelType === selectedData[0].fuelType
  // );

  // Remove itself
  let result = data.data;

  // similar cruise speed
  const idealCruiseSpeed = cruiseSpeed;
  if (idealCruiseSpeed) {
    result = result.filter((plane:Plane) => {
      const maxCruise = idealCruiseSpeed + (idealCruiseSpeed * config.cruiseVariation) / 100;
      const minCruise = idealCruiseSpeed - (idealCruiseSpeed * config.cruiseVariation) / 100;
      return plane.cruise > minCruise && plane.cruise < maxCruise;
    });
  }

  // MTOW is not ridiculous
  const idealMTOW = mtow;
  if (idealMTOW) {
    result = result.filter((plane:Plane) => {
      const maxMTOW = idealMTOW + (idealMTOW * 30) / 100;
      const minMTOW = idealMTOW - (idealMTOW * 50) / 100;
      return plane.mtow > minMTOW && plane.mtow < maxMTOW;
    });
  }

  // similar GPH
  const idealFuel = fuelConsumption;
  if (idealFuel) {
    result = result.filter((plane: Plane) => {
      const max = idealFuel + (idealFuel * config.gphVariation) / 100;
      const min = idealFuel - (idealFuel * config.gphVariationMax) / 100;
      // return plane.gph > min && plane.gph < max;
      return plane.gph > min && plane.gph < max;
    });
  }

  return result;
};

export const filterSimPlane = (props:FilterProps): Plane[] => {
  const { data, selectedPlane } = props;
  const selectedData = data.data.filter((plane: Plane) => plane.makeModel === selectedPlane);
  // console.log('selected', selectedData);
  // same fuel type - Probably not needed
  // let result = data.data.filter(
  //   plane => plane.fuelType === selectedData[0].fuelType
  // );

  // Remove itself
  let result = data.data.filter((plane:Plane) => plane.makeModel !== selectedPlane);

  // similar cruise speed
  result = result.filter((plane:Plane) => {
    const idealCruiseSpeed = selectedData[0].cruise;
    const maxCruise = idealCruiseSpeed + (idealCruiseSpeed * config.cruiseVariation) / 100;
    const minCruise = idealCruiseSpeed - (idealCruiseSpeed * config.cruiseVariation) / 100;

    return plane.cruise > minCruise && plane.cruise < maxCruise;
  });

  // MTOW is not ridiculous
  result = result.filter((plane:Plane) => {
    const idealMTOW = selectedData[0].mtow;
    const maxMTOW = idealMTOW + (idealMTOW * 30) / 100;
    const minMTOW = idealMTOW - (idealMTOW * 50) / 100;

    return plane.mtow > minMTOW && plane.mtow < maxMTOW;
  });

  // similar GPH
  result = result.filter((plane: Plane) => {
    const ideal = selectedData[0].gph;
    const max = ideal + (ideal * config.gphVariation) / 100;
    const min = ideal - (ideal * config.gphVariationMax) / 100;

    // return plane.gph > min && plane.gph < max;
    return plane.gph > min && plane.gph < max;
  });

  return result;
};
