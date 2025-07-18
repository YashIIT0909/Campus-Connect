"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, User, Mail, Tag } from 'lucide-react';

interface ItemCardProps {
    item: {
        id: number;
        title: string;
        description: string;
        category: string;
        location: string;
        date: string;
        time: string;
        status: 'lost' | 'found';
        image: string;
        postedBy: string;
        contactEmail: string;
    };
}

export default function ItemCard({ item }: ItemCardProps) {
    return (
        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <div className="aspect-video relative overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                    <Badge
                        variant={item.status === 'lost' ? 'destructive' : 'default'}
                        className={item.status === 'lost'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }
                    >
                        {item.status.toUpperCase()}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg text-slate-800">{item.title}</h3>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Tag className="w-4 h-4" />
                            <span>{item.category}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin className="w-4 h-4" />
                            <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock className="w-4 h-4" />
                            <span>{item.date} at {item.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <User className="w-4 h-4" />
                            <span>Posted by {item.postedBy}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Mail className="w-4 h-4 mr-2" />
                            Contact
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-slate-200 hover:bg-slate-50">
                            View Details
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}