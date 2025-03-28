"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface AttendancePercentageChartProps {
  data: {
    date: string
    percentage: number
    [key: string]: any
  }[]
}

export function AttendancePercentageChart({ data }: AttendancePercentageChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip
            formatter={(value) => [`${value}%`, "Attendance"]}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Bar dataKey="percentage" name="Attendance %" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.percentage > 50 ? "hsl(var(--primary))" : "hsl(var(--muted))"} />
            ))}
            <LabelList
              dataKey="percentage"
              position="top"
              formatter={(value) => `${value}%`}
              fill="hsl(var(--card-foreground))"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

