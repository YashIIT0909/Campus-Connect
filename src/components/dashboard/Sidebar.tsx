"use client";

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Search,
    FileText,
    BarChart3,
    Settings,
    HelpCircle,
    LogOut,
    Users,
    Menu,
    X
} from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
    { id: 'personal', label: 'Personal Dashboard', icon: LayoutDashboard },
    { id: 'all-items', label: 'All Items', icon: Search },
    { id: 'my-posts', label: 'My Posts', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const generalItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'logout', label: 'Logout', icon: LogOut },
];

export default function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }: SidebarProps) {
    return (
        <div className={cn(
            "flex flex-col transition-all duration-300 relative h-full",
            collapsed ? "w-16" : "w-64"
        )}>
            {/* Toggle Button */}
            <div className="absolute -right-3 top-6 z-20">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 shadow-md hover:bg-neutral-700 focus:outline-none"
                >
                    {collapsed ? (
                        <Menu className="h-4 w-4 text-neutral-300" />
                    ) : (
                        <X className="h-4 w-4 text-neutral-300" />
                    )}
                </button>
            </div>

            {/* Menu Label */}
            <div className="p-4">
                <div className={cn(
                    "transition-opacity duration-300",
                    collapsed ? "opacity-0" : "opacity-100"
                )}>
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        MENU
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group",
                                activeTab === item.id
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm"
                                    : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white hover:shadow-sm",
                                collapsed ? "justify-center px-0" : ""
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 flex-shrink-0",
                                collapsed ? "mx-auto" : ""
                            )} />
                            {!collapsed && (
                                <span className="truncate">{item.label}</span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-6 space-y-1">
                    {!collapsed && (
                        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
                            GENERAL
                        </p>
                    )}
                    {generalItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group",
                                activeTab === item.id
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm"
                                    : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white hover:shadow-sm",
                                collapsed ? "justify-center px-0" : ""
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 flex-shrink-0",
                                collapsed ? "mx-auto" : ""
                            )} />
                            {!collapsed && (
                                <span className="truncate">{item.label}</span>
                            )}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
}