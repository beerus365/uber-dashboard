"use client"

import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts"

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

export const description = "A mixed bar chart"

const chartConfig = {
  cancellations: {
    label: "Driver cancellations",
    color: "#e11900",
  },
} satisfies ChartConfig

const barColor = (value: number, average: number) =>
  value > average * 1.02 ? "#e11900" : value < average * 0.98 ? "#05a357" : "#ffc043"

export function ChartBarMixed({
  data,
}: {
  data: { zone: string; cancellations: number }[]
}) {
  const averageCancellations =
    data.reduce((sum, entry) => sum + entry.cancellations, 0) / (data.length || 1)

  return (
    <Card className="w-full bg-(--foreground1) mt-4">
      <CardHeader>
        <CardTitle>Driver cancellations by pickup zone</CardTitle>
        <CardDescription>Red: above average · Yellow: near average · Green: below average</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full aspect-auto">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="zone"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={true}
              width={70}
            />
            <XAxis dataKey="cancellations" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="cancellations" fill="var(--color-cancellations)" radius={5}>
              {data.map((entry) => (
                <Cell
                  key={entry.zone}
                  fill={barColor(entry.cancellations, averageCancellations)}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
