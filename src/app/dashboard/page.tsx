"use client";

import { useState } from 'react';
import { BackgroundPaths } from '@/components/ui/background-paths';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/Topbar';
import PersonalDashboard from '@/components/dashboard/PersonalDashboard';
// import AllItems from '@/components/dashboard/AllItems';
import MyPosts from '@/components/dashboard/MyPosts';
import Analytics from '@/components/dashboard/Analytics';
import Settings from '@/components/dashboard/Settings';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('personal');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'personal':
                return <PersonalDashboard />;
            // case 'all-items':
            //     return <AllItems />;
            case 'my-posts':
                return <MyPosts />;
            case 'analytics':
                return <Analytics />;
            case 'settings':
                return <Settings />;
            default:
                return <PersonalDashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 relative overflow-hidden w-screen">
            {/* Background Paths */}
            <div className="absolute inset-0">
                <BackgroundPaths />
            </div>

            {/* Dashboard Container - Full Width */}
            <div className="relative z-10 p-6 w-full">
                <div className="w-full space-y-6">
                    {/* Top Bar - Full Width */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full">
                        <TopBar />
                    </div>

                    {/* Main Content Area - Full Width */}
                    <div className="flex gap-6 min-h-[calc(100vh-140px)] w-full">
                        {/* Sidebar */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                            <Sidebar
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                collapsed={sidebarCollapsed}
                                setCollapsed={setSidebarCollapsed}
                            />
                        </div>

                        {/* Dashboard Content */}
                        <main className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-8 h-full overflow-auto">
                                {renderContent()}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}