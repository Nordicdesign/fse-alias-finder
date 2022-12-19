export interface Plane {
  makeModel: string;
  additonalCrew: number;
  seats: number;
  cruise: number;
  ext1: number;
  leftTip: number;
  leftAux: number;
  leftMain: number;
  center: number;
  center2: number;
  center3: number;
  rightMain: number;
  rightAux: number;
  rightTip: number;
  ext2: number;
  gph: number;
  fuelType: string;
  mtow: number;
  emptyWeight: number;
  basePrice: string;
}

export const calcTotalFuel = (plane: Plane) => {
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
