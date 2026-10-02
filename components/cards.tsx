export function Cards() {
    return(
        <main className="mx-auto flex justify-between gap-4">
            <article className="card border-t-6 border-t-white">
                <h1>Total Bookings</h1>
                <h2>12,000</h2>
                <p>All ride requests</p>
            </article>

            <article className="card border-t-6 border-t-amber-300">
                <h1>Driver Cancellation Rate</h1>
                <h2>18.1%</h2>
                <p>Baseline for full dataset: 18.0%</p>
            </article>

            <article className="card border-t-6 border-t-emerald-600">
                <h1>Booking Fullfilment Rate</h1>
                <h2>62.3%</h2>
                <p>Completed / Total</p>
            </article>

            <article className="card border-t-6 border-t-amber-300">
                <h1>No Driver Found Rate</h1>
                <h2>12,000</h2>
                <p>All ride requests</p>
            </article>

            <article className="card border-t-6 border-t-blue-800">
                <h1>AVG Pick-up Wait</h1>
                <h2>8.5 min</h2>
                <p>Dispatched bookings only</p>
            </article>

            <article className="card border-t-6 border-t-amber-700">
                <h1>Revenue Leakage</h1>
                <h2>₹11.19M</h2>
                <p>≈ ₹414 per cancelled booking</p>
            </article>
        </main>
    )
}