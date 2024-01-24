const enrichGeoLocation = async (location: { lat: number; lng: number }) => {
  // let url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  // url.searchParams.append("latlng", `${location.lat},${location.lng}`);
  // url.searchParams.append("key", "AIzaSyBRgAg8iD5HLyhLIdygeseO5QPB-JMpj4w");

  // const geoLocation = await axios.get(url.toString());

  return location;
};

export { enrichGeoLocation };
