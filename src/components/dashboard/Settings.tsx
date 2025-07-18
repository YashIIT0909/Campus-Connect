"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Bell, Shield, HelpCircle } from 'lucide-react';

export default function Settings() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
                <p className="text-slate-500">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Settings */}
                <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-800">
                            <User className="w-5 h-5" />
                            Profile Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName" className="text-slate-700">First Name</Label>
                                <Input id="firstName" defaultValue="Alex" className="bg-slate-50 border-slate-200" />
                            </div>
                            <div>
                                <Label htmlFor="lastName" className="text-slate-700">Last Name</Label>
                                <Input id="lastName" defaultValue="Johnson" className="bg-slate-50 border-slate-200" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-slate-700">Email</Label>
                            <Input id="email" type="email" defaultValue="alex.johnson@university.edu" className="bg-slate-50 border-slate-200" />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="bg-slate-50 border-slate-200" />
                        </div>
                        <div>
                            <Label htmlFor="department" className="text-slate-700">Department</Label>
                            <Select defaultValue="computer-science">
                                <SelectTrigger className="bg-slate-50 border-slate-200">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="computer-science">Computer Science</SelectItem>
                                    <SelectItem value="engineering">Engineering</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="arts">Arts</SelectItem>
                                    <SelectItem value="medicine">Medicine</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            Save Profile
                        </Button>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-800">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start border-slate-200 hover:bg-slate-50">
                            <Shield className="w-4 h-4 mr-2" />
                            Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-slate-200 hover:bg-slate-50">
                            <Bell className="w-4 h-4 mr-2" />
                            Notification Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-slate-200 hover:bg-slate-50">
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Help & Support
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Notification Preferences */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                        <Bell className="w-5 h-5" />
                        Notification Preferences
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-800">Email Notifications</h4>
                                <p className="text-sm text-slate-500">Receive email alerts for new matches</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-800">Push Notifications</h4>
                                <p className="text-sm text-slate-500">Get notified instantly on your device</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-800">Weekly Summary</h4>
                                <p className="text-sm text-slate-500">Weekly report of campus lost & found activity</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-800">Success Stories</h4>
                                <p className="text-sm text-slate-500">Notifications when items are successfully returned</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                        <Shield className="w-5 h-5" />
                        Privacy Settings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-800">Show Contact Information</h4>
                                <p className="text-sm text-slate-500">Allow others to see your contact details</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-800">Public Profile</h4>
                                <p className="text-sm text-slate-500">Make your profile visible to other users</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-800">Analytics Sharing</h4>
                                <p className="text-sm text-slate-500">Help improve the platform with usage data</p>
                            </div>
                            <Switch />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}