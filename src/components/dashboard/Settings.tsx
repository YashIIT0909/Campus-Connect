"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Bell, Shield, HelpCircle } from 'lucide-react';
import { hostelList } from '@/schema/signUpSchema';

export default function Settings() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-white/70">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Settings */}
                <Card className="lg:col-span-2 bg-blue-600/10 backdrop-blur-xl border border-blue-500/20 shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <User className="w-5 h-5" />
                            Profile Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName" className="text-white/80">First Name</Label>
                                <Input id="firstName" defaultValue="Alex" className="bg-white/10 border-white/20 text-white" />
                            </div>
                            <div>
                                <Label htmlFor="lastName" className="text-white/80">Last Name</Label>
                                <Input id="lastName" defaultValue="Johnson" className="bg-white/10 border-white/20 text-white" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-white/80">Email</Label>
                            <Input id="email" type="email" defaultValue="alex.johnson@university.edu" className="bg-white/10 border-white/20 text-white" />
                        </div>
                        <div>
                            <Label htmlFor="hostel" className="text-white/80">Hostel</Label>
                            <Select defaultValue="Sapphire">
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-blue-900/90 border border-blue-700 text-white">
                                    {hostelList.map((hostel) => (
                                        <SelectItem key={hostel} value={hostel}>
                                            {hostel}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="department" className="text-white/80">Department</Label>
                            <Select defaultValue="computer-science">
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-blue-900/90 border border-blue-700 text-white">
                                    <SelectItem value="computer-science">Computer Science</SelectItem>
                                    <SelectItem value="engineering">Engineering</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="arts">Arts</SelectItem>
                                    <SelectItem value="medicine">Medicine</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Save Profile
                        </Button>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-purple-600/10 backdrop-blur-xl border border-purple-500/20 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10">
                            <Shield className="w-4 h-4 mr-2" />
                            Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10">
                            <Bell className="w-4 h-4 mr-2" />
                            Notification Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10">
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Help & Support
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}