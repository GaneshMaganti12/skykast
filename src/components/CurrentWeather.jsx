import React from "react";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
import { formatTemp } from "@/Utils/Utils";
import { format } from "date-fns";

function CurrentWeather({ weatherData, locationData }) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    dt,
  } = weatherData;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {/* City Name, State and Country */}
            <span className="text-sm text-gray-500 font-medium">
              {format(new Date(dt * 1000), "EEE, MMM d")}
            </span>
            {locationData && (
              <div className="flex flex-col space-y-1">
                <h2 className="text-2xl font-bold">{locationData.name}</h2>
                <p className="text-muted-foreground text-sm">
                  {locationData.state}, {locationData.country}
                </p>
              </div>
            )}

            {/* City current temperature and feels like */}
            <div className="flex items-center gap-4">
              <h1 className="text-7xl font-bold">{formatTemp(temp)}</h1>
              <div className="flex flex-col space-y-1">
                <p className="text-sm text-muted-foreground">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="size-3" />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="size-3" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            {/* City Wind and Humidity */}
            <div className="grid grid-cols-2 gap-8 space-y-1">
              <div className="flex items-center gap-2">
                <Wind className="text-blue-500 size-5" />
                <span className="flex flex-col text-sm">
                  <p className="font-medium">Wind Speed</p>
                  <p className="text-muted-foreground">{speed} m/s</p>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Droplet className="text-blue-500 size-5" />
                <span className="flex flex-col text-sm">
                  <p className="font-medium">Humidity</p>
                  <p className="text-muted-foreground">{humidity}%</p>
                </span>
              </div>
            </div>
          </div>

          {/* City current temperature description */}
          <div className="flex justify-center">
            <div className="relative -top-5x flex flex-col items-center justify-center aspect-square w-full max-w-[200px]">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
              <p className="absolute bottom-0 text-sm font-medium capitalize text-center">
                {currentWeather.description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CurrentWeather;
