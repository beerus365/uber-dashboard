"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { DashboardFilters } from "@/lib/helpers"

export function Filter({ filters }: { filters: DashboardFilters }) {
    const pathname = usePathname()

    return (
        <div className="flex w-full justify-end mt-3">
            <form method="get" onChange={(event) => event.currentTarget.requestSubmit()} className="flex w-fit max-w-full flex-wrap items-end justify-end gap-2.5 bg-[var(--background)] px-6 py-4 text-white">
            <div className="flex flex-col gap-1">
                <label htmlFor="from-date" className="text-xs text-[#a8a8a8]">From</label>
                <input
                id="from-date"
                name="from"
                type="date"
                defaultValue={filters.from}
                className="min-w-[140px] rounded-lg border border-[#3a3a3a] bg-[#1f1f1f] px-2.5 py-2 text-sm text-white [color-scheme:dark] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#276ef1]"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="to-date" className="text-xs text-[#a8a8a8]">To</label>
                <input
                id="to-date"
                name="to"
                type="date"
                defaultValue={filters.to}
                className="min-w-[140px] rounded-lg border border-[#3a3a3a] bg-[#1f1f1f] px-2.5 py-2 text-sm text-white [color-scheme:dark] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#276ef1]"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="pickup-zone" className="text-xs text-[#a8a8a8]">Pickup zone</label>
                <select
                id="pickup-zone"
                name="zone"
                defaultValue={filters.zone}
                className="min-w-[140px] rounded-lg border border-[#3a3a3a] bg-[#1f1f1f] px-2.5 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#276ef1]"
                >
                <option value="all">All zones</option>
                <option value="delhi">Delhi</option>
                <option value="gurgaon">Gurgaon</option>
                <option value="noida">Noida</option>
                <option value="ghaziabad">Ghaziabad</option>
                <option value="faridabad">Faridabad</option>
                <option value="other-ncr-towns">Other NCR Towns</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="vehicle" className="text-xs text-[#a8a8a8]">Vehicle</label>
                <select
                id="vehicle"
                name="vehicle"
                defaultValue={filters.vehicle}
                className="min-w-[140px] rounded-lg border border-[#3a3a3a] bg-[#1f1f1f] px-2.5 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#276ef1]"
                >
                <option value="all">All vehicles</option>
                <option value="auto">Auto</option>
                <option value="bike">Bike</option>
                <option value="go-mini">Go Mini</option>
                <option value="go-sedan">Go Sedan</option>
                <option value="premier-sedan">Premier Sedan</option>
                <option value="uber-xl">Uber XL</option>
                <option value="ebike">eBike</option>
                </select>
            </div>

            <Link
                href={pathname}
                className="rounded-full border border-[#3a3a3a] px-4 py-2 text-sm font-semibold hover:bg-[#35383b]"
            >
                Reset Filters
            </Link>
            </form>
        </div>
    )
}