/**
 * Author : Ketul Patel
 * This file contains utility method for converting number to fixed 2 digits number
 */
export const formatToTwoPrecisionFloat = (value: any) => {
  if (typeof value !== "number") {
    throw new Error("Input must be a number");
  }
  return value.toFixed(2);
};
