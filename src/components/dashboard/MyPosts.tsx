"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import ItemCard from './ItemCard';
import EmptyState from './EmptyState';

const userPosts = [
    {
        id: 1,
        title: 'iPhone 13 Pro',
        description: 'Blue iPhone 13 Pro with a black case. Lost near the library entrance.',
        category: 'Electronics',
        location: 'Main Library',
        date: '2024-01-15',
        time: '14:30',
        status: 'lost' as const,
        image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300',
        postedBy: 'Alex Johnson',
        contactEmail: 'alex.johnson@university.edu'
    },
    {
        id: 2,
        title: 'Blue Water Bottle',
        description: 'Found a blue water bottle in the cafeteria. Has a university sticker.',
        category: 'Personal Items',
        location: 'Student Cafeteria',
        date: '2024-01-14',
        time: '12:15',
        status: 'found' as const,
        image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=300',
        postedBy: 'Alex Johnson',
        contactEmail: 'alex.johnson@university.edu'
    }
];

export default function MyPosts() {
    const [posts] = useState(userPosts);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">My Posts</h1>
                    <p className="text-slate-500">Manage your lost and found item listings</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Posts</p>
                                <p className="text-2xl font-bold text-slate-800">{posts.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Lost Items</p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {posts.filter(p => p.status === 'lost').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Found Items</p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {posts.filter(p => p.status === 'found').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Posts */}
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="relative">
                            <ItemCard item={post} />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white border border-slate-200">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" className="bg-red-100 hover:bg-red-200 text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="No posts yet"
                    description="You haven't posted any lost or found items yet. Start by creating your first post!"
                    action={
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Your First Post
                        </Button>
                    }
                />
            )}
        </div>
    );
}