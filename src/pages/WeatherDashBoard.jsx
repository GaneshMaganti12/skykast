import React, { useEffect } from "react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { AlertCircle, MapPin, RefreshCcw } from "lucide-react";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import { useGeoLocation } from "@/hooks/GeoLocation";
import Loading from "@/components/Loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Layout from "@/components/Layout";

import WeatherDetails from "@/components/WeatherDetails";
import Forecast from "@/components/Forecast";
import {
  useForecast,
  useReverseGeoLocation,
  useWeather,
} from "@/hooks/Weather";

function WeatherDashBoard() {
  const { coordinates, isLoading, error, getGeoLocation } = useGeoLocation();

  const { weatherData, getWeatherData } = useWeather();
  const { forecastData, getForecastData } = useForecast();
  const { locationData, getLocationsData } = useReverseGeoLocation();

  // Refreshes the current weather data using handleLocationRefresh listener.
  const handleLocationRefresh = () => {
    getGeoLocation();
  };

  // UseEffect to fetches the weather, forecast, and locations data for a given coordinates
  useEffect(() => {
    if (coordinates) {
      getWeatherData(coordinates);
      getForecastData(coordinates);
      getLocationsData(coordinates);
    }
  }, [coordinates]);

  return (
    <>
      <Header />

      {/* Display Loader if loading is true*/}
      {isLoading && <Loading />}

      {/* Display error message if there is an error and loading is false */}
      {!isLoading && error && (
        <Layout className="p-4 sm:py-8 space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
              <p>{error}</p>
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => getGeoLocation()}
              >
                <MapPin className="size-4 mr-2" />
                Enable Location
              </Button>
            </AlertDescription>
          </Alert>
        </Layout>
      )}

      {/* Display error message if there is no coordinates and loading is false */}
      {!isLoading && !coordinates && !error && (
        <Layout className="p-4 sm:py-8 space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
              <p>Please enable location access to see your weather.</p>
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => getGeoLocation()}
              >
                <MapPin className="size-4 mr-2" />
                Enable Location
              </Button>
            </AlertDescription>
          </Alert>
        </Layout>
      )}

      {/* Display weather, forecast and location data if they are available */}
      {!isLoading && weatherData && forecastData && locationData && (
        <Layout className="p-4 sm:py-8 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">My Location</h1>
            {/* Refresh button */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleLocationRefresh}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <CurrentWeather
                weatherData={weatherData}
                locationData={locationData}
              />
              <HourlyTemperature forecastData={forecastData} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 items-start">
              <WeatherDetails weatherData={weatherData} />
              <Forecast forecastData={forecastData} />
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default WeatherDashBoard;
