"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useTheme } from "next-themes";

const data = [
  {
    name: "Янв",
    deposits: 4500,
    withdrawals: 2300,
  },
  {
    name: "Фев",
    deposits: 5200,
    withdrawals: 3100,
  },
  {
    name: "Мар",
    deposits: 6100,
    withdrawals: 3800,
  },
  {
    name: "Апр",
    deposits: 5800,
    withdrawals: 3400,
  },
  {
    name: "Май",
    deposits: 6800,
    withdrawals: 4200,
  },
  {
    name: "Июн",
    deposits: 7200,
    withdrawals: 4600,
  },
  {
    name: "Июл",
    deposits: 7800,
    withdrawals: 5100,
  },
];

export function Overview() {
  const { theme: mode } = useTheme();

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            backgroundColor: mode === "dark" ? "#1f2937" : "#ffffff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
          labelStyle={{
            color: mode === "dark" ? "#ffffff" : "#000000",
          }}
        />
        <Bar
          dataKey="deposits"
          fill={mode === "dark" ? "#22c55e" : "#16a34a"}
          radius={[4, 4, 0, 0]}
          name="Депозиты"
        />
        <Bar
          dataKey="withdrawals"
          fill={mode === "dark" ? "#ef4444" : "#dc2626"}
          radius={[4, 4, 0, 0]}
          name="Выводы"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
