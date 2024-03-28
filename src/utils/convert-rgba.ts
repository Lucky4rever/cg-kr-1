interface RGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

/**
 * Converts RGBA values to a normalized format.
 * @param red - The red value (0-255).
 * @param green - The green value (0-255).
 * @param blue - The blue value (0-255).
 * @param alpha - The alpha value (0-100).
 * @returns An array of normalized RGBA values.
 * @throws Error if any of the input values are out of range.
 */
function convertRGBA({red, green, blue, alpha}: RGBA) {
  if (red > 255 || red < 0) {
    throw new Error('red value must be between 0 and 255');
  }
  if (green > 255 || green < 0) {
    throw new Error('green value must be between 0 and 255');
  }
  if (blue > 255 || blue < 0) {
    throw new Error('blue value must be between 0 and 255');
  }
  if (alpha > 100 || alpha < 0) {
    throw new Error('alpha value must be between 0 and 255');
  }

  return [
    red / 255,
    green / 255,
    blue / 255,
    alpha / 100,
  ] as const;
}

export default convertRGBA;
