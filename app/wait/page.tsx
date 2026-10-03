import { ChartLineDots } from '@/components/pickup_wait_band'
import { Filter } from '@/components/filter'
import { getPickupWaitBandCounts, getCompleteBookingPickUpWait, getCancelledBookingPickUpWait, getCancelledCompletedDifference, getFilteredDashboardData, type DashboardSearchParams } from '@/lib/helpers'

export default async function Wait({ searchParams }: { searchParams: Promise<DashboardSearchParams> }) {
    const { data, filters } = await getFilteredDashboardData(searchParams);
    const pickupWaitBands = await getPickupWaitBandCounts(data);
    const completeBookingAvgWait = getCompleteBookingPickUpWait(data);
    const cancelledBookingAvgWait = getCancelledBookingPickUpWait(data);
    const cancelledCompletedDifference = getCancelledCompletedDifference(data);

    return(
        <main className="w-full">
            <div className='px-4 py-4 mt-4 bg-[var(--foreground1)] rounded-lg border-1 border-[#35383b]'>
                <h1 className='text-lg font-bold'>What is the average time for the driver to reach the pickup (dispatched bookings)?</h1>
            </div>  
            <Filter filters={filters}></Filter>
            <div className='flex flex-row gap-4 mt-4'>
                <ChartLineDots data={pickupWaitBands}></ChartLineDots>
            </div>  

            <div className='w-full bg-[var(--foreground1)] p-4 rounded-lg border-1 border-[#35383b] mt-4'>
                <h1>Wait time: cancelled vs completed</h1>
                <p>Average pickup wait for each outcome</p>
                <span className='flex flex-row justify-around gap-4 mt-4'>
                    <article className='pickup-wait-card'>
                        <h1>Completed Bookings</h1>
                        <h2 className='text-4xl font-bold'>{completeBookingAvgWait} min</h2>
                    </article>
                    <article className='pickup-wait-card'>
                        <h1>Driver Cancelled Bookings</h1>
                        <h2 className='text-4xl font-bold text-amber-700'>{cancelledBookingAvgWait} min</h2>
                    </article>
                    <article className='pickup-wait-card'>
                        <h1>Difference</h1>
                        <h2 className='text-4xl font-bold'>{cancelledCompletedDifference} min</h2>
                    </article>
                </span>
            </div>

            <div className=' flex flex-col gap-3 mt-4 w-full bg-(--foreground1) p-8 rounded-2xl border-1 border-[#35383b] '>
                <h1 className='font-bold text-lg border-b-1 border-b-white pb-1'>INSIGHTS</h1>
                <ul className='flex flex-col gap-2 list-disc pl-5'>
                    <li>Average pickup wait is 8.5 minutes and stays almost the same across hours and zones.</li>
                    <li>Driver-cancelled bookings had a 1.01-minute shorter average wait than completed ones (7.50 vs 8.51 min).</li>
                    <li>In the study, each extra minute of expected wait lowered the odds of a driver cancellation by about 8% (p &lt; 0.001). Cancellations seem to happen early in assignment, not after a long wait.</li>
                </ul>
                <p>Caution: no driver-cancelled booking has a wait above 12 minutes, and longer waits are completed or customer-cancelled bookings, so the drop at long waits may reflect customers cancelling, not drivers. Add time-to-cancel and driver-level data to confirm the cause.</p>
            </div>                    
        </main>
    )
}
