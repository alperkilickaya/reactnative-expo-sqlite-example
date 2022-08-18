const GOOGLE_API_KEY = "AIzaSyDL3n8JnCGdsPa0TNajHQbo9_Ni1naU5_s";

// get map screenshot by usin google map static api
export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap
  &markers=color:red%7Clabel:X%7C${lat},${lng}
    &key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

// get human readable address from lat and lng by using google geocode api
export const getAddresses = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("No response from server");
    }
    const responseJson = await response.json();
    const address = responseJson.results[0].formatted_address;
    return address;
  } catch (err) {
    console.log(err);
  }
};
