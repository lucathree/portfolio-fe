"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed h-14 w-full bg-complementary py-4 px-8 flex items-center z-50">
            <Link href="/" className="text-black hover:opacity-70 transition-opacity">
                <h1 className="font-ibm-plex-sans-kr font-bold text-xl">LUCATHREE.COM</h1>
            </Link>
        </header>
    );
}
