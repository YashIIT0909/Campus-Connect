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
import AvatarPicker from './AvatarPicker';

export default function TopBar() {
    const [user, setUser] = useState({
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        avatar: {
            id: 1,
            url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
        }
    });

    const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
    const userInitials = user.name.split(' ').map(n => n[0]).join('');

    const handleAvatarSelect = (selectedAvatar: { id: number, url: string }) => {
        setUser({
            ...user,
            avatar: selectedAvatar
        });
        setIsAvatarPickerOpen(false);
    };

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


                <div
                    className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shadow-sm cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsAvatarPickerOpen(true);
                    }}
                >
                    {user.avatar.url ? (
                        <img
                            src={user.avatar.url}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-white font-medium text-sm">
                            {userInitials}
                        </span>
                    )}
                </div>


                {/* User Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-3 p-2 hover:bg-neutral-800/50">
                            {/* Use a separate div that wraps the avatar to handle the avatar picker */}

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

            {/* Avatar Picker Modal */}
            <AvatarPicker
                isOpen={isAvatarPickerOpen}
                onClose={() => setIsAvatarPickerOpen(false)}
                onSelect={handleAvatarSelect}
                currentInitials={userInitials}
            />
        </div>
    );
}