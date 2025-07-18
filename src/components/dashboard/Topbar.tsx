"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

import {
    Search,
    Bell,
    Mail,
    Plus,
    Settings,
    User,
    ChevronDown,
    LogOut
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function TopBar() {
    const [user] = useState({
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        avatar: '/api/placeholder/40/40'
    });

    return (
        <div className="h-16 flex items-center justify-between px-6">
            {/* Left Section - Logo and Search */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-sm">CC</span>
                    </div>
                    <span className="text-lg font-semibold text-white hidden md:inline">Campus Connect</span>
                </div>
            </div>

            {/* Right Section - Actions and User */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="p-2">
                        <Mail className="w-4 h-4 text-neutral-400 hover:text-white" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                        <Bell className="w-4 h-4 text-neutral-400 hover:text-white" />
                    </Button>
                </div>

                {/* User Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-3 p-2 hover:bg-neutral-800/50">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-white font-medium text-sm">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            {/* Only show user info on desktop */}
                            <div className="text-left hidden md:block">
                                <div className="text-sm font-medium text-white">{user.name}</div>
                                <div className="text-xs text-neutral-400">{user.email}</div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-neutral-400 hidden md:block" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 bg-neutral-800 border-neutral-700">
                        {/* Show user info in dropdown on mobile */}
                        <div className="md:hidden p-3">
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-xs text-neutral-400">{user.email}</div>
                        </div>
                        <DropdownMenuSeparator className="md:hidden" />
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="w-4 h-4 mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="w-4 h-4 mr-2" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}