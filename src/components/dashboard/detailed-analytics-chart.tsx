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
  const maxVisitors = Math.max(...data.map((item) => item.visitors))
  const maxTwiceVisitors = Math.max(...data.map((item) => item.twiceVisitors))

  const yAxisMaxLeft = Math.ceil(maxVisitors * 1.1)
  const yAxisMaxRight = Math.ceil(maxTwiceVisitors * 1.1)

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
          <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" domain={[0, yAxisMaxLeft]}/>
          <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--destructive))" domain={[0, yAxisMaxRight]}/>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="visitors" name="Comenzales" fill="hsl(var(--primary))">
            <LabelList dataKey="visitors" position="top" fill="hsl(var(--card-foreground))" />
          </Bar>
          <Bar yAxisId="right" dataKey="twiceVisitors" name="Repeticiones" fill="hsl(var(--destructive))">
            <LabelList dataKey="twiceVisitors" position="top" fill="hsl(var(--card-foreground))" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

