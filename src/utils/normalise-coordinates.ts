import CustomMath from "./custom-math";

interface Coordinates {
  x: number;
  y: number;
  z?: number;
}

function normaliseCoordinates({x, y, z = 0}: Coordinates) {
  const normalizationCoefficient = () => CustomMath.horizontalRadius;

  const k = normalizationCoefficient();

  return [
    x * k / 2,
    y / 2,
    z,
  ] as const;
}

export default normaliseCoordinates;
