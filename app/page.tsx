import { Cards } from '@/components/cards'
import { Filter } from '@/components/filter'
import { ChartPieDonut } from '@/components/pie_chart'
import { getBookingOutcomesCounts, getFilteredDashboardData, type DashboardSearchParams } from '@/lib/helpers'

export default async function Home({ searchParams }: { searchParams: Promise<DashboardSearchParams> }) {
  const { data: rows, filters } = await getFilteredDashboardData(searchParams);
  const bookingOutcomesCounts = getBookingOutcomesCounts(rows);
  return (
    <main className="w-full">

      <div className='px-4 py-4 mt-4 bg-[var(--foreground1)] rounded-lg border-1 border-[#35383b]'>
        <h1 className='text-lg font-bold'>How many booking succeed, and how many failed in Uber India?</h1>
      </div>

      <Filter filters={filters}></Filter>
      <Cards data={rows}></Cards>
      <div className='mt-4 flex flex-row gap-4'>
        <ChartPieDonut counts={bookingOutcomesCounts}></ChartPieDonut>
        <div className=' flex flex-col gap-3 w-2/3 bg-(--foreground1) p-8 rounded-2xl border-1 border-[#35383b] '>
          <h1 className='font-bold text-lg border-b-1 border-b-white pb-1'>INSIGHTS</h1>
          <ul className='flex flex-col gap-2 list-disc pl-5'>
            <li>27,000 of 1,50,000 bookings (18.0%) ended in a driver cancellation, 0.0 points above the 18.0% study baseline.</li>
            <li>Only 62.0% of bookings were completed. Driver cancellations and no-driver-found together account for 25.0%, so supply failures are the largest cause of lost bookings.</li>
            <li>Driver cancellations (18.0%) outnumber customer cancellations (7.0%), so driver reliability deserves separate attention.</li>
          </ul>
        </div>
      </div>
    </main>
  )
}