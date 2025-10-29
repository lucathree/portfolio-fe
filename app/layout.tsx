import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, Noto_Sans_KR } from "next/font/google";
import Header from "./components/Header";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "./globals.css";

const ibmPlexSansKR = IBM_Plex_Sans_KR({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-sans-kr",
});

const notoSansKR = Noto_Sans_KR({
    weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
    title: "Lucathree.com",
    description: "Personal website of Changmin Lucas Lee",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${ibmPlexSansKR.variable} ${notoSansKR.variable} text-complementary`}>
                <Header />
                <main className="pt-8">{children}</main>
            </body>
        </html>
    );
}
