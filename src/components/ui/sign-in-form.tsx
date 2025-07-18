'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
            {...props}
        />
    )
}

export function SignInForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { status } = useSession();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);



    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    // For 3D card effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
    const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/dashboard');
        }
    }, [status, router]);

    // Show loading state while checking auth
    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setErrorMessage(result.error);
                throw new Error(result.error);
            }

            // Success! Redirect to dashboard or home
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Authentication error:', error);

            setErrorMessage(error.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    // Then update your Google button
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full relative group/google"
    >
        {/* ...existing button content */}
    </motion.button>

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pointer-events-none">
            {/* Back to Home Button */}
            <motion.button
                onClick={handleBackToHome}
                className="absolute top-6 left-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 z-20 pointer-events-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-sm relative"
                style={{ perspective: 1500 }}
            >
                <motion.div
                    className="relative"
                    style={{ rotateX, rotateY }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ z: 10 }}
                >
                    <div className="relative group">
                        {/* Card glow effect */}
                        <motion.div
                            className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
                            animate={{
                                boxShadow: [
                                    "0 0 10px 2px rgba(99,102,241,0.1)",
                                    "0 0 15px 5px rgba(236,72,153,0.1)",
                                    "0 0 10px 2px rgba(99,102,241,0.1)"
                                ],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "mirror"
                            }}
                        />

                        {/* Traveling light beam effect */}
                        <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-70"
                                animate={{
                                    left: ["-50%", "100%"],
                                    opacity: [0.3, 0.7, 0.3]
                                }}
                                transition={{
                                    left: {
                                        duration: 2.5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    },
                                    opacity: {
                                        duration: 1.2,
                                        repeat: Infinity,
                                        repeatType: "mirror"
                                    }
                                }}
                            />

                            <motion.div
                                className="absolute top-0 right-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-rose-400 to-transparent opacity-70"
                                animate={{
                                    top: ["-50%", "100%"],
                                    opacity: [0.3, 0.7, 0.3]
                                }}
                                transition={{
                                    top: {
                                        duration: 2.5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                        delay: 0.6
                                    },
                                    opacity: {
                                        duration: 1.2,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: 0.6
                                    }
                                }}
                            />
                        </div>

                        {/* Card border glow */}
                        <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-indigo-500/20 via-rose-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                        {/* Glass card background */}
                        <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.1] shadow-2xl overflow-hidden">
                            {/* Logo and header */}
                            <div className="text-center space-y-1 mb-5">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", duration: 0.8 }}
                                    className="mx-auto w-10 h-10 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-500/20 to-rose-500/20"
                                >
                                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-rose-400">C</span>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    style={{ fontSize: "1.5rem" }}
                                    className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
                                >
                                    Welcome Back
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-white/60 text-xs"
                                >
                                    Sign in to Campus Connect
                                </motion.p>
                            </div>

                            {/* Login form */}
                            <form onSubmit={handleSubmit} className="space-y-4 pointer-events-auto">
                                <motion.div className="space-y-3">
                                    {/* Email input */}
                                    <motion.div
                                        className={`relative ${focusedInput === "email" ? 'z-10' : ''}`}
                                        whileFocus={{ scale: 1.02 }}
                                        whileHover={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                        <div className="relative flex items-center overflow-hidden rounded-lg">
                                            <Mail className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "email" ? 'text-indigo-400' : 'text-white/40'
                                                }`} />

                                            <Input
                                                type="email"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                onFocus={() => setFocusedInput("email")}
                                                onBlur={() => setFocusedInput(null)}
                                                className="w-full bg-white/5 border-white/10 focus:border-indigo-400/50 text-white placeholder:text-white/30 h-10 transition-all duration-300 pl-10 pr-3 focus:bg-white/10"
                                                required
                                            />

                                            {focusedInput === "email" && (
                                                <motion.div
                                                    layoutId="input-highlight"
                                                    className="absolute inset-0 bg-indigo-500/10 -z-10 rounded-lg"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Password input */}
                                    <motion.div
                                        className={`relative ${focusedInput === "password" ? 'z-10' : ''}`}
                                        whileFocus={{ scale: 1.02 }}
                                        whileHover={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                        <div className="relative flex items-center overflow-hidden rounded-lg">
                                            <Lock className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "password" ? 'text-rose-400' : 'text-white/40'
                                                }`} />

                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onFocus={() => setFocusedInput("password")}
                                                onBlur={() => setFocusedInput(null)}
                                                className="w-full bg-white/5 border-white/10 focus:border-rose-400/50 text-white placeholder:text-white/30 h-10 transition-all duration-300 pl-10 pr-10 focus:bg-white/10"
                                                required
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 cursor-pointer"
                                            >
                                                {showPassword ? (
                                                    <Eye className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" />
                                                ) : (
                                                    <EyeClosed className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" />
                                                )}
                                            </button>

                                            {focusedInput === "password" && (
                                                <motion.div
                                                    layoutId="input-highlight"
                                                    className="absolute inset-0 bg-rose-500/10 -z-10 rounded-lg"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Remember me & Forgot password */}
                                {/* <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center space-x-2">
                                        <div className="relative">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={() => setRememberMe(!rememberMe)}
                                                className="appearance-none h-4 w-4 rounded border border-white/20 bg-white/5 checked:bg-indigo-500 checked:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-400/30 transition-all duration-200"
                                            />
                                            {rememberMe && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="absolute inset-0 flex items-center justify-center text-white pointer-events-none"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </div>
                                        <label htmlFor="remember-me" className="text-xs text-white/60 hover:text-white/80 transition-colors duration-200 cursor-pointer">
                                            Remember me
                                        </label>
                                    </div>

                                    <button
                                        type="button"
                                        className="text-xs text-white/60 hover:text-indigo-400 transition-colors duration-200"
                                    >
                                        Forgot password?
                                    </button>
                                </div> */}

                                {/* Sign in button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full relative group/button mt-5"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-rose-500/20 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity duration-300" />

                                    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center">
                                        <AnimatePresence mode="wait">
                                            {isLoading ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center"
                                                >
                                                    <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                                                </motion.div>
                                            ) : (
                                                <motion.span
                                                    key="button-text"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center gap-1 text-sm font-medium"
                                                >
                                                    Sign In
                                                    <ArrowRight className="w-3 h-3 group-hover/button:translate-x-1 transition-transform duration-300" />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.button>

                                <div className="relative mt-2 mb-5 flex items-center">
                                    <div className="flex-grow border-t border-white/5"></div>
                                    <motion.span
                                        className="mx-3 text-xs text-white/40"
                                        initial={{ opacity: 0.7 }}
                                        animate={{ opacity: [0.7, 0.9, 0.7] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        or
                                    </motion.span>
                                    <div className="flex-grow border-t border-white/5"></div>
                                </div>

                                {/* Google Sign In */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleGoogleSignIn}
                                    className="w-full relative group/google"
                                >
                                    <div className="absolute inset-0 bg-white/5 rounded-lg blur opacity-0 group-hover/google:opacity-70 transition-opacity duration-300" />

                                    <div className="relative overflow-hidden bg-white/5 text-white font-medium h-10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                                        {/* <!-- SVG_GOOGLE_LOGO --> */}
                                        <div className="w-4 h-4 flex items-center justify-center text-white/80 group-hover/google:text-white transition-colors duration-300">G</div>

                                        <span className="text-white/80 group-hover/google:text-white transition-colors text-xs">
                                            Sign in with Google
                                        </span>

                                        {/* Button hover effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '100%' }}
                                            transition={{
                                                duration: 1,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </div>
                                </motion.button>

                                {/* Sign up link */}
                                <motion.p
                                    className="text-center text-xs text-white/60 mt-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => router.push('/sign-up')}
                                        className="relative inline-block group/signup"
                                    >
                                        <span className="relative z-10 text-indigo-400 group-hover/signup:text-rose-400 transition-colors duration-300 font-medium">
                                            Sign up
                                        </span>
                                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-indigo-400 to-rose-400 group-hover/signup:w-full transition-all duration-300" />
                                    </button>
                                </motion.p>
                            </form>
                            {errorMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-rose-500 text-xs mt-1 text-center"
                                >
                                    {errorMessage}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}