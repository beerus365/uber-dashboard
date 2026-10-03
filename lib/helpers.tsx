import getCSVData from '@/lib/dataset';

export type BookingRows = Awaited<ReturnType<typeof getCSVData>>

export type DashboardSearchParams = {
  from?: string | string[]
  to?: string | string[]
  zone?: string | string[]
  vehicle?: string | string[]
}

export type DashboardFilters = {
  from: string
  to: string
  zone: string
  vehicle: string
}

export function normalizeDashboardFilters(params: DashboardSearchParams): DashboardFilters {
  const stringValue = (value: string | string[] | undefined) =>
    typeof value === "string" ? value : ""
  const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ""

  return {
    from: validDate(stringValue(params.from)) || "2024-01-01",
    to: validDate(stringValue(params.to)) || "2024-12-30",
    zone: stringValue(params.zone) || "all",
    vehicle: stringValue(params.vehicle) || "all",
  }
}

function toISODate(value: string): string | null {
  const [day, month, year] = value.split("/").map(Number)
  if (!month || !day || !year) return null

  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null

  return `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
}

function normalizeFilterValue(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export function filterBookings(data: BookingRows, filters: DashboardFilters): BookingRows {
  const primaryZones = new Set(["delhi", "gurgaon", "noida", "ghaziabad", "faridabad"])
  const selectedZone = normalizeFilterValue(filters.zone)
  const selectedVehicle = normalizeFilterValue(filters.vehicle)

  return data.filter((booking) => {
    if (filters.from || filters.to) {
      const bookingDate = toISODate(booking["Date"])
      if (!bookingDate || (filters.from && bookingDate < filters.from) || (filters.to && bookingDate > filters.to)) {
        return false
      }
    }

    const zone = normalizeFilterValue(booking["pickup_zone"] ?? "")
    if (selectedZone && selectedZone !== "all") {
      if (selectedZone === "otherncrtowns") {
        if (!zone || primaryZones.has(zone)) return false
      } else if (zone !== selectedZone) {
        return false
      }
    }

    const vehicle = normalizeFilterValue(booking["Vehicle Type"] ?? "")
    if (selectedVehicle && selectedVehicle !== "all" && vehicle !== selectedVehicle) return false

    return true
  })
}

export async function getFilteredDashboardData(searchParams: Promise<DashboardSearchParams>) {
  const [data, params] = await Promise.all([getCSVData(), searchParams])
  const filters = normalizeDashboardFilters(params)
  return { data: filterBookings(data, filters), filters }
}

export function getData(data: BookingRows): number {
    const totalBookings = data.length;
    return totalBookings;
}

export function getCancellationRate(data: BookingRows): number {
    const totalBookings = data.length;
    const cancelledBookings = data.filter(
        (b) => b['Booking Status'] === 'Cancelled by Driver').length;
    const cancellationRate = totalBookings === 0 ? 0 : (cancelledBookings / totalBookings) * 100;
    return Number(cancellationRate.toFixed(1));
}

export function getBookingFullfilmentRate(data: BookingRows): number {
    const totalBookings = data.length;
    const completedBookings = data.filter(
        (b) => b['Booking Status'] === 'Completed').length;
    const bookingFullfilmentRate = totalBookings === 0 ? 0 : (completedBookings / totalBookings) * 100;
    return Number(bookingFullfilmentRate.toFixed(1));
}

export function getNoDriverFoundRate(data: BookingRows): number {
    const noDriverFoundBookings = data.filter(
        (b) => b['Booking Status'] === 'No Driver Found').length;
    return data.length === 0 ? 0 : Number(((noDriverFoundBookings / data.length) * 100).toFixed(1));
}

export function getAvgPickupWaitTime(data: BookingRows): number {
  const values = data
    .map((b) => parseFloat(b['Avg VTAT']))
    .filter((v) => !Number.isNaN(v));

  if (values.length === 0) return 0;

  const total = values.reduce((sum, v) => sum + v, 0);
  return Number((total / values.length).toFixed(1));
}

export function getRevenueLeakage(data: BookingRows): number {
    const cancelledBookings = data.filter(
        (b) => b['Booking Status'] === 'Cancelled by Driver');
    const revenueLeakage = cancelledBookings.length * 414;
    return revenueLeakage;
}

export function getBookingOutcomesCounts(data: Awaited<ReturnType<typeof getCSVData>>) {
  const completed = data.filter(
    (b) => b["Booking Status"] === "Completed"
  ).length
  const driverCancelled = data.filter(
    (b) => b["Booking Status"] === "Cancelled by Driver"
  ).length
  const customerCancelled = data.filter(
    (b) => b["Booking Status"] === "Cancelled by Customer"
  ).length
  const noDriver = data.filter(
    (b) => b["Booking Status"] === "No Driver Found"
  ).length
  const incomplete = data.filter(
    (b) => b["Booking Status"] === "Incomplete"
  ).length
  return [completed, driverCancelled, customerCancelled, noDriver, incomplete]
}

export function getCancellationbyPickupZoneCounts(data: Awaited<ReturnType<typeof getCSVData>>) {
  const counts: Record<string, number> = {}

  data.forEach((booking) => {
    const zone = booking["pickup_zone"]
    if (!zone) return

    counts[zone] ??= 0
    if (booking["Booking Status"] === "Cancelled by Driver") {
      counts[zone] += 1
    }
  })

  return counts
}

export function getCancellationbyHourCounts(data: Awaited<ReturnType<typeof getCSVData>>) {
    const totals = Array.from({ length: 24 }, () => 0)
    const cancellations = Array.from({ length: 24 }, () => 0)

    data.forEach((booking) => {
      const hour = Number(booking["hour"])
      if (!Number.isInteger(hour) || hour < 0 || hour > 23) return

      totals[hour] += 1
      if (booking["Booking Status"] === "Cancelled by Driver") {
        cancellations[hour] += 1
      }
    })

    return totals.map((total, hour) => ({
      hour,
      rate: total === 0 ? 0 : Number(((cancellations[hour] / total) * 100).toFixed(2)),
    }))
}

export function getPickupWaitBandCounts(data: Awaited<ReturnType<typeof getCSVData>>) {
  const bands = [
    { label: "0-5 min", min: 0, max: 5 },
    { label: "5-10 min", min: 5, max: 10 },
    { label: "10-15 min", min: 10, max: 15 },
    { label: "15-20 min", min: 15, max: 20 },
    { label: "20-25 min", min: 20, max: 25 },
    { label: "25+ min", min: 25, max: Infinity },
  ]

    const counts: Record<string, { total: number; cancelled: number }> = {}

    bands.forEach((band) => {
        counts[band.label] = { total: 0, cancelled: 0 }
    })

    data.forEach((booking) => {
        const waitTime = parseFloat(booking["Avg VTAT"])
        if (isNaN(waitTime)) return

        const band = bands.find((b) => waitTime >= b.min && waitTime < b.max)
        if (!band) return

        counts[band.label].total += 1
        if (booking["Booking Status"] === "Cancelled by Driver") {
            counts[band.label].cancelled += 1
        }
    })

    return Object.entries(counts).map(([label, { total, cancelled }]) => ({
        band: label,
        rate: total === 0 ? 0 : Number(((cancelled / total) * 100).toFixed(2)),
    }))
}

export function getCompleteBookingPickUpWait(data: Awaited<ReturnType<typeof getCSVData>>) {
    const completeBookings = data.filter(
        (b) => b['Booking Status'] === 'Completed');
  const waitTimes = completeBookings.map((booking) => parseFloat(booking['Avg VTAT'])).filter(Number.isFinite);
  const totalWaitTime = waitTimes.reduce((sum, waitTime) => sum + waitTime, 0);
  const avgWaitTime = waitTimes.length === 0 ? 0 : totalWaitTime / waitTimes.length;
    return Number(avgWaitTime.toFixed(1));
}

export function getCancelledBookingPickUpWait(data: Awaited<ReturnType<typeof getCSVData>>) {
    const cancelledBookings = data.filter(
        (b) => b['Booking Status'] === 'Cancelled by Driver');
  const waitTimes = cancelledBookings.map((booking) => parseFloat(booking['Avg VTAT'])).filter(Number.isFinite);
  const totalWaitTime = waitTimes.reduce((sum, waitTime) => sum + waitTime, 0);
  const avgWaitTime = waitTimes.length === 0 ? 0 : totalWaitTime / waitTimes.length;
    return Number(avgWaitTime.toFixed(1));
}

export function getCancelledCompletedDifference(data: Awaited<ReturnType<typeof getCSVData>>) {
    const completeBookingAvgWait = getCompleteBookingPickUpWait(data);
    const cancelledBookingAvgWait = getCancelledBookingPickUpWait(data);
    const difference = cancelledBookingAvgWait - completeBookingAvgWait;
    return Number(difference.toFixed(1));
}

export function getRevenueLeakageZoneCounts(data: Awaited<ReturnType<typeof getCSVData>>) {
    const delhi = data.filter(
        (b) => b['pickup_zone'] === 'Delhi' && b['Booking Status'] === 'Cancelled by Driver').length;
    const gurgaon = data.filter(
        (b) => b['pickup_zone'] === 'Gurgaon' && b['Booking Status'] === 'Cancelled by Driver').length;
    const noida = data.filter(
        (b) => b['pickup_zone'] === 'Noida' && b['Booking Status'] === 'Cancelled by Driver').length;
    const faridabad = data.filter(
        (b) => b['pickup_zone'] === 'Faridabad' && b['Booking Status'] === 'Cancelled by Driver').length;
    const ghaziabad = data.filter(
        (b) => b['pickup_zone'] === 'Ghaziabad' && b['Booking Status'] === 'Cancelled by Driver').length;
    const other = data.filter(
        (b) => !['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'].includes(b['pickup_zone']) && b['Booking Status'] === 'Cancelled by Driver').length;

    return {
        delhi,
        gurgaon,
        noida,
        faridabad,
        ghaziabad,
        other
    };
}