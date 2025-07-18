"use client"
import React from 'react';
import {
    Bell,
    Search,
    LayoutDashboard,
    CheckCircle,
    Calendar,
    BarChart2,
    Users,
    Settings,
    HelpCircle,
    LogOut,
    Plus,
    Import,
    Clock
} from 'lucide-react';

// Helper: Mocked UI Components (to replace @/components/ui/*)
import { BackgroundPaths } from '@/components/ui/background-paths';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string;
    variant?: 'ghost' | 'outline' | 'default';
    size?: 'icon' | 'sm' | 'default';
};

const Button = ({ children, className = '', variant, size, ...props }: ButtonProps) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

    const variantClasses = {
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        default: "bg-primary text-primary-foreground hover:bg-primary/90"
    };

    const sizeClasses = {
        icon: "h-10 w-10",
        sm: "h-9 px-3",
        default: "h-10 py-2 px-4"
    };

    const appliedVariant = variant === 'ghost' || variant === 'outline' ? variant : 'default';
    const appliedSize = size === 'icon' || size === 'sm' ? size : 'default';

    return (
        <button className={`${baseClasses} ${variantClasses[appliedVariant]} ${sizeClasses[appliedSize]} ${className}`} {...props}>
            {children}
        </button>
    );
};

// Main App Component
export default function App() {
    return (
        <>
            <style>
                {`
                   

                    @layer base {
                      :root {
                        --background: 240 10% 3.9%;
                        --foreground: 0 0% 98%;
                        --card: 240 10% 3.9%;
                        --card-foreground: 0 0% 98%;
                        --popover: 240 10% 3.9%;
                        --popover-foreground: 0 0% 98%;
                        --primary: 0 0% 98%;
                        --primary-foreground: 240 5.9% 10%;
                        --secondary: 240 3.7% 15.9%;
                        --secondary-foreground: 0 0% 98%;
                        --muted: 240 3.7% 15.9%;
                        --muted-foreground: 240 5% 64.9%;
                        --accent: 240 3.7% 15.9%;
                        --accent-foreground: 0 0% 98%;
                        --destructive: 0 62.8% 30.6%;
                        --destructive-foreground: 0 0% 98%;
                        --border: 240 3.7% 15.9%;
                        --input: 240 3.7% 15.9%;
                        --ring: 240 4.9% 83.9%;
                        --radius: 0.75rem;
                      }
                    }

                    @layer base {
                      * {
                        @apply border-border;
                      }
                      body {
                        @apply bg-background text-foreground;
                      }
                    }
                    
                    /* Additional body styles for the preview */
                    body {
                        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
                        min-height: 100vh;
                    }
                `}
            </style>
            <DashboardPage />
        </>
    );
}


// --- Your Components with Updated Styles ---

import type { ReactNode } from 'react';

const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
    <div className={`bg-card/50 backdrop-blur-sm border rounded-2xl p-6 ${className}`}>
        {children}
    </div>
);

const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
}: {
    title: string;
    value: string;
    change: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => (
    <Card className="flex flex-col justify-between">
        <div className="flex justify-between items-start">
            <h3 className="text-muted-foreground">{title}</h3>
            <Icon className="text-muted-foreground" width={24} height={24} />
        </div>
        <div>
            <p className="text-4xl font-bold">{value}</p>
            <p className="text-sm text-green-400">{change}</p>
        </div>
    </Card>
);

type TeamMemberProps = {
    name: string;
    task: string;
    status: string;
    avatar: string;
    statusColor: string;
};

const TeamMember = ({ name, task, status, avatar, statusColor }: TeamMemberProps) => (
    <div className="flex items-center space-x-4">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{task}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}>
            {status}
        </span>
    </div>
);

