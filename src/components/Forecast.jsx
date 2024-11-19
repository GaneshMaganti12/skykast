import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
import { dailyForestData, formatTemp } from "@/Utils/Utils";

function Forecast({ forecastData }) {
  const dailyForest = dailyForestData(forecastData);
  const nextDaysForest = Object.values(dailyForest).slice(1, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">5 Day's Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {nextDaysForest.map((day) => (
            <div
              key={day.date}
              className="grid sm:grid-cols-2 items-center gap-4 rounded-md border p-4"
            >
              {/* 5 days forecast date and weather description data */}
              <div className="flex items-center gap-2">
                <img
                  className="h-[60px]"
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}@4x.png`}
                  alt={day.weather.description}
                />
                <div className="text-sm">
                  <p className="font-medium">
                    {format(new Date(day.date * 1000), "EEE, MMM d")}
                  </p>
                  <p className="text-muted-foreground capitalize">
                    {day.weather.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-5 md:gap-8">
                {/* 5 days forecast min & max temperature data */}
                <div className="flex sm:justify-center gap-2">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemp(day.tempMin)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(day.tempMax)}
                  </span>
                </div>

                {/* 5 days forecast wind and humidity data */}
                <div className="flex sm:justify-end gap-4">
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.wind} m/s</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplet className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Forecast;
