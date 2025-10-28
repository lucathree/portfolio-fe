"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed h-14 w-full bg-complementary py-4 px-8 flex items-center z-50">
            <Link
                href="/"
                className="text-black hover:opacity-70 transition-opacity"
                style={{ fontFamily: "var(--font-montserrat)", fontWeight: 800 }}
            >
                <h1>LUCATHREE.COM</h1>
            </Link>
        </header>
    );
}
