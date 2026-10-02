import { ChartPieDonut } from "@/components/revenue_impact"

export default function RevenueImpact() {
    return(
        <main className="w-full">
            <div className='px-4 py-4 mt-4 bg-[var(--foreground1)] rounded-lg border-1 border-[#35383b]'>
                <h1 className='text-lg font-bold'>What is the estimated fare value lost to driver cancellations?</h1>
            </div>

            <div className="flex flex-row gap-4 mt-4">
                <ChartPieDonut></ChartPieDonut>
                <div className=' flex flex-col gap-3 w-1/2 bg-(--foreground1) p-8 rounded-2xl border-1 border-[#35383b] '>
                <h1 className='font-bold text-lg border-b-1 border-b-white pb-1'>INSIGHTS</h1>
                <ul className='flex flex-col gap-2 list-disc pl-5'>
                    <li>Estimated leakage reached ₹11.19 million (19.1% of potential revenue), potentially rising to ₹13.7 million using average fares.</li>
                    <li>Autos (24.5%), Go Mini (19.7%), and Go Sedan (18.7%) accounted for 62.9% of total leakage.</li>
                    <li>Evening bookings and the Delhi and Gurgaon zones contributed most to the leakage.</li>
                    <li>Leakage remained relatively stable across weekdays and months. Estimates cover only driver cancellations and exclude platform commissions.</li>
                </ul>
                <p>Not included: no-driver-found, customer-cancelled and incomplete bookings, and any platform commission. Leakage represents estimated gross booking value, with vehicle and zone rankings primarily reflecting booking volume.</p>
                </div>
            </div>

            <div className='flex flex-col mt-8'>
                <h1 className="font-bold text-3xl">Statistical Evidence</h1>
                <p className='!text-sm'>
                    Chi-square tests against driver cancellation (all 150,000 bookings). The wait-band test is an addition to the original study, which also found a significant Mann-Whitney U (p &lt; 0.001) and regression effect for wait time.
                </p>
                <table className="w-full border-separate border-spacing-0 mt-4 rounded-xl border-l-4 px-8 py-4 border-[#276ef1] bg-[var(--foreground1)] text-left">
                    <thead>
                        <tr>
                            <th className="p-2 font-semibold">Factor</th>
                            <th className="p-2 font-semibold">Result</th>
                            <th className="p-2 font-semibold">Reading</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-[#35383b]">
                            <td className="border-t border-[#35383b] p-2">Pickup wait time</td>
                            <td className="whitespace-nowrap border-t border-[#35383b] p-2">χ²(5) = 6,351.8, p &lt; 0.001</td>
                            <td className="border-t border-[#35383b] p-2 font-semibold text-[#05a357]">Significant</td>
                        </tr>
                        <tr className="hover:bg-[#35383b]">
                            <td className="border-t border-[#35383b] p-2">Vehicle type</td>
                            <td className="whitespace-nowrap border-t border-[#35383b] p-2">χ²(6) = 9.65, p = 0.140</td>
                            <td className="border-t border-[#35383b] p-2 text-[#5e5e5e]">Not Significant</td>
                        </tr>
                        <tr className="hover:bg-[#35383b]">
                            <td className="border-t border-[#35383b] p-2">Pickup zone</td>
                            <td className="whitespace-nowrap border-t border-[#35383b] p-2">    χ²(5) = 5.54, p = 0.354</td>
                            <td className="border-t border-[#35383b] p-2 text-[#5e5e5e]">Not Significant</td>
                        </tr>
                        <tr className="hover:bg-[#35383b]">
                            <td className="border-t border-[#35383b] p-2">Hour segment</td>
                            <td className="whitespace-nowrap border-t border-[#35383b] p-2">    χ²(3) = 2.51, p = 0.473</td>
                            <td className="border-t border-[#35383b] p-2 text-[#5e5e5e]">Not Significant</td>
                        </tr>
                        <tr className="hover:bg-[#35383b]">
                            <td className="border-t border-[#35383b] p-2">Hour of day (24 hours)</td>
                            <td className="whitespace-nowrap border-t border-[#35383b] p-2">χ²(23) = 20.22, p = 0.629</td>
                            <td className="border-t border-[#35383b] p-2 text-[#5e5e5e]">Not Significant</td>
                        </tr>
                        <tr className="hover:bg-[#35383b]">
                            <td className="border-t border-[#35383b] p-2">Day of week</td>
                            <td className="whitespace-nowrap border-t border-[#35383b] p-2">χ²(6) = 12.21, p = 0.057</td>
                            <td className="border-t border-[#35383b] p-2 text-[#5e5e5e]">Not Significant</td>
                        </tr>
                        <tr className="hover:bg-[#35383b]">
                            <td className="border-t border-[#35383b] p-2">Stated reason × vehicle type</td>
                            <td className="whitespace-nowrap border-t border-[#35383b] p-2">χ²(18) = 17.04, p = 0.520</td>
                            <td className="border-t border-[#35383b] p-2 text-[#5e5e5e]">Not Significant</td>
                        </tr>
                        <tr className="hover:bg-[#35383b]">
                            <td className="border-t border-[#35383b] p-2">Stated reason × hour segment</td>
                            <td className="whitespace-nowrap border-t border-[#35383b] p-2">p = 0.18</td>
                            <td className="border-t border-[#35383b] p-2 text-[#5e5e5e]">Not Significant</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}