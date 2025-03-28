"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface AttendanceRateChartProps {
  attendanceRate: number
}

export function AttendanceRateChart({ attendanceRate }: AttendanceRateChartProps) {
  const data = [
    { name: "Visitors", value: attendanceRate },
    { name: "Non-Visitors", value: 100 - attendanceRate },
  ]

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
            labelLine={true}
          >
            <Cell fill="hsl(var(--primary))" />
            <Cell fill="hsl(var(--muted))" />
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

