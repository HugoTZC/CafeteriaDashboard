"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/components/ui/chart"

interface MultipleVisitsChartProps {
  data: {
    day: string
    date: string
    twiceVisitors: number
    [key: string]: any
  }[]
}

export function MultipleVisitsChart({ data }: MultipleVisitsChartProps) {
  const maxVisitors = Math.max(...data.map((item) => item.twiceVisitors))
  const yAxisMax = Math.ceil(maxVisitors * 1.1)

  return (
    <ChartContainer
      config={{
        twiceVisitors: {
          label: "Repeticiones",
          color: "var(--color-twiceVisitors)",
        },
      }}
      className="aspect-[4/3]"
    >
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" />
        <YAxis domain={[0, yAxisMax]}/>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="twiceVisitors" fill="var(--color-twiceVisitors)" radius={[4, 4, 0, 0]}>
          <LabelList dataKey="twiceVisitors" position="top" fill="hsl(var(--card-foreground))" />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

