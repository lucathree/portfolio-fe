import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Sans_KR } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

const montserrat = Montserrat({
    weight: ["400", "600", "800", "900"],
    subsets: ["latin"],
    variable: "--font-montserrat",
});

const ibmPlexSansKR = IBM_Plex_Sans_KR({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-ibm-plex-sans-kr",
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
            <body className={`${montserrat.variable} ${ibmPlexSansKR.variable} text-complementary`}>
                <Header />
                <main className="pt-16">{children}</main>
            </body>
        </html>
    );
}
