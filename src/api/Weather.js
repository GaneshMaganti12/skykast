import { API_CONFIG } from "./Config";

// Creates a URL with query parameters for API requests.
export const createUrl = (endpoint, params) => {
  const searchParams = new URLSearchParams({
    appid: API_CONFIG.API_KEY,
    ...params,
  });

  return `${endpoint}?${searchParams.toString()}`;
};

// Fetches data from a given url.
export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.statusText}`);
  }

  return await response.json();
};

// Fetches current weather data for a given latitude and longitude.
export const getCurrentWeather = ({ lat = 0, lon = 0 } = {}) => {
  const url = createUrl(`${API_CONFIG.BASE_URL}/weather`, {
    lat: lat.toString(),
    lon: lon.toString(),
    units: "metric",
  });

  return fetchData(url);
};

// Fetches reverse geocoding data (location name) for a given latitude and longitude.
export const getReverseGeoCode = ({ lat = 0, lon = 0 } = {}) => {
  const url = createUrl(`${API_CONFIG.GEO}/reverse`, {
    lat: lat.toString(),
    lon: lon.toString(),
    limit: "1",
  });

  return fetchData(url);
};

// Fetches weather forecast data for a given latitude and longitude.
export const getForecast = ({ lat = 0, lon = 0 } = {}) => {
  const url = createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
    lat: lat.toString(),
    lon: lon.toString(),
    units: "metric",
  });

  return fetchData(url);
};

// Fetches search locations for a given query.
export const searchLocation = (query) => {
  const url = createUrl(`${API_CONFIG.GEO}/direct`, {
    q: query,
    limit: "5",
  });

  return fetchData(url);
};
