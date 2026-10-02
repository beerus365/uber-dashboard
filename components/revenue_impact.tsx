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

export const description = "Estimated revenue leakage by pickup zone"

// Same zone colors as the dashboard
const chartConfig = {
  leakage: { label: "Revenue leakage" },
  delhi: { label: "Delhi", color: "#000000" },
  gurgaon: { label: "Gurgaon", color: "#e11900" },
  noida: { label: "Noida", color: "#ffc043" },
  ghaziabad: { label: "Ghaziabad", color: "#05a357" },
  faridabad: { label: "Faridabad", color: "#276ef1" },
  other: { label: "Other NCR Town", color: "#a8a8a8" },
} satisfies ChartConfig

type ZoneLeakage = { zone: keyof typeof chartConfig; leakage: number } // leakage in ₹ million

// Full-dataset values from the study. Pass filtered values via the `data` prop.
const defaultData: ZoneLeakage[] = [
  { zone: "delhi", leakage: 8.16 },
  { zone: "gurgaon", leakage: 1.94 },
  { zone: "noida", leakage: 0.38 },
  { zone: "ghaziabad", leakage: 0.33 },
  { zone: "faridabad", leakage: 0.07 },
  { zone: "other", leakage: 0.3 },
]

export function ChartPieDonut({ data = defaultData }: { data?: ZoneLeakage[] }) {
  const chartData = data.map((d) => ({ ...d, fill: `var(--color-${d.zone})` }))

  return (
    <Card className="flex flex-col w-1/2 bg-[var(--foreground1)] p-8 rounded-2xl border-1 border-[#35383b]">
      <CardHeader className="items-start gap-0 p-0">
        <CardTitle className="text-base font-semibold">
          Estimated revenue leakage by zone
        </CardTitle>
        <CardDescription className="mb-2.5 text-xs">
          Proxy fare: median completed fare for same vehicle, zone, time segment (₹)
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span>{chartConfig[name as keyof typeof chartConfig]?.label ?? name}</span>
                      <span className="font-mono font-medium">₹{Number(value).toFixed(2)}M</span>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="leakage"
              nameKey="zone"
              innerRadius="62%"
              outerRadius="90%"
              strokeWidth={0}
              isAnimationActive={false}
            />
            <ChartLegend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              content={
                <ChartLegendContent
                  nameKey="zone"
                  className="flex-col items-start gap-2 text-xs"
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}