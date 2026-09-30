"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "Booking outcomes donut chart with a legend"

// Uber dashboard palette
const chartConfig = {
  bookings: { label: "Bookings" },
  completed: { label: "Completed", color: "#05a357" },
  driverCancelled: { label: "Cancelled by Driver", color: "#e11900" },
  customerCancelled: { label: "Cancelled by Customer", color: "#ffc043" },
  noDriver: { label: "No Driver Found", color: "#000000" },
  incomplete: { label: "Incomplete", color: "#a8a8a8" },
} satisfies ChartConfig

// Pass filtered counts in this order: completed, driver cancelled,
// customer cancelled, no driver found, incomplete.
// Defaults are the full-dataset counts from the study.
export function ChartPieDonut({
  counts = [93000, 27000, 10500, 10500, 9000],
}: {
  counts?: number[]
}) {
  const keys = Object.keys(chartConfig).filter((k) => k !== "bookings")
  const chartData = keys.map((status, i) => ({
    status,
    bookings: counts[i] ?? 0,
    fill: `var(--color-${status})`,
  }))
  const total = counts.reduce((a, b) => a + b, 0)

  return (
    <Card className="col-span-12 flex w-[calc(33.33%-2rem)] ml-8 flex-col gap-0 rounded-xl border-0 bg-[var(--foreground1)] p-4 shadow-none lg:col-span-4">
      <CardHeader className="items-start gap-0 p-0">
        <CardTitle className="text-base font-semibold">
          Booking outcomes
        </CardTitle>
        <CardDescription className="mb-2.5 text-xs text-[#5e5e5e]">
          Share of all bookings by status
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-auto h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="status" />}
            />
            <Pie
              data={chartData}
              dataKey="bookings"
              nameKey="status"
              innerRadius="62%"
              outerRadius="90%"
              strokeWidth={0}
              isAnimationActive={false}
            >

            </Pie>
            <ChartLegend
              verticalAlign="bottom"
              content={
                <ChartLegendContent
                  nameKey="status"
                  className="flex-wrap gap-x-3 gap-y-1 text-xs"
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}