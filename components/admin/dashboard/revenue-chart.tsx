'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "Янв", revenue: 2400 },
  { date: "Фев", revenue: 1398 },
  { date: "Мар", revenue: 9800 },
  { date: "Апр", revenue: 3908 },
  { date: "Май", revenue: 4800 },
  { date: "Июн", revenue: 3800 },
  { date: "Июл", revenue: 4300 },
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Доход</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
