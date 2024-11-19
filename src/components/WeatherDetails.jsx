import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { formatTime, getWindDirection } from "@/Utils/Utils";

function WeatherDetails({ weatherData }) {
  const { main, sys, wind } = weatherData;

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Air Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              className="flex items-center gap-4 rounded-md border p-4"
              key={detail.title}
            >
              <detail.icon className={`size-5 ${detail.color}`} />
              <div className="text-sm">
                <p className="font-medium leading-none">{detail.title}</p>
                <p className="text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherDetails;
