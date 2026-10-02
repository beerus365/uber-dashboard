export function Intro() {
    return (
      <div className='flex flex-col gap-2 mt-10 border-b-white border-b-1 pb-8'>
        <span className='flex flex-row gap-9'>
          <h1 className='text-lg font-extrabold'>Uber India</h1>
          <h1>EXECUTIVE BI & ANALYTICS</h1>
        </span>
        <span className='flex flex-col gap-1'>
          <h1 className='font-bold text-3xl'>Decoding Demand: Uber India Driver Cancellation Rate & Revenue Leakage</h1>
          <p>Driver cancellations, pickup wait times, and estimated revenue loss across 150,000 Uber India bookings in Delhi NCR</p>
        </span>

        <span className='flex flex-row gap-10'>
          <h1><b>Scope: </b>Actual</h1>
          <h1><b>Timeline: </b>Jan 2024 - Dec 2024</h1>
          <h1><b>Data: </b>150,000</h1>
        </span>
      </div>
    )
}
export default Intro;