import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";
import Header from "@/components/Header";
import HourlyTemperature from "@/components/HourlyTemperature";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import WeatherDetails from "@/components/WeatherDetails";
import { useForecast, useWeather } from "@/hooks/Weather";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coords = { lat, lon };

  const { weatherData, isLoading, getWeatherData } = useWeather();
  const { forecastData, getForecastData } = useForecast();

  useEffect(() => {
    if (coords) {
      getWeatherData(coords);
      getForecastData(coords);
    }
  }, [params]);

  return (
    <>
      <Header />
      {/* Display Loader if loading is true */}
      {isLoading && <Loading />}

      {/* Display weather and forecast data if both are available */}
      {weatherData && forecastData && (
        <Layout className="p-4 sm:py-8 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              {params.cityName},{weatherData.sys.country}
            </h1>
          </div>

          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <CurrentWeather weatherData={weatherData} />
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

export default CityPage;
