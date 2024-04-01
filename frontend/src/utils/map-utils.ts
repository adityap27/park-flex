/**
 * Author : Ketul Patel
 * This file contains utility function for calculating radius from location coordinates
 */
// https://stackoverflow.com/a/27943/10879375
export const calculateDistanceFromLatLon = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
) => {
  const earthRadius = 6371;
  const radiusLatitude = degreeToRadius(latitude2 - latitude1);
  const radiusLongitude = degreeToRadius(longitude2 - longitude1);
  const arc =
    Math.sin(radiusLatitude / 2) * Math.sin(radiusLatitude / 2) +
    Math.cos(degreeToRadius(latitude1)) *
      Math.cos(degreeToRadius(latitude2)) *
      Math.sin(radiusLongitude / 2) *
      Math.sin(radiusLongitude / 2);
  const distance = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc));
  return earthRadius * distance;
};

const degreeToRadius = (degree: number) => {
  return degree * (Math.PI / 180);
};
