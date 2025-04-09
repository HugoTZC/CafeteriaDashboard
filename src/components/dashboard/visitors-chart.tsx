"use client"

import { Area, AreaChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/components/ui/chart"

interface VisitorsChartProps {
  data: {
    day: string
    date: string
    visitors: number
    [key: string]: any
  }[]
}

export function VisitorsChart({ data }: VisitorsChartProps) {
  const maxVisitors = Math.max(...data.map((item) => item.visitors))
  const yAxisMax = Math.ceil(maxVisitors * 1.1)

  return (
    <ChartContainer
      config={{
        visitors: {
          label: "Comensales: ",
          color: "var(--color-visitors)",
        },
      }}
      className="w-full h-full"
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
        <YAxis domain={[0, yAxisMax]}/>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="var(--color-visitors)"
          fill="var(--color-visitors)"
          fillOpacity={1}
        >
          <LabelList
            dataKey="visitors"
            position="right"
            formatter={(value: any) => `${value}`}
            fill="hsl(var(--card-foreground))"
          />
        </Area>
      </AreaChart>
    </ChartContainer>
  )
}

