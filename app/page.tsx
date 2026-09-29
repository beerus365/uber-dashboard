"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = [
  { day: "Mon", rides: 120 },
  { day: "Tue", rides: 145 },
  { day: "Wed", rides: 132 },
  { day: "Thu", rides: 180 },
  { day: "Fri", rides: 210 },
]

const config = {
  rides: { label: "Rides", color: "var(--chart-1)" },
} satisfies ChartConfig

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Rides this week</h1>
      {/*
      <ChartContainer config={config} className="w-full max-w-2xl">
        <LineChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="rides"
            type="monotone"
            stroke="var(--color-rides)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
      */}
    </main>
  )
}