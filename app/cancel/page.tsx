import { ChartBarMixed } from '@/components/cancellation_pickup'
import { ChartBarHourly } from '@/components/cancellation_hr'
import { Filter } from '@/components/filter' 
import { getCancellationbyPickupZoneCounts, getCancellationbyHourCounts, getFilteredDashboardData, type DashboardSearchParams } from '@/lib/helpers'


export default async function Cancel({ searchParams }: { searchParams: Promise<DashboardSearchParams> }) {
    const { data: rows, filters } = await getFilteredDashboardData(searchParams);
    const cancellationByPickupZoneCounts = getCancellationbyPickupZoneCounts(rows);
    const cancellationByPickupZoneData = Object.entries(cancellationByPickupZoneCounts).map(
        ([zone, cancellations]) => ({ zone, cancellations })
    );
    const hourlyCancellationData = getCancellationbyHourCounts(rows);
    return(
        <main className="w-full">
            <div className='px-4 py-4 mt-4 bg-[var(--foreground1)] rounded-lg border-1 border-[#35383b]'>
                <h1 className='text-lg font-bold'>Where and when do drivers cancel?</h1>
            </div>
            <Filter filters={filters}></Filter>
            <ChartBarMixed data={cancellationByPickupZoneData} />
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