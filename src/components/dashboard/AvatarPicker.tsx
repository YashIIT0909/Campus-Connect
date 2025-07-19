import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPortal } from 'react-dom';

// Avatar options with various colors and gradients
const avatarOptions = [
    { id: 1, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_34.png' },
    { id: 2, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_23.png' },
    { id: 3, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_16.png' },
    { id: 4, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_35.png' },
    { id: 5, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_24.png' },
    { id: 6, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_19.png' },
    { id: 7, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_30.png' },
    { id: 8, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_31.png' },
    { id: 9, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_5.png' },
    { id: 10, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_2.png' },
    { id: 11, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_7.png' },
    { id: 12, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_32.png' },
    { id: 13, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_5.png' },
    { id: 14, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_3.png' },
    { id: 15, url: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/memo_9.png' }
];

interface AvatarPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (avatar: typeof avatarOptions[0]) => void;
    currentInitials: string;
}

export default function AvatarPicker({ isOpen, onClose, onSelect, currentInitials }: AvatarPickerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <>
            {/* Overlay to capture clicks outside */}
            <div className="fixed inset-0 z-10" onClick={onClose} />

            {/* Avatar picker panel */}
            <div
                className="fixed top-20 right-10 z-[9001] w-[90%] max-w-md bg-neutral-800 rounded-lg p-6 shadow-xl border border-neutral-700 overflow-y-auto max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Choose an Avatar</h3>
                    <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {avatarOptions.map((avatar) => (
                        <button
                            key={avatar.id}
                            onClick={() => onSelect(avatar)}
                            className="group flex flex-col items-center"
                        >
                            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-neutral-700 border-2 border-transparent group-hover:border-white/50 transition-all">
                                <img
                                    src={avatar.url}
                                    alt={`Avatar ${avatar.id}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>, document.body
    );
}