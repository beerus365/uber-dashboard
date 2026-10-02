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
  rate: { label: "Driver cancellation rate", color: "#000000" },
} satisfies ChartConfig

// Full-dataset rates from the study (%). Pass filtered values via the `data` prop.
const defaultData = [
  { segment: "Monday", rate: 18.35 },
  { segment: "Tuesday", rate: 17.8 },
  { segment: "Wednesday", rate: 18.12 },
  { segment: "Thursday", rate: 17.99 },
  { segment: "Friday", rate: 17.99 },
  { segment: "Saturday", rate: 17.99 },
  { segment: "Sunday", rate: 17.99 },
]

const barColor = (v: number, avg: number) =>
  v > avg * 1.02 ? "#e11900" : v < avg * 0.98 ? "#05a357" : "#ffc043"

export function ChartBarDayWeek({
  data = defaultData,
  avg = 18.0,
}: {
  data?: { segment: string; rate: number }[]
  avg?: number
}) {
  return (
    <Card className="col-span-12 flex w-1/2 flex-col gap-0 rounded-xl border-0 bg-[var(--foreground1)] p-4 shadow-none lg:col-span-6">
      <CardHeader className="items-start gap-0 p-0">
        <CardTitle className="text-base font-semibold">
          Cancellation rate by day of week
        </CardTitle>
        <CardDescription className="mb-2.5 text-xs text-[#5e5e5e]">
          Monday is the highest day in the study, though not significant (p = 0.057)
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e2e2e2" />
            <XAxis
              dataKey="segment"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12, fill: "#5e5e5e" }}
            />
            <YAxis
              domain={[0, 25]}
              tickLine={false}
              axisLine={false}
              width={40}
              tick={{ fontSize: 11, fill: "#5e5e5e" }}
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(v) => `${Number(v).toFixed(2)}%`}
                />
              }
            />
            <ReferenceLine y={avg} stroke="#8a8a8a" strokeDasharray="6 6" strokeWidth={1.2} strokeOpacity={0.75} />
            <Bar dataKey="rate" radius={4} isAnimationActive={false}>
              {data.map((d) => (
                <Cell key={d.segment} fill={barColor(d.rate, avg)} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}