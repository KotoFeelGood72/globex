'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { hour: "00:00", users: 340 },
  { hour: "03:00", users: 230 },
  { hour: "06:00", users: 150 },
  { hour: "09:00", users: 453 },
  { hour: "12:00", users: 650 },
  { hour: "15:00", users: 783 },
  { hour: "18:00", users: 589 },
  { hour: "21:00", users: 476 },
];

export function ActiveUsersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Активные пользователи</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="users" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
