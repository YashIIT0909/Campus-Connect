"use client";

import React, { useEffect, useState } from "react";
import { DivideIcon as LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface NavItem {
    name: string;
    url: string;
    icon: typeof LucideIcon;
    isButton?: boolean;
    variant?: "signin" | "signup";
}

interface NavBarProps {
    items: NavItem[];
    className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
    const [activeTab, setActiveTab] = useState(items[0].name);
    const [isMobile, setIsMobile] = useState(false);
    const [ignoreScroll, setIgnoreScroll] = useState(false); // NEW
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNavigation = (item: NavItem) => {
        setActiveTab(item.name);
        setIgnoreScroll(true); // NEW
        setTimeout(() => setIgnoreScroll(false), 600); // NEW: adjust time as needed
        if (item.url.startsWith('/')) {
            router.push(item.url);
        } else if (item.url.startsWith('#')) {
            const element = document.querySelector(item.url);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (ignoreScroll) return; // NEW: skip if ignoring scroll
            const sections = ['hero', 'features', 'about'];
            const scrollPosition = window.scrollY + 100;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        const navItem = items.find(item => item.url === `#${sectionId}`);
                        if (navItem && !navItem.isButton) {
                            setActiveTab(navItem.name);
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [items, ignoreScroll]); // NEW: add ignoreScroll to deps

    return (
        <div
            className={cn(
                "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
                className
            )}
        >
            <div className="flex items-center gap-1 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name;
                    const isButton = item.isButton;
                    const isSignIn = item.variant === 'signin';
                    const isSignUp = item.variant === 'signup';

                    if (isButton) {
                        return (
                            <motion.button
                                key={item.name}
                                onClick={() => handleNavigation(item)}
                                className={cn(
                                    "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300",
                                    isSignIn && "border border-white/20 text-white/80 hover:text-white hover:border-white/40",
                                    isSignUp && "bg-gradient-to-r from-indigo-500 to-rose-500 text-white hover:from-indigo-400 hover:to-rose-400",
                                    isActive && "bg-muted text-primary",
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="hidden md:inline">{item.name}</span>
                                <span className="md:hidden">
                                    <Icon size={18} strokeWidth={2.5} />
                                </span>

                                {/* Tubelight effect for buttons */}
                                {(isSignIn || isSignUp) && (
                                    <motion.div
                                        className={cn(
                                            "absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full",
                                            isSignIn && "bg-white/60",
                                            isSignUp && "bg-gradient-to-r from-indigo-400 to-rose-400"
                                        )}
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    >
                                        <div className={cn(
                                            "absolute w-12 h-6 rounded-full blur-md -top-2 -left-2",
                                            isSignIn && "bg-white/20",
                                            isSignUp && "bg-gradient-to-r from-indigo-400/30 to-rose-400/30"
                                        )} />
                                    </motion.div>
                                )}
                            </motion.button>
                        )
                    }

                    return (
                        <button
                            key={item.name}
                            onClick={() => handleNavigation(item)}
                            className={cn(
                                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                                "text-white/70 hover:text-white",
                                isActive && "text-white",
                            )}
                        >
                            <span className="hidden md:inline">{item.name}</span>
                            <span className="md:hidden">
                                <Icon size={18} strokeWidth={2.5} />
                            </span>
                            {isActive && (
                                <motion.div
                                    className="absolute inset-0 w-full bg-white/10 rounded-full -z-10"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-indigo-400 to-rose-400 rounded-t-full">
                                        <div className="absolute w-12 h-6 bg-indigo-400/30 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-indigo-400/30 rounded-full blur-md -top-1" />
                                        <div className="absolute w-4 h-4 bg-indigo-400/30 rounded-full blur-sm top-0 left-2" />
                                    </div>
                                </motion.div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}