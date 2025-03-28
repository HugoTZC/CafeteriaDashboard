"use client"

import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface DetailedAnalyticsChartProps {
  data: {
    date: string
    visitors: number
    twiceVisitors: number
    [key: string]: any
  }[]
}

export function DetailedAnalyticsChart({ data }: DetailedAnalyticsChartProps) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
          <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--destructive))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="visitors" name="Total Visitors" fill="hsl(var(--primary))">
            <LabelList dataKey="visitors" position="top" fill="hsl(var(--card-foreground))" />
          </Bar>
          <Bar yAxisId="right" dataKey="twiceVisitors" name="Multiple Visits" fill="hsl(var(--destructive))">
            <LabelList dataKey="twiceVisitors" position="top" fill="hsl(var(--card-foreground))" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

