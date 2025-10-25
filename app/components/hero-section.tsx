"use client";

import { useState, useEffect, useRef } from "react";

export default function HeroSection() {
    const [showAltText, setShowAltText] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [previousTextIndex, setPreviousTextIndex] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const cleanupTimerRef = useRef<NodeJS.Timeout | null>(null);

    const rotatingTexts = [
        "developing life as a developer",
        "comparison is the thief of joy",
        "everything is cringe",
        "until you win",
        "code your idea",
        "fuck imposter syndrome",
        "do it, now",
    ];

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
            // 이전 cleanup 타이머가 있다면 명시적으로 제거
            if (cleanupTimerRef.current) {
                clearTimeout(cleanupTimerRef.current);
            }

            setCurrentTextIndex((prevIndex) => {
                setPreviousTextIndex(prevIndex);
                setIsTransitioning(true);
                return (prevIndex + 1) % rotatingTexts.length;
            });

            cleanupTimerRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setPreviousTextIndex(null);
            }, 600);
        }, 3000);

        return () => {
            clearInterval(interval);
            if (cleanupTimerRef.current) {
                clearTimeout(cleanupTimerRef.current);
            }
        };
    }, []);

    return (
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center gap-4">
            <h3 className="font-medium text-4xl">안녕하세요</h3>
            <h2
                className={`font-medium text-5xl transition-opacity duration-500 ${
                    isFading ? "opacity-0" : "opacity-100"
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {showAltText ? "Lucas Lee, Backend Developer" : "개발자 이창민 입니다."}
            </h2>
            <div className="overflow-hidden relative mt-4 min-h-[2rem] w-screen">
                {isTransitioning && previousTextIndex !== null && (
                    <p
                        key={`previous-${previousTextIndex}`}
                        className="text-xl absolute top-0 left-1/2 -translate-x-1/2 w-full animate-slide-out whitespace-nowrap"
                    >
                        {rotatingTexts[previousTextIndex]}
                    </p>
                )}
                <p
                    key={`current-${currentTextIndex}`}
                    className={`text-xl whitespace-nowrap ${
                        isTransitioning ? "animate-slide-in" : ""
                    }`}
                >
                    {rotatingTexts[currentTextIndex]}
                </p>
            </div>
        </section>
    );
}
