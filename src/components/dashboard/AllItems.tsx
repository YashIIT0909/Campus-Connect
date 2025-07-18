"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, Clock, User, Tag, Mail } from 'lucide-react';
import { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent } from '@/components/ui/reveal-on-hover';
import { ItemCarousel } from '@/components/ui/item-carousel';

const mockItems = [
    {
        id: 1,
        title: 'iPhone 13 Pro',
        description: 'Blue iPhone 13 Pro with a black case. Lost near the library entrance.',
        category: 'Electronics',
        location: 'Main Library',
        date: '2024-01-15',
        time: '14:30',
        status: 'lost',
        image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300',
        postedBy: 'Sarah Wilson',
        contactEmail: 'sarah.wilson@university.edu'
    },
    {
        id: 2,
        title: 'Red Backpack',
        description: 'Found a red Jansport backpack in the cafeteria. Contains textbooks and a laptop.',
        category: 'Bags',
        location: 'Student Cafeteria',
        date: '2024-01-14',
        time: '12:15',
        status: 'found',
        image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=300',
        postedBy: 'Mike Chen',
        contactEmail: 'mike.chen@university.edu'
    },
    {
        id: 3,
        title: 'Silver Water Bottle',
        description: 'Stainless steel water bottle with university logo. Found in the gym.',
        category: 'Personal Items',
        location: 'Campus Gym',
        date: '2024-01-13',
        time: '18:45',
        status: 'found',
        image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=300',
        postedBy: 'Emma Davis',
        contactEmail: 'emma.davis@university.edu'
    },
    {
        id: 4,
        title: 'Black Wallet',
        description: 'Lost my black leather wallet somewhere between the parking lot and dormitory.',
        category: 'Personal Items',
        location: 'Campus Parking',
        date: '2024-01-12',
        time: '09:20',
        status: 'lost',
        image: 'https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&w=300',
        postedBy: 'James Rodriguez',
        contactEmail: 'james.rodriguez@university.edu'
    },
    {
        id: 5,
        title: 'MacBook Pro',
        description: 'Silver MacBook Pro 13-inch with university stickers. Lost in computer lab.',
        category: 'Electronics',
        location: 'Computer Lab',
        date: '2024-01-11',
        time: '16:20',
        status: 'lost',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300',
        postedBy: 'Lisa Park',
        contactEmail: 'lisa.park@university.edu'
    },
    {
        id: 6,
        title: 'Blue Headphones',
        description: 'Sony wireless headphones found in the study hall.',
        category: 'Electronics',
        location: 'Study Hall',
        date: '2024-01-10',
        time: '11:30',
        status: 'found',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300',
        postedBy: 'Tom Wilson',
        contactEmail: 'tom.wilson@university.edu'
    }
];

export default function AllItems() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [locationFilter, setLocationFilter] = useState('all');

    const filteredItems = mockItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        const matchesLocation = locationFilter === 'all' || item.location === locationFilter;

        return matchesSearch && matchesStatus && matchesCategory && matchesLocation;
    });

    // Create card elements for the carousel
    const itemCards = filteredItems.map((item) => (
        <CardHoverReveal
            key={item.id}
            className="w-full h-full aspect-square shadow-xl border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm"
        >
            <CardHoverRevealMain>
                <img
                    alt={item.title}
                    src={item.image}
                    className="w-full h-full aspect-square object-cover rounded-xl"
                />
            </CardHoverRevealMain>
            <CardHoverRevealContent className="space-y-4 rounded-2xl bg-[rgba(0,0,0,.7)] backdrop-blur-3xl p-6">
                <div className="space-y-2">
                    <h3 className="text-sm text-white/80">Status</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge
                            className={`capitalize rounded-full ${item.status === 'lost'
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-emerald-500 hover:bg-emerald-600'
                                }`}
                        >
                            {item.status}
                        </Badge>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-sm text-white/80">Details</h3>
                    <div className="flex flex-wrap gap-2">
                        <Badge className="capitalize rounded-full" variant="secondary">
                            {item.category}
                        </Badge>
                        <Badge className="capitalize rounded-full" variant="secondary">
                            <MapPin className="w-3 h-3 mr-1" />
                            {item.location}
                        </Badge>
                    </div>
                </div>

                <div className="space-y-2 mt-2">
                    <h3 className="text-white capitalize font-medium text-lg">
                        {item.title}
                    </h3>
                    <p className="text-white/80 text-sm">{item.description}</p>

                    <div className="flex items-center gap-2 text-sm text-white/60 mt-3">
                        <Clock className="w-4 h-4" />
                        <span>{item.date} at {item.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-white/60">
                        <User className="w-4 h-4" />
                        <span>Posted by {item.postedBy}</span>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Mail className="w-4 h-4 mr-2" />
                            Contact
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                            Details
                        </Button>
                    </div>
                </div>
            </CardHoverRevealContent>
        </CardHoverReveal>
    ));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">All Items</h1>
                    <p className="text-white/70">Browse all lost and found items on campus</p>
                </div>
                <div className="text-sm text-white/70">
                    {filteredItems.length} of {mockItems.length} items
                </div>
            </div>

            {/* Search and Filters */}
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                        <Filter className="w-5 h-5" />
                        Search & Filter
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                            <Input
                                placeholder="Search items..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-white/5 border-white/20 text-white focus:bg-white/10"
                            />
                        </div>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800/90 border-white/20 text-white">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="lost">Lost Items</SelectItem>
                                <SelectItem value="found">Found Items</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800/90 border-white/20 text-white">
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Bags">Bags</SelectItem>
                                <SelectItem value="Personal Items">Personal Items</SelectItem>
                                <SelectItem value="Books">Books</SelectItem>
                                <SelectItem value="Clothing">Clothing</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={locationFilter} onValueChange={setLocationFilter}>
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                                <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent className="bg-neutral-800/90 border-white/20 text-white">
                                <SelectItem value="all">All Locations</SelectItem>
                                <SelectItem value="Main Library">Main Library</SelectItem>
                                <SelectItem value="Student Cafeteria">Student Cafeteria</SelectItem>
                                <SelectItem value="Campus Gym">Campus Gym</SelectItem>
                                <SelectItem value="Campus Parking">Campus Parking</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Items Carousel */}
            <div className="h-[500px]">
                {filteredItems.length > 0 ? (
                    <ItemCarousel
                        autoplayDelay={5000}
                        showPagination={true}
                        showNavigation={true}
                    >
                        {itemCards}
                    </ItemCarousel>
                ) : (
                    <div className="text-center py-12 h-full flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-white/40" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No items found</h3>
                        <p className="text-white/70">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}