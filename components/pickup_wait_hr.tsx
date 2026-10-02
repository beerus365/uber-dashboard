"use client"

import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts"

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

export const description = "Average pickup wait time by hour"

const chartConfig = {
  wait: { label: "Avg pickup wait", color: "#276ef1" },
} satisfies ChartConfig

type HourWait = { hour: number; wait: number } // wait in minutes

export function ChartLinePickupWaitHr({
  data,
  avg,
}: {
  data: HourWait[]
  avg?: number // optional overall average, drawn as a dashed line
}) {
  return (
    <Card className="col-span-12 flex w-1/2 flex-col gap-0 rounded-xl border-0 bg-[var(--foreground1)] p-4 shadow-none lg:col-span-6">
      <CardHeader className="items-start gap-0 p-0">
        <CardTitle className="text-base font-semibold">
          Average pickup wait by hour
        </CardTitle>
        <CardDescription className="mb-2.5 text-xs text-[#5e5e5e]">
          Avg VTAT in minutes, dispatched bookings only
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#e2e2e2" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={1}
              tick={{ fontSize: 11, fill: "#5e5e5e" }}
              tickFormatter={(h) => `${h}:00`}
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
              cursor={{ stroke: "#a8a8a8", strokeDasharray: "4 4" }}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, p) => `${p?.[0]?.payload.hour}:00`}
                  formatter={(v) => `${Number(v).toFixed(2)} min`}
                />
              }
            />
            {avg !== undefined && (
              <ReferenceLine y={avg} stroke="#000" strokeDasharray="5 4" strokeWidth={1.5} />
            )}
            <Line
              dataKey="wait"
              type="monotone"
              stroke="var(--color-wait)"
              strokeWidth={2}
              dot={{ r: 2, fill: "var(--color-wait)", strokeWidth: 0 }}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}