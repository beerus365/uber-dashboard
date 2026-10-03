"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A line chart with dots"


const chartConfig = {
  rate: {
    label: "Driver cancellation rate",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const dotColors = ["#276ef1", "#e11900", "#05a357", "#ffc043", "#00a3a3", "#d14b8f"]

type WaitBandRate = { band: string; rate: number }

export function ChartLineDots({ data }: { data: WaitBandRate[] }) {
  return (
    <Card className="w-full bg-(--foreground1)">
      <CardHeader>
        <CardTitle>Driver cancellation rate by pickup wait band</CardTitle>
        <CardDescription>Share of bookings cancelled by the driver within each average pickup wait band.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full aspect-auto">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="band"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => payload?.[0]?.payload.band}
                  formatter={(value) => `${Number(value).toFixed(2)}%`}
                />
              }
            />
            <Line
              dataKey="rate"
              type="natural"
              stroke="var(--color-rate)"
              strokeWidth={2}
              dot={(props) => {
                const color = dotColors[props.index ?? 0]
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill={color}
                    stroke="white"
                    strokeWidth={2}
                  />
                )
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 
