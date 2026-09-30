"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, ReferenceLine, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  rate: { label: "Driver cancellation rate", color: "#000000" },
} satisfies ChartConfig

type HourRate = { hour: number; rate: number } // rate in percent, e.g. 18.2

const barColor = (v: number, avg: number) =>
  v > avg * 1.02 ? "#e11900" : v < avg * 0.98 ? "#05a357" : "#ffc043"

export function ChartBarHourly({ data, avg = 18.0 }: { data: HourRate[]; avg?: number }) {
  return (
    <Card className="col-span-12 flex min-w-0 flex-col gap-0 rounded-xl border-0 bg-white p-4 shadow-none">
      <CardHeader className="items-start gap-0 p-0">
        <CardTitle className="text-base font-semibold">Driver cancellation rate by hour</CardTitle>
        <CardDescription className="mb-2.5 text-xs text-[#5e5e5e]">
          Cancelled by driver ÷ all bookings in that hour. Dashed line = average.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-45 w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e2e2e2" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              tick={{ fontSize: 11, fill: "#5e5e5e" }}
              tickFormatter={(h) => `${h}:00`}
            />
            <YAxis
              domain={[0, 25]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#5e5e5e" }}
              tickFormatter={(v) => `${v}%`}
              width={40}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, p) => `${p?.[0]?.payload.hour}:00`}
                  formatter={(v) => `${Number(v).toFixed(2)}%`}
                />
              }
            />
            <ReferenceLine y={avg} stroke="#000" strokeDasharray="5 4" strokeWidth={1.5} />
            <Bar dataKey="rate" radius={4} isAnimationActive={false}>
              {data.map((d) => (
                <Cell key={d.hour} fill={barColor(d.rate, avg)} />
              ))}
              <LabelList
                dataKey="rate"
                position="top"
                formatter={(value) => {
                  const numericValue = Number(value)
                  return Number.isFinite(numericValue) ? numericValue.toFixed(1) : String(value ?? "")
                }}
                className="hidden fill-black text-[10px] font-semibold md:block"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-wrap items-center gap-x-4 gap-y-1 p-0 pt-3 text-xs text-[#5e5e5e]">
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-[#e11900]" />Above average</span>
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-[#ffc043]" />Near average</span>
        <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-[#05a357]" />Below average</span>
        <span className="ml-auto font-medium text-black">Average: {avg.toFixed(1)}%</span>
      </CardFooter>
    </Card>
  )
}