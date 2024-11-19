import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { forecastChartData } from "@/Utils/Utils";

function HourlyTemperature({ forecastData }) {
  const chartData = forecastChartData(forecastData);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-base">Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Display hourly temperature chart */}
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#565656"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="temp"
                stroke="#565656"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `${val}°`}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feelsLike"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="8 8"
              />
              {/* Add tooltip to display temperature and feels like values  */}
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background rounded-md border p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1 text-xs capitalize">
                            <p>Temperature</p>
                            <p className="font-bold">{payload[0].value}°</p>
                          </div>
                          <div className="flex flex-col gap-1 text-xs capitalize">
                            <p>Feels Like</p>
                            <p className="font-bold">{payload[1].value}°</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default HourlyTemperature;
