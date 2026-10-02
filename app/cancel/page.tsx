import { ChartBarMixed } from '@/components/cancellation_pickup'
import { ChartBarHourly } from '@/components/cancellation_hr'
import { ChartBarTimeDay } from '@/components/cancellation_time_day'
import { ChartBarDayWeek } from '@/components/cancellation_day_week'

export default function Cancel() {
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
    return(
        <main className="w-full">
            <div className='px-4 py-4 mt-4 bg-[var(--foreground1)] rounded-lg border-1 border-[#35383b]'>
                <h1 className='text-lg font-bold'>Where and when do drivers cancel?</h1>
            </div>

            <ChartBarMixed></ChartBarMixed>
            <ChartBarHourly data={hourlyCancellationData} avg={17.8} />

            <div className=' flex flex-col gap-3 mt-4 w-full bg-(--foreground1) p-8 rounded-2xl border-1 border-[#35383b] '>
                <h1 className='font-bold text-lg border-b-1 border-b-white pb-1'>INSIGHTS</h1>
                <ul className='flex flex-col gap-2 list-disc pl-5'>
                    <li>Highest zone: Faridabad (19.7%); lowest: Noida (17.3%).</li>
                    <li>Peak hour: 5:00 (19.1%); calmest hour: 2:00 (16.6%).</li>
                </ul>
                <p>Caution: in the full study these gaps were small and none were statistically significant (zone p = 0.354, hour segment p = 0.473, weekday p = 0.057). Treat red bars as items to monitor, not proven problem areas.</p>
            </div>
        </main>
    )
}