"use client";

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    trend: string;
}

export default function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
    return (
        <Card className="bg-neutral-800/50 border-neutral-700/50 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-neutral-400">{title}</p>
                        <p className="text-3xl font-bold text-white mt-2">{value}</p>
                        <div className="flex items-center gap-1 mt-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-neutral-400">{trend}</span>
                        </div>
                    </div>
                    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}