import { cn } from "@/lib/utils"
import {
    Search,
    Shield,
    Users,
    Clock,
    MapPin,
    Bell,
    Award,
    Heart,
    Lock
} from "lucide-react"

export function FeaturesSectionWithHoverEffects({ id = "features" }: { id?: string }) {
    const features = [
        {
            title: "Smart Search System",
            description:
                "Advanced filtering and search capabilities to quickly find lost items by category, location, and date.",
            icon: <Search className="h-6 w-6" />,
        },
        {
            title: "Secure & Private",
            description:
                "Your personal information is protected with end-to-end encryption and secure authentication.",
            icon: <Lock className="h-6 w-6" />,
        },
        {
            title: "Campus Community",
            description:
                "Connect with students, faculty, and staff across your campus to maximize item recovery chances.",
            icon: <Shield className="h-6 w-6" />,
        },
        {
            title: "Real-time Updates",
            description: "Get instant notifications when someone finds or reports an item matching your search.",
            icon: <Clock className="h-6 w-6" />,
        },
        {
            title: "Location Tracking",
            description: "Pinpoint exactly where items were lost or found on campus with our interactive map.",
            icon: <MapPin className="h-6 w-6" />,
        },
        {
            title: "Smart Notifications",
            description: "Secure in-app messaging system to coordinate item returns while protecting privacy.",
            icon: <Bell className="h-6 w-6" />,
        },
        {
            title: "Verified Users",
            description: "Upload and share photos of found items to help with identification and verification.",
            icon: <Award className="h-6 w-6" />,
        },
        {
            title: "Success Stories",
            description: "Join thousands of students who have successfully reunited with their lost belongings.",
            icon: <Heart className="h-6 w-6" />,
        }
    ]

    return (
        <div id={id} className="bg-[#030303] py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Why Choose Our Platform?
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Designed specifically for campus communities with features that make finding lost items easier than ever.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
                    {features.map((feature, index) => (
                        <Feature
                            key={index}
                            {...feature}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature border-white/10",
                (index === 0 || index === 4) && "lg:border-l border-white/[0.08]",
                index < 4 && "lg:border-b border-white/[0.08]"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-indigo-500/[0.05] via-rose-500/[0.03] to-transparent pointer-events-none" />
            )}
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-indigo-500/5 via-transparent to-rose-500/5 pointer-events-none" />
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-indigo-500/[0.05] via-rose-500/[0.03] to-transparent pointer-events-none" />
            <div className="relative z-10 p-4 pl-10 text-white">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/20 group-hover/feature:bg-gradient-to-b group-hover/feature:from-indigo-400 group-hover/feature:to-rose-400 transition-all duration-300 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-300 inline-block text-white">
                    {title}
                </span>
            </div>
            <p className="text-sm text-white/60 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    )
}