"use client"

import { Area, AreaChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface VisitorsChartProps {
  data: {
    day: string
    date: string
    visitors: number
    [key: string]: any
  }[]
}

export function VisitorsChart({ data }: VisitorsChartProps) {
  return (
    <ChartContainer
      config={{
        visitors: {
          label: "Visitors",
          color: "var(--color-visitors)",
        },
      }}
      className="aspect-[4/3]"
    >
      <AreaChart
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
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="var(--color-visitors)"
          fill="var(--color-visitors)"
          fillOpacity={0.2}
        >
          <LabelList
            dataKey="visitors"
            position="top"
            formatter={(value) => `${value}`}
            fill="hsl(var(--card-foreground))"
          />
        </Area>
      </AreaChart>
    </ChartContainer>
  )
}

