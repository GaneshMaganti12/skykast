import { useEffect, useState } from "react";

export const useGeoLocation = () => {
  const [locationData, setLocationData] = useState({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  // Function to fetch the Geolocation data
  const getGeoLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    // Use the GeoLocation API to get current position of the user.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errMsg = "";

        // Handle different geolocation errors based on the error code.
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errMsg =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errMsg = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errMsg = "Location request timed out.";
            break;
          default:
            errMsg = "An unknown error occurred.";
        }

        setLocationData({
          coordinates: null,
          error: errMsg,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // UseEffect to trigger the getLocation function.
  useEffect(() => {
    getGeoLocation();
  }, []);

  // Returns locations data and getLocations function.
  return {
    ...locationData,
    getGeoLocation,
  };
};
