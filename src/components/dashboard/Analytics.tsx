"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, MapPin, Clock } from 'lucide-react';

export default function Analytics() {
    const stats = [
        { title: 'Total Items', value: '156', trend: '+12%', icon: TrendingUp },
        { title: 'Active Users', value: '89', trend: '+8%', icon: Users },
        { title: 'Success Rate', value: '67%', trend: '+3%', icon: TrendingUp },
        { title: 'Avg. Resolution Time', value: '2.3 days', trend: '-15%', icon: Clock }
    ];

    const topLocations = [
        { name: 'Main Library', count: 34, percentage: 22 },
        { name: 'Student Cafeteria', count: 28, percentage: 18 },
        { name: 'Campus Gym', count: 21, percentage: 13 },
        { name: 'Dormitory Common Area', count: 18, percentage: 12 },
        { name: 'Computer Lab', count: 15, percentage: 10 }
    ];

    const categoryData = [
        { name: 'Electronics', count: 45, color: 'bg-blue-500/80' },
        { name: 'Personal Items', count: 38, color: 'bg-green-500/80' },
        { name: 'Bags', count: 29, color: 'bg-yellow-500/80' },
        { name: 'Books', count: 23, color: 'bg-purple-500/80' },
        { name: 'Clothing', count: 21, color: 'bg-pink-500/80' }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Analytics</h1>
                <p className="text-white/70">Campus lost and found statistics and insights</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-white/80">{stat.title}</p>
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    <p className="text-sm text-emerald-400">{stat.trend} from last month</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-600/80 rounded-xl flex items-center justify-center">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Locations */}
                <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <MapPin className="w-5 h-5" />
                            Top Locations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topLocations.map((location) => (
                                <div key={location.name} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-white">{location.name}</span>
                                            <span className="text-sm text-white/70">{location.count} items</span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-2">
                                            <div
                                                className="bg-emerald-600/80 h-2 rounded-full"
                                                style={{ width: `${location.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-white">Category Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {categoryData.map((category) => (
                                <div key={category.name} className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded ${category.color}`} />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-white">{category.name}</span>
                                            <span className="text-sm text-white/70">{category.count} items</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Trends */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-white">Recent Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-emerald-600/20 backdrop-blur-sm rounded-xl border border-emerald-600/30">
                            <h3 className="font-semibold text-emerald-400 mb-2">Most Active Day</h3>
                            <p className="text-2xl font-bold text-white">Monday</p>
                            <p className="text-sm text-emerald-300">24 items reported</p>
                        </div>
                        <div className="text-center p-4 bg-blue-600/20 backdrop-blur-sm rounded-xl border border-blue-600/30">
                            <h3 className="font-semibold text-blue-400 mb-2">Peak Hours</h3>
                            <p className="text-2xl font-bold text-white">2-4 PM</p>
                            <p className="text-sm text-blue-300">Highest activity</p>
                        </div>
                        <div className="text-center p-4 bg-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-600/30">
                            <h3 className="font-semibold text-purple-400 mb-2">Success Rate</h3>
                            <p className="text-2xl font-bold text-white">67%</p>
                            <p className="text-sm text-purple-300">Items reunited</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}