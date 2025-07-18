import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

// --- Internal Types and Defaults ---

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>;
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" /></svg>;
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>;

type NavItem = {
    id: string | number;
    icon: React.ReactElement<any>;
    label?: string;
    onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
    { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
    { id: 'default-explore', icon: <DefaultCompassIcon />, label: 'Explore' },
    { id: 'default-notifications', icon: <DefaultBellIcon />, label: 'Notifications' },
];

type LimelightNavProps = {
    items?: NavItem[];
    defaultActiveIndex?: number;
    onTabChange?: (index: number) => void;
    className?: string;
    limelightClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
    limelightColor?: string;
};

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
    items = defaultNavItems,
    defaultActiveIndex = 0,
    onTabChange,
    className,
    limelightClassName,
    iconContainerClassName,
    iconClassName,
    limelightColor = "rgba(168, 85, 247, 0.9)" // Default to purple color
}: LimelightNavProps) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [isReady, setIsReady] = useState(false);
    const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const limelightRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (items.length === 0) return;

        const limelight = limelightRef.current;
        const activeItem = navItemRefs.current[activeIndex];

        if (limelight && activeItem) {
            const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
            limelight.style.left = `${newLeft}px`;

            if (!isReady) {
                setTimeout(() => setIsReady(true), 50);
            }
        }
    }, [activeIndex, isReady, items]);

    if (items.length === 0) {
        return null;
    }

    const handleItemClick = (index: number, itemOnClick?: () => void) => {
        setActiveIndex(index);
        onTabChange?.(index);
        itemOnClick?.();
    };

    return (
        <nav className={`relative inline-flex items-center h-16 rounded-lg bg-card text-foreground justify-center border px-2 ${className}`}>
            {items.map(({ id, icon, label, onClick }, index) => (
                <a
                    key={id}
                    ref={el => { navItemRefs.current[index] = el; }}
                    className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-5 ${iconContainerClassName}`}
                    onClick={() => handleItemClick(index, onClick)}
                    aria-label={label}
                >
                    {cloneElement(icon, {
                        className: `w-6 h-6 transition-all duration-200 ease-in-out ${activeIndex === index
                            ? 'opacity-100 text-purple-400 scale-110'
                            : 'opacity-60'
                            } ${(icon as React.ReactElement<any>).props.className || ''} ${iconClassName || ''}`,
                    })}

                    {/* Optional tooltip for label */}
                    {label && (
                        <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none ${activeIndex === index ? 'opacity-100' : 'opacity-0'
                            }`}>
                            {label}
                        </span>
                    )}
                </a>
            ))}

            {/* Custom limelight effect with explicit colors */}
            <div
                ref={limelightRef}
                className={`absolute top-0 z-10 w-12 h-[5px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ${isReady ? 'transition-[left] duration-300 ease-in-out' : ''
                    } ${limelightClassName}`}
                style={{
                    left: '-999px',
                    boxShadow: `0 30px 20px ${limelightColor}`
                }}
            >
                {/* Enhanced glow effect */}
                <div
                    className="absolute left-[-30%] top-[5px] w-[160%] h-14 pointer-events-none"
                    style={{
                        clipPath: 'polygon(5% 100%, 25% 0, 75% 0, 95% 100%)',
                        background: 'linear-gradient(to bottom, rgba(168, 85, 247, 0.3), transparent)'
                    }}
                />
            </div>
        </nav>
    );
}

export type { NavItem };