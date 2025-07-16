"use client";

import React, { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
    /** Array of words to cycle through in the animation */
    words?: string[];
    /** Time in milliseconds between word transitions */
    interval?: number;
    /** Additional CSS classes to apply to the container */
    className?: string;
    /** Additional CSS classes to apply to the text */
    textClassName?: string;
    /** Duration of the transition animation in milliseconds */
    animationDuration?: number;
}

export function ContainerTextFlip({
    words = ["better", "modern", "beautiful", "awesome"],
    interval = 3000,
    className,
    textClassName,
    animationDuration = 700,
}: ContainerTextFlipProps) {
    const id = useId();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [width, setWidth] = useState(100);
    const textRef = React.useRef<HTMLDivElement>(null);

    const updateWidthForWord = () => {
        if (textRef.current) {
            // Add some padding to the text width
            const textWidth = textRef.current.scrollWidth + 30;
            setWidth(textWidth);
        }
    };

    useEffect(() => {
        updateWidthForWord();
    }, [currentWordIndex]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, interval);

        return () => clearInterval(intervalId);
    }, [words, interval]);

    return (
        <motion.div
            layout
            layoutId={`words-here-${id}`}
            animate={{ width }}
            transition={{ duration: animationDuration / 2000 }}
            className={cn(
                "relative inline-block rounded-lg pt-2 pb-3 text-center text-2xl font-bold text-white md:text-4xl",
                "bg-gradient-to-b from-indigo-500/20 to-rose-500/20",
                "shadow-[inset_0_-1px_rgba(99,102,241,0.3),inset_0_0_0_1px_rgba(99,102,241,0.2),_0_4px_8px_rgba(0,0,0,0.3)]",
                "border border-white/10",
                className
            )}
            key={words[currentWordIndex]}
        >
            <motion.div
                transition={{
                    duration: animationDuration / 1000,
                    ease: "easeInOut",
                }}
                className={cn("inline-block", textClassName)}
                ref={textRef}
                layoutId={`word-div-${words[currentWordIndex]}-${id}`}
            >
                <motion.div className="inline-block">
                    {words[currentWordIndex].split("").map((letter, index) => (
                        <motion.span
                            key={index}
                            initial={{
                                opacity: 0,
                                filter: "blur(10px)",
                            }}
                            animate={{
                                opacity: 1,
                                filter: "blur(0px)",
                            }}
                            transition={{
                                delay: index * 0.02,
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}