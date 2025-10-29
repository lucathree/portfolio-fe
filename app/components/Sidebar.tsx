"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
    label: string;
    href: string;
    icon?: string;
}

const menuItems: MenuItem[] = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Works", href: "/works", icon: "🧑‍💻" },
    { label: "Blog", href: "/blog", icon: "🗒️" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-14 ml-8 mt-10 w-48 p-4 rounded-2xl bg-accent shadow-lg shadow-black/30">
            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center rounded-2xl py-2 transition-colors ${
                                isActive
                                    ? "bg-secondary text-highlight"
                                    : "text-complementary hover:bg-secondary"
                            }`}
                        >
                            <span className="text-xl pl-5 pr-3">{item.icon}</span>
                            <span className="font-semibold text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
