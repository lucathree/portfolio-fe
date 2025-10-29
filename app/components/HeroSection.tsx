"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const ROTATING_TEXTS = [
    "developing life as a developer",
    "comparison is the thief of joy",
    "everything is cringe, until you win",
    "code your idea",
    "get over your imposter syndrome",
    "just do it, now",
];

export default function HeroSection() {
    const [showAltText, setShowAltText] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [previousTextIndex, setPreviousTextIndex] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const cleanupTimerRef = useRef<NodeJS.Timeout | null>(null);

    const clearFadeTimer = () => {
        if (fadeTimerRef.current) {
            clearTimeout(fadeTimerRef.current);
            fadeTimerRef.current = null;
        }
    };

    const handleMouseEnter = () => {
        clearFadeTimer();
        setIsFading(true);

        fadeTimerRef.current = setTimeout(() => {
            setShowAltText(true);
            setIsFading(false);
        }, 250);
    };

    const handleMouseLeave = () => {
        clearFadeTimer();
        setIsFading(true);

        fadeTimerRef.current = setTimeout(() => {
            setShowAltText(false);
            setIsFading(false);
        }, 250);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (cleanupTimerRef.current) {
                clearTimeout(cleanupTimerRef.current);
            }

            setCurrentTextIndex((prevIndex) => {
                setPreviousTextIndex(prevIndex);
                setIsTransitioning(true);
                return (prevIndex + 1) % ROTATING_TEXTS.length;
            });

            cleanupTimerRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setPreviousTextIndex(null);
            }, 600);
        }, 7000);

        return () => {
            clearInterval(interval);
            if (cleanupTimerRef.current) {
                clearTimeout(cleanupTimerRef.current);
            }
        };
    }, []);

    return (
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center gap-4">
            <h3 className="font-ibm-plex-sans-kr font-medium text-4xl">안녕하세요</h3>
            <h2
                className={`font-ibm-plex-sans-kr font-semibold text-highlight text-5xl transition-opacity duration-500 ${
                    isFading ? "opacity-0" : "opacity-100"
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {showAltText ? "Lucas Lee, Backend Developer" : "개발자 이창민 입니다."}
            </h2>
            <div className="font-ibm-plex-sans-kr overflow-hidden relative mt-5 min-h-[2rem] w-screen">
                {isTransitioning && previousTextIndex !== null && (
                    <p
                        key={`previous-${previousTextIndex}`}
                        className="text-xl absolute top-0 left-1/2 -translate-x-1/2 w-full animate-slide-out whitespace-nowrap"
                    >
                        {ROTATING_TEXTS[previousTextIndex]}
                    </p>
                )}
                <p
                    key={`current-${currentTextIndex}`}
                    className={`text-xl whitespace-nowrap ${
                        isTransitioning ? "animate-slide-in" : ""
                    }`}
                >
                    {ROTATING_TEXTS[currentTextIndex]}
                </p>
            </div>
            <div className="flex gap-12 mt-8 font-bold">
                <Link
                    href="/works"
                    className="text-xl text-highlight border-highlight border-3 px-4 pt-1 pb-2 hover:bg-highlight hover:text-complementary transition-colors"
                >
                    works
                </Link>
                <Link
                    href="/blog"
                    className="text-xl text-highlight border-highlight border-3 px-4 pt-1 pb-2 hover:bg-highlight hover:text-complementary transition-colors"
                >
                    blog
                </Link>
            </div>
        </section>
    );
}
