import { format } from "date-fns";

// Processes the forecast data to group it by date and calculate min/max temperature and other details.
export const dailyForestData = (data) => {
  return data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        tempMin: forecast.main.temp_min,
        tempMax: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].tempMin = Math.min(acc[date].tempMin, forecast.main.temp_min);
      acc[date].tempMax = Math.max(acc[date].tempMax, forecast.main.temp_max);
    }
    return acc;
  }, {});
};

// Maps the forecast data to a format suitable for charting.
export const forecastChartData = (data) => {
  return data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feelsLike: Math.round(item.main.feels_like),
  }));
};

// Converts wind degree to a wind direction.
export const getWindDirection = (degree) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index =
    Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
  return directions[index];
};

// Formats a Unix timestamp to a time format.
export const formatTime = (timestamp) => {
  return format(new Date(timestamp * 1000), "h:mm a");
};

// Round and convert the temperature from numeric value to string with "°".
export const formatTemp = (temp) => `${Math.round(temp)}°`;
