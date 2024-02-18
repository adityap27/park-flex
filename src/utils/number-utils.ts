export const formatToTwoPrecisionFloat = (value: any) => {
  if (typeof value !== "number") {
    throw new Error("Input must be a number");
  }
  return value.toFixed(2);
};