function DashboardPage() {
    const projects = [
        { title: "Develop API Endpoints", due: "Nov 30, 2024", color: "bg-blue-500" },
        { title: "Onboarding Flow", due: "Nov 08, 2024", color: "bg-purple-500" },
        { title: "Build Dashboard", due: "Nov 30, 2024", color: "bg-yellow-500" },
        { title: "Optimize Page Load", due: "Dec 05, 2024", color: "bg-orange-500" },
        { title: "Cross-Browser Testing", due: "Dec 05, 2024", color: "bg-pink-500" },
    ];

    return (
        <div className="min-h-screen w-full p-4 flex gap-4 bg-transparent relative overflow-hidden">
            <BackgroundPaths />

            <aside className="w-64 flex-shrink-0 bg-card/50 backdrop-blur-sm border rounded-2xl p-6 flex flex-col justify-between z-10">
                <div>
                    <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-violet-500 to-blue-500 text-transparent bg-clip-text">Campus Connect</h1>
                    <nav className="space-y-2">
                        <a href="#" className="flex items-center gap-3 p-3 bg-secondary rounded-lg text-primary font-semibold"><LayoutDashboard /> Dashboard</a>
                        <a href="#" className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg text-muted-foreground"><CheckCircle /> Tasks</a>
                        <a href="#" className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg text-muted-foreground"><Calendar /> Calendar</a>
                        <a href="#" className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg text-muted-foreground"><BarChart2 /> Analytics</a>
                        <a href="#" className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg text-muted-foreground"><Users /> Team</a>
                    </nav>
                    <div className="mt-10">
                        <h2 className="text-sm text-muted-foreground uppercase tracking-wider mb-4">General</h2>
                        <nav className="space-y-2">
                            <a href="#" className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg text-muted-foreground"><Settings /> Settings</a>
                            <a href="#" className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg text-muted-foreground"><HelpCircle /> Help</a>
                            <a href="#" className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg text-muted-foreground"><LogOut /> Logout</a>
                        </nav>
                    </div>
                </div>
                <Card className="text-center !p-4">
                    <h3 className="font-bold">Download our Mobile App</h3>
                    <p className="text-xs text-muted-foreground mb-4">Get the full experience</p>
                    <Button className="w-full font-bold" variant="default" size="default">Download</Button>
                </Card>
            </aside>

            <main className="flex-1 flex flex-col gap-4 z-10">
                <header className="flex-shrink-0 bg-card/50 backdrop-blur-sm border rounded-2xl p-4 flex justify-between items-center">
                    <div className="relative w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input type="text" placeholder="Search task" className="w-full bg-input border-none rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon"><Bell /></Button>
                        <div className="flex items-center gap-3">
                            <img
                                src="https://i.pravatar.cc/40?u=a042581f4e29026704d"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/27272a/a1a1aa?text=TM';
                                }}
                                alt="user"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-semibold text-foreground">Totok Michael</p>
                                <p className="text-xs text-muted-foreground">tmichael82@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 grid grid-cols-3 grid-rows-4 gap-4">
                    <div className="col-span-3">
                        <Card>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Dashboard</h2>
                                <div className="flex gap-2">
                                    <Button variant="default" size="default"><Plus size={16} className="mr-2" /> Add Project</Button>
                                    <Button variant="outline" size="default"><Import size={16} className="mr-2" /> Import Data</Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <StatCard title="Total Projects" value="24" change="Increased from last month" icon={BarChart2} />
                                <StatCard title="Ended Projects" value="10" change="Increased from last month" icon={CheckCircle} />
                                <StatCard title="Running Projects" value="12" change="Increased from last month" icon={BarChart2} />
                                <StatCard title="Pending Project" value="2" change="On Discuss" icon={Clock} />
                            </div>
                        </Card>
                    </div>

                    <Card className="col-span-1 row-span-2">
                        <h3 className="font-bold mb-4">Project Analytics</h3>
                        <div className="h-48 flex items-end justify-between gap-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                                    <div className={`w-full rounded-full ${i === 2 ? 'bg-gradient-to-t from-violet-600 to-blue-600 h-3/4' : 'bg-secondary h-1/2'}`}></div>
                                    <span className="text-xs text-muted-foreground">{day}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="col-span-1 row-span-1">
                        <h3 className="font-bold mb-4">Reminders</h3>
                        <div className="bg-gradient-to-r from-violet-600 to-blue-600 p-4 rounded-lg text-white">
                            <h4 className="font-semibold">Meeting with Arc Company</h4>
                            <p className="text-sm opacity-80 mb-4">02:00 pm - 04:00 pm</p>
                            <Button className="w-full" variant="default" size="default">Start Meeting</Button>
                        </div>
                    </Card>

                    <Card className="col-span-1 row-span-3">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold">Project</h3>
                            <Button size="sm" variant="default"><Plus size={16} /> New</Button>
                        </div>
                        <div className="space-y-4">
                            {projects.map(p => (
                                <div key={p.title} className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg ${p.color}`}></div>
                                    <div>
                                        <p className="font-semibold">{p.title}</p>
                                        <p className="text-xs text-muted-foreground">{p.due}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="col-span-2 row-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold">Team Collaboration</h3>
                            <Button variant="outline" size="default"><Plus size={16} className="mr-2" /> Add Member</Button>
                        </div>
                        <div className="space-y-4">
                            <TeamMember name="Alexandra Deff" task="Working on Github Project Repository" status="Completed" avatar="https://i.pravatar.cc/40?u=a" statusColor="bg-green-500/20 text-green-400" />
                            <TeamMember name="Edwin Adenike" task="Working on Integrate User Authentication System" status="In Progress" avatar="https://i.pravatar.cc/40?u=b" statusColor="bg-yellow-500/20 text-yellow-400" />
                            <TeamMember name="Isaac Oluwatemilorun" task="Working on Develop Search and Filter Functionality" status="Pending" avatar="https://i.pravatar.cc/40?u=c" statusColor="bg-orange-500/20 text-orange-400" />
                            <TeamMember name="David Oshodi" task="Working on Responsive Layout for Homepage" status="In Progress" avatar="https://i.pravatar.cc/40?u=d" statusColor="bg-yellow-500/20 text-yellow-400" />
                        </div>
                    </Card>
                    <Card className="col-span-1 row-span-1">
                        <h3 className="font-bold mb-4">Project Progress</h3>
                        <div className="flex items-center justify-center">
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="url(#progressGradient)" strokeWidth="3" strokeDasharray="41, 100" strokeLinecap="round" transform="rotate(90 18 18)" />
                                    <defs>
                                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#6d28d9" />
                                            <stop offset="100%" stopColor="#2563eb" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <p className="text-3xl font-bold">41%</p>
                                    <p className="text-xs text-muted-foreground">Ended</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="col-span-1 row-span-1 flex flex-col justify-center items-center text-center">
                        <h3 className="font-bold mb-2">Time Tracker</h3>
                        <p className="text-5xl font-mono font-bold tracking-widest">01:24:08</p>
                    </Card>
                </div>
            </main>
        </div>
    );
}
