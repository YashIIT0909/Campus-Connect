"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Mail, Bell, TrendingUp, Package, Clock, MapPin } from 'lucide-react';
import StatCard from './StatCard';
import EmptyState from './EmptyState';

export default function PersonalDashboard() {
    const [user] = useState({
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        avatar: '/api/placeholder/40/40'
    });

    const [stats] = useState({
        totalPosts: 3,
        itemsFound: 1,
        itemsLost: 2,
        pendingReturns: 0
    });

    const [recentActivity] = useState([
        {
            id: 1,
            type: 'lost',
            title: 'iPhone 13 Pro',
            location: 'Library - 2nd Floor',
            time: '2 hours ago',
            status: 'active'
        },
        {
            id: 2,
            type: 'found',
            title: 'Blue Water Bottle',
            location: 'Cafeteria',
            time: '5 hours ago',
            status: 'returned'
        }
    ]);

    const hasActivity = recentActivity.length > 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-neutral-400">Plan, prioritize, and accomplish your tasks with ease.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Posts"
                    value={stats.totalPosts}
                    icon={Package}
                    color="bg-gradient-to-r from-purple-500 to-pink-500"
                    trend="+2 this week"
                />
                <StatCard
                    title="Items Found"
                    value={stats.itemsFound}
                    icon={Search}
                    color="bg-gradient-to-r from-blue-500 to-cyan-500"
                    trend="1 returned"
                />
                <StatCard
                    title="Items Lost"
                    value={stats.itemsLost}
                    icon={Clock}
                    color="bg-gradient-to-r from-orange-500 to-red-500"
                    trend="2 active"
                />
                <StatCard
                    title="Pending Returns"
                    value={stats.pendingReturns}
                    icon={TrendingUp}
                    color="bg-gradient-to-r from-green-500 to-emerald-500"
                    trend="All resolved"
                />
            </div>

            {/* Recent Activity */}
            <Card className="bg-neutral-800/50 border-neutral-700/50 shadow-sm backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Clock className="w-5 h-5" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {hasActivity ? (
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-xl border border-neutral-600/30">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${activity.type === 'lost' ? 'bg-red-500' : 'bg-emerald-500'
                                            }`} />
                                        <div>
                                            <h4 className="font-medium text-white">{activity.title}</h4>
                                            <div className="flex items-center gap-2 text-sm text-neutral-400">
                                                <MapPin className="w-3 h-3" />
                                                {activity.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-neutral-400">{activity.time}</p>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${activity.status === 'active'
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-neutral-700 text-neutral-300'
                                            }`}>
                                            {activity.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No recent activity"
                            description="Your recent posts and interactions will appear here"
                            action={
                                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Report Your First Item
                                </Button>
                            }
                        />
                    )}
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-neutral-800/50 border-neutral-700/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Search className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-white mb-2">Report Lost Item</h3>
                        <p className="text-sm text-neutral-400">Can't find something? Let the community help you</p>
                    </CardContent>
                </Card>

                <Card className="bg-neutral-800/50 border-neutral-700/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-white mb-2">Report Found Item</h3>
                        <p className="text-sm text-neutral-400">Found something? Help return it to its owner</p>
                    </CardContent>
                </Card>

                <Card className="bg-neutral-800/50 border-neutral-700/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-white mb-2">Manage Alerts</h3>
                        <p className="text-sm text-neutral-400">Set up notifications for specific items</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}