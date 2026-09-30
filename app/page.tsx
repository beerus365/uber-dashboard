"use client"
import { Cards } from '@/components/cards'
import { Filter } from '@/components/filter'
import { ChartPieDonut } from '@/components/pie_chart'
import { ChartBarMixed } from '@/components/cancellation_pickup'
import { ChartBarHourly } from '@/components/cancellation_hr'

const hourlyCancellationData = [
  { hour: 0, rate: 12.6 },
  { hour: 1, rate: 10.9 },
  { hour: 2, rate: 9.8 },
  { hour: 3, rate: 11.1 },
  { hour: 4, rate: 13.4 },
  { hour: 5, rate: 14.8 },
  { hour: 6, rate: 16.5 },
  { hour: 7, rate: 18.2 },
  { hour: 8, rate: 20.1 },
  { hour: 9, rate: 21.4 },
  { hour: 10, rate: 19.7 },
  { hour: 11, rate: 18.9 },
  { hour: 12, rate: 17.6 },
  { hour: 13, rate: 16.8 },
  { hour: 14, rate: 15.4 },
  { hour: 15, rate: 17.2 },
  { hour: 16, rate: 18.8 },
  { hour: 17, rate: 22.3 },
  { hour: 18, rate: 24.1 },
  { hour: 19, rate: 23.6 },
  { hour: 20, rate: 21.9 },
  { hour: 21, rate: 20.2 },
  { hour: 22, rate: 17.9 },
  { hour: 23, rate: 15.1 },
]

export default function Home() {
  return (
    <main className="w-full max-w-8xl">
      <Filter></Filter>
      <Cards></Cards>
      <div className='flex flex-row gap-4.5 mt-4.5'>
        <ChartPieDonut></ChartPieDonut>
        <ChartBarMixed></ChartBarMixed>
      </div>
      <ChartBarHourly data={hourlyCancellationData} avg={17.8} />
    </main>
  )
}