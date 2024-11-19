import { useState } from "react";
import {
  getCurrentWeather,
  getForecast,
  getReverseGeoCode,
  searchLocation,
} from "@/api/Weather";

// Custom hook for fetching locations based on user input.
export function useLocation() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch location data for a given input value.
  const getLocations = (inputValue) => {
    setIsLoading(true);
    searchLocation(inputValue)
      .then((res) => {
        setLocations(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setLocations([]);
      });
  };

  // Returns locations data and getLocation function.
  return { locations, isLoading, getLocations };
}

// Custom hook for fetching weather data based on user coordinates.
export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch current weather data for a given coordinates.
  const getWeatherData = (coords) => {
    setIsLoading(true);
    getCurrentWeather(coords)
      .then((res) => {
        setWeatherData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  //Returns current weather data and getWeatherData function.
  return { weatherData, isLoading, getWeatherData };
}

// Custom hook for fetching weather forecast data based on user coordinates.
export function useForecast() {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch weather forecast data for a given coordinates.
  const getForecastData = (coords) => {
    setIsLoading(true);
    getForecast(coords)
      .then((res) => {
        setForecastData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  //Returns weather forecast data and getForestData function.
  return { forecastData, isLoading, getForecastData };
}

// Custom hook for fetching reverse geolocation data based on user coordinates.
export function useReverseGeoLocation() {
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch reverse geolocation data for a given coordinates.
  const getLocationsData = (coords) => {
    setIsLoading(true);
    getReverseGeoCode(coords)
      .then((res) => {
        setLocationData(res[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  //Returns locations data and getLocationsData function.
  return { locationData, isLoading, getLocationsData };
}
