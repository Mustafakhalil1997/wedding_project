export const findDistanceBetween = (location1, location2) => {
  // let R = 3958.8; // Radius of the earth in miles
  let R = 6371.071; // to get result in km
  let rlat1 = location1.lat * (Math.PI / 180); // Convert degrees to radians
  let rlat2 = location2.latitude * (Math.PI / 180); // Convert degrees to radians
  let difflat = rlat2 - rlat1; // Radian difference (latitudes)
  let difflon = (location2.longitude - location1.lng) * (Math.PI / 180); // radian diff longitudes
  let d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return Math.floor(d);
};
