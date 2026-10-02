import { ChartLinePickupWaitHr } from '@/components/pickup_wait_hr'
import { ChartBarPickupZone } from '@/components/pickup_wait_zone'

export default function Wait() {
    const pickupWaitByHour = [
      { hour: 0, wait: 8.41 },
      { hour: 1, wait: 8.39 },
      { hour: 2, wait: 8.55 },
      { hour: 3, wait: 8.36 },
      { hour: 4, wait: 8.54 },
      { hour: 5, wait: 8.45 },
      { hour: 6, wait: 8.47 },
      { hour: 7, wait: 8.45 },
      { hour: 8, wait: 8.52 },
      { hour: 9, wait: 8.49 },
      { hour: 10, wait: 8.47 },
      { hour: 11, wait: 8.48 },
      { hour: 12, wait: 8.48 },
      { hour: 13, wait: 8.46 },
      { hour: 14, wait: 8.47 },
      { hour: 15, wait: 8.54 },
      { hour: 16, wait: 8.44 },
      { hour: 17, wait: 8.46 },
      { hour: 18, wait: 8.38 },
      { hour: 19, wait: 8.44 },
      { hour: 20, wait: 8.45 },
      { hour: 21, wait: 8.39 },
      { hour: 22, wait: 8.44 },
      { hour: 23, wait: 8.46 },
    ]
    return(
        <main className="w-full">
            <div className='px-4 py-4 mt-4 bg-[var(--foreground1)] rounded-lg border-1 border-[#35383b]'>
                <h1 className='text-lg font-bold'>What is the average time for the driver to reach the pickup (dispatched bookings)?</h1>
            </div>  

            <div className='flex flex-row gap-4 mt-4'>
                <ChartLinePickupWaitHr data={pickupWaitByHour} avg={8.46} />
                <ChartBarPickupZone></ChartBarPickupZone>
            </div>  

            <div className='w-full bg-[var(--foreground1)] p-4 rounded-lg border-1 border-[#35383b] mt-4'>
                <h1>Wait time: cancelled vs completed</h1>
                <p>Average pickup wait for each outcome</p>
                <span className='flex flex-row justify-around gap-4 mt-4'>
                    <article className='pickup-wait-card'>
                        <h1>Completed Bookings</h1>
                        <h2 className='text-4xl font-bold'>8.51 min</h2>
                    </article>
                    <article className='pickup-wait-card'>
                        <h1>Driver Cancelled Bookings</h1>
                        <h2 className='text-4xl font-bold text-amber-700'>7.50 min</h2>
                    </article>
                    <article className='pickup-wait-card'>
                        <h1>Difference</h1>
                        <h2 className='text-4xl font-bold'>-1.01 min</h2>
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