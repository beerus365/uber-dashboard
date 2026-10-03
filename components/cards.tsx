import { getAvgPickupWaitTime, getBookingFullfilmentRate, getCancellationRate, getData, getNoDriverFoundRate, getRevenueLeakage, type BookingRows } from '@/lib/helpers'

export function Cards({ data }: { data: BookingRows }) {
    const totalBookings = getData(data);
    const cancellationRate = getCancellationRate(data);
    const bookingFullfilmentRate = getBookingFullfilmentRate(data);
    const noDriverFoundRate = getNoDriverFoundRate(data);
    const avgPickupWaitTime = getAvgPickupWaitTime(data);
    const revenueLeakage = getRevenueLeakage(data);
    return(
        <main className="mx-auto flex justify-between gap-4">
            <article className="card border-t-6 border-t-white">
                <h1>Total Bookings</h1>
                <h2>{totalBookings}</h2>
                <p>Filtered ride requests</p>
            </article>

            <article className="card border-t-6 border-t-amber-300">
                <h1>Driver Cancellation Rate</h1>
                <h2>{cancellationRate}%</h2>
                <p>Filtered ride requests</p>
            </article>

            <article className="card border-t-6 border-t-emerald-600">
                <h1>Booking Fullfilment Rate</h1>
                <h2>{bookingFullfilmentRate}%</h2>
                <p>Completed / Total</p>
            </article>

            <article className="card border-t-6 border-t-amber-300">
                <h1>No Driver Found Rate</h1>
                <h2>{noDriverFoundRate}%</h2>
                <p>Filtered ride requests</p>
            </article>

            <article className="card border-t-6 border-t-blue-800">
                <h1>AVG Pick-up Wait</h1>
                <h2>{avgPickupWaitTime} min</h2>
                <p>Dispatched bookings only</p>
            </article>

            <article className="card border-t-6 border-t-amber-700">
                <h1>Revenue Leakage</h1>
                <h2>₹{(revenueLeakage / 1_000_000).toFixed(1)}M</h2>    
                <p>≈ ₹414 per cancelled booking</p>
            </article>
        </main>
    )
}