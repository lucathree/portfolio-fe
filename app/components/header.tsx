"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-white py-4 px-8 flex items-center">
            <Link href="/">
                <h1 className="font-montserrat font-extrabold text-black cursor-pointer hover:opacity-70 transition-opacity">
                    LUCATHREE.COM
                </h1>
            </Link>
        </header>
    );
}
