"use client";

import { Package } from 'lucide-react';

interface EmptyStateProps {
    title: string;
    description: string;
    action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
            <p className="text-neutral-400 mb-6">{description}</p>
            {action}
        </div>
    );
}