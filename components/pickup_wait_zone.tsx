"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, XAxis, YAxis } from "recharts"

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

export const description = "Driver cancellation rate by time of day"

const chartConfig = {
  wait: { label: "Avg pickup wait", color: "#276ef1" },
} satisfies ChartConfig

const barColor = (v: number, avg: number) =>
  v > avg * 1.02 ? "#e11900" : v < avg * 0.98 ? "#05a357" : "#ffc043"

export function ChartBarPickupZone({
  data,
  avg = 8.46,
}: {
  data: { zone: string; wait: number }[]
  avg?: number
}) {
  return (
    <Card className="col-span-12 flex w-1/2 flex-col gap-0 rounded-xl border-0 bg-[var(--foreground1)] p-4 shadow-none lg:col-span-6">
      <CardHeader className="items-start gap-0 p-0">
        <CardTitle className="text-base font-semibold">
          Average pickup wait by zone
        </CardTitle>
        <CardDescription className="mb-2.5 text-xs text-[#5e5e5e]">
          Minutes until the driver reaches the pickup
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e2e2e2" />
            <XAxis
              dataKey="zone"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12, fill: "#5e5e5e" }}
            />
            <YAxis
              domain={[0, "auto"]}
              tickLine={false}
              axisLine={false}
              width={40}
              tick={{ fontSize: 11, fill: "#5e5e5e" }}
              tickFormatter={(v) => `${v}m`}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(v) => `${Number(v).toFixed(2)} min`}
                />
              }
            />
            <Bar dataKey="wait" radius={4} isAnimationActive={false}>
              {data.map((d) => (
                <Cell key={d.zone} fill={barColor(d.wait, avg)} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}