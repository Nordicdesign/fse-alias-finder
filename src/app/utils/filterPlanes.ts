import { config } from '../../config/config';
import { Plane } from './calculateTotalFuel';

interface FilterProps {
  data: {
    data: Plane[]
  };
  selectedPlane: string;
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