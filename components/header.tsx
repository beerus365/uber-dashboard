'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();
    const navItems = [
        { href: "/", label: "Overview" },
        { href: "/cancel", label: "Cancellations" },
        { href: "/wait", label: "Wait Time" },
        { href: "/revenue_impact", label: "Revenue Impact" },
    ];

    return(
        <div className="group fixed top-0 left-0 z-50 h-4 w-full">
            <header className="absolute top-4 left-0 flex w-full -translate-y-[calc(100%+1rem)] justify-center transition-transform duration-300 ease-out group-hover:translate-y-0">
                <div className="bg-[var(--foreground1)] mx-4 flex w-[calc(100%-2rem)] flex-row items-center justify-around gap-4 rounded-lg border-1 border-[#35383b] py-2 sm:w-1/2 sm:gap-12"> 
                    <nav className="flex flex-row flex-wrap justify-center gap-2">
                        {navItems.map(({ href, label }) => {
                            const isActive = pathname === href;

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    aria-current={isActive ? "page" : undefined}
                                        className={`rounded-2xl px-4 py-1 text-sm font-semibold transition-colors hover:text-black! ${
                                        isActive
                                            ? "bg-white !text-black"
                                            : "text-[#5e5e5e] hover:bg-white"
                                    }`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </header>
        </div>

    )
}