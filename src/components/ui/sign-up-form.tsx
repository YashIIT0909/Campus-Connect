'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeClosed, ArrowRight, ArrowLeft, User, Hash, Home, ChevronDown, CheckCircle, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { hostelList, signUpValidation } from "@/schema/signUpSchema";
import axios from 'axios';
import { signIn } from "next-auth/react";


// Re-using the Input component from your SignInForm - MODIFIED FOR FLOATING LABEL
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-transparent selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                // Ensure there's padding for the icon and the floated label
                "pl-10", // Sufficient padding for icon
                // Important: Ensure the input's background covers its entire area
                "bg-black/60", // Match the form's background or a consistent dark background
                className
            )}
            {...props}
        />
    )
}

// Re-using the Select component (assuming you might have one or creating a basic one)
function Select({ className, children, ...props }: React.ComponentProps<"select">) {
    return (
        <select
            data-slot="select"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                "bg-black/60 border-white/10 focus:border-indigo-400/50 text-white placeholder:text-white/30 h-10 transition-all duration-300 pl-10 pr-3 appearance-none", // Removed conflicting focus:bg-white/10
                className
            )}
            {...props}
        >
            {children}
        </select>
    )
}


export function SignUpForm() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form Data States
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [admissionNumber, setAdmissionNumber] = useState("");
    const [selectedHostel, setSelectedHostel] = useState("");

    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint is typically 768px in Tailwind
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // For 3D card effect on the main form
    const mouseXForm = useMotionValue(0);
    const mouseYForm = useMotionValue(0);
    const rotateXForm = useTransform(mouseYForm, [-300, 300], [10, -10]);
    const rotateYForm = useTransform(mouseXForm, [-300, 300], [-10, 10]);

    const handleMouseMoveForm = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseXForm.set(e.clientX - rect.left - rect.width / 2);
        mouseYForm.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeaveForm = () => {
        mouseXForm.set(0);
        mouseYForm.set(0);
    };

    // For 3D card effect on the desktop step tracker
    const mouseXTracker = useMotionValue(0);
    const mouseYTracker = useMotionValue(0);
    const rotateXTracker = useTransform(mouseYTracker, [-200, 200], [10, -10]);
    const rotateYTracker = useTransform(mouseXTracker, [-200, 200], [-10, 10]);

    const handleMouseMoveTracker = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseXTracker.set(e.clientX - rect.left - rect.width / 2);
        mouseYTracker.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeaveTracker = () => {
        mouseXTracker.set(0);
        mouseYTracker.set(0);
    };


    const handleNextStep = () => {
        // Basic validation for current step before moving next
        if (step === 1) {
            if (!firstName || !email) {
                alert("Please fill in all required fields for your details.");
                return;
            }
        } else if (step === 2) {
            if (!password || !confirmPassword || password.length < 8) {
                alert("Please choose a password (at least 8 characters) and confirm it.");
                return;
            }
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
        }
        setStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setStep((prev) => prev - 1);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // Prepare the user data
            const userData = {
                username: firstName, // Using firstName as username
                email: email,
                password: password,
                admissionNumber: admissionNumber,
                hostel: selectedHostel,
            };

            // Send the data to your API endpoint
            const response = await axios.post('/api/auth/register', userData);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Registration failed');
            }

            // Success! Redirect to sign-in
            router.push('/sign-in');
        } catch (error: any) {
            console.error('Registration error:', error);
            // Show error to user
            alert(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToHome = () => {
        router.push('/');
    };

    const handleGoogleSignUp = async () => {
        try {
            await signIn('google', { callbackUrl: '/' });
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };


    const validateForm = () => {
        try {
            const result = signUpValidation.safeParse({
                username: firstName,
                email: email,
                password: password,
                admissionNumber: admissionNumber,
                hostel: selectedHostel,
            });

            if (!result.success) {
                // Get the first error message
                const errorMessage = result.error.issues[0]?.message || 'Validation failed';
                throw new Error(errorMessage);
            }

            return true;
        } catch (error: any) {
            alert(error.message);
            return false;
        }
    };

    // Define the steps for the desktop tracker - now only 3 actual steps
    const desktopSteps = [
        { id: 1, title: "Your details", subtitle: "Provide your name and email" },
        { id: 2, title: "Choose a password", subtitle: "Set up a secure password" },
        { id: 3, title: "Additional Info", subtitle: "Tell us a bit more about you" },
    ];

    // Determine a fixed height for the form content area
    // This value is an estimate. You might need to adjust it slightly.
    const FORM_CONTENT_MIN_HEIGHT = '340px';

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="text-center space-y-1 mb-5 md:text-left">
                            <motion.h1
                                style={{ fontSize: "1.5rem" }}
                                className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
                            >
                                Your details
                            </motion.h1>
                            <p className="text-white/60 text-xs">Please provide your name and email</p>
                        </div>

                        {/* Google Sign Up - Only in Step 1 */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="w-full relative group/google"
                        >
                            <div className="absolute inset-0 bg-white/5 rounded-lg blur opacity-0 group-hover/google:opacity-70 transition-opacity duration-300" />
                            <div className="relative overflow-hidden bg-white/5 text-white font-medium h-10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                                <div className="w-4 h-4 flex items-center justify-center text-white/80 group-hover/google:text-white transition-colors duration-300">G</div>
                                <span className="text-white/80 group-hover/google:text-white transition-colors text-xs">
                                    Sign up with Google
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                />
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
                                OR
                            </motion.span>
                            <div className="flex-grow border-t border-white/5"></div>
                        </div>

                        {/* First Name Input with Floating Label */}
                        <motion.div
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <div className="relative flex items-center overflow-hidden rounded-lg">
                                <User className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "firstName" ? 'text-indigo-400' : 'text-white/40'}`} />
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Username*"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    onFocus={() => setFocusedInput("firstName")}
                                    onBlur={() => setFocusedInput(null)}
                                    // FIX: Ensure no conflicting background color on focus
                                    className="w-full bg-black/60 border-white/10 focus:border-indigo-400/50 text-white h-10 transition-all duration-300 pl-10 pr-3"
                                    required
                                />
                                <motion.label
                                    htmlFor="firstName"
                                    // FIX: Add z-10 to lift label, and bg-black/60 to hide border behind it
                                    className="absolute left-10 cursor-text text-white/30 transition-all duration-300 ease-in-out pointer-events-none bg-black/60 px-1 z-10"
                                    animate={{
                                        y: focusedInput === "firstName" || firstName ? -18 : 0,
                                        x: focusedInput === "firstName" || firstName ? -24 : 0,
                                        scale: focusedInput === "firstName" || firstName ? 0.75 : 1,
                                        color: focusedInput === "firstName" ? "rgba(99,102,241,1)" : (firstName ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)")
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    User name*
                                </motion.label>
                                {focusedInput === "firstName" && (
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

                        {/* Last Name Input with Floating Label */}


                        {/* Email Input with Floating Label */}
                        <motion.div
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <div className="relative flex items-center overflow-hidden rounded-lg">
                                <Mail className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "email" ? 'text-indigo-400' : 'text-white/40'}`} />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email*"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedInput("email")}
                                    onBlur={() => setFocusedInput(null)}
                                    // FIX: Ensure no conflicting background color on focus
                                    className="w-full bg-black/60 border-white/10 focus:border-indigo-400/50 text-white h-10 transition-all duration-300 pl-10 pr-3"
                                    required
                                />
                                <motion.label
                                    htmlFor="email"
                                    // FIX: Add z-10 to lift label, and bg-black/60 to hide border behind it
                                    className="absolute left-10 cursor-text text-white/30 transition-all duration-300 ease-in-out pointer-events-none bg-black/60 px-1 z-10"
                                    animate={{
                                        y: focusedInput === "email" || email ? -18 : 0,
                                        x: focusedInput === "email" || email ? -24 : 0,
                                        scale: focusedInput === "email" || email ? 0.75 : 1,
                                        color: focusedInput === "email" ? "rgba(99,102,241,1)" : (email ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)")
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Email*
                                </motion.label>
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

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={handleNextStep}
                            className="w-full relative group/button mt-5"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-rose-500/20 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity duration-300" />
                            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center">
                                <span className="flex items-center justify-center gap-1 text-sm font-medium">
                                    Continue
                                    <ArrowRight className="w-3 h-3 group-hover/button:translate-x-1 transition-transform duration-300" />
                                </span>
                            </div>
                        </motion.button>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="text-center space-y-1 mb-5 md:text-left">
                            <motion.h1
                                style={{ fontSize: "1.5rem" }}
                                className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
                            >
                                Choose a password
                            </motion.h1>
                            <p className="text-white/60 text-xs">Must be at least 8 characters</p>
                        </div>

                        {/* Password input with Floating Label */}
                        <motion.div
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <div className="relative flex items-center overflow-hidden rounded-lg">
                                <Lock className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "password" ? 'text-rose-400' : 'text-white/40'}`} />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password*"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedInput("password")}
                                    onBlur={() => setFocusedInput(null)}
                                    // FIX: Ensure no conflicting background color on focus
                                    className="w-full bg-black/60 border-white/10 focus:border-rose-400/50 text-white h-10 transition-all duration-300 pl-10 pr-10"
                                    required
                                />
                                <motion.label
                                    htmlFor="password"
                                    // FIX: Add z-10 to lift label, and bg-black/60 to hide border behind it
                                    className="absolute left-10 cursor-text text-white/30 transition-all duration-300 ease-in-out pointer-events-none bg-black/60 px-1 z-10"
                                    animate={{
                                        y: focusedInput === "password" || password ? -18 : 0,
                                        x: focusedInput === "password" || password ? -24 : 0,
                                        scale: focusedInput === "password" || password ? 0.75 : 1,
                                        color: focusedInput === "password" ? "rgba(244,63,94,1)" : (password ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)")
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Password*
                                </motion.label>
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

                        {/* Confirm Password input with Floating Label */}
                        <motion.div
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <div className="relative flex items-center overflow-hidden rounded-lg">
                                <Lock className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "confirmPassword" ? 'text-rose-400' : 'text-white/40'}`} />
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm password*"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setFocusedInput("confirmPassword")}
                                    onBlur={() => setFocusedInput(null)}
                                    // FIX: Ensure no conflicting background color on focus
                                    className="w-full bg-black/60 border-white/10 focus:border-rose-400/50 text-white h-10 transition-all duration-300 pl-10 pr-10"
                                    required
                                />
                                <motion.label
                                    htmlFor="confirmPassword"
                                    // FIX: Add z-10 to lift label, and bg-black/60 to hide border behind it
                                    className="absolute left-10 cursor-text text-white/30 transition-all duration-300 ease-in-out pointer-events-none bg-black/60 px-1 z-10"
                                    animate={{
                                        y: focusedInput === "confirmPassword" || confirmPassword ? -18 : 0,
                                        x: focusedInput === "confirmPassword" || confirmPassword ? -24 : 0,
                                        scale: focusedInput === "confirmPassword" || confirmPassword ? 0.75 : 1,
                                        color: focusedInput === "confirmPassword" ? "rgba(244,63,94,1)" : (confirmPassword ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)")
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Confirm password*
                                </motion.label>
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
                                {focusedInput === "confirmPassword" && (
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

                        <div className="flex justify-between gap-2 mt-5">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={handlePreviousStep}
                                className="w-full relative group/button"
                            >
                                <div className="absolute inset-0 bg-white/5 rounded-lg blur opacity-0 group-hover/button:opacity-70 transition-opacity duration-300" />
                                <div className="relative overflow-hidden bg-white/5 text-white/80 font-medium h-10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-1 text-sm">
                                    <ArrowLeft className="w-3 h-3 group-hover/button:-translate-x-1 transition-transform duration-300" />
                                    Back
                                </div>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={handleNextStep}
                                className="w-full relative group/button"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-rose-500/20 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity duration-300" />
                                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center">
                                    <span className="flex items-center justify-center gap-1 text-sm font-medium">
                                        Continue
                                        <ArrowRight className="w-3 h-3 group-hover/button:translate-x-1 transition-transform duration-300" />
                                    </span>
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="text-center space-y-1 mb-5 md:text-left">
                            <motion.h1
                                style={{ fontSize: "1.5rem" }}
                                className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
                            >
                                Additional Information
                            </motion.h1>
                            <p className="text-white/60 text-xs">Please provide additional details</p>
                        </div>

                        {/* Admission Number Input with Floating Label */}
                        <motion.div
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <div className="relative flex items-center overflow-hidden rounded-lg">
                                <Hash className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "admissionNumber" ? 'text-indigo-400' : 'text-white/40'}`} />
                                <Input
                                    id="admissionNumber"
                                    type="text"
                                    placeholder="Admission Number*"
                                    value={admissionNumber}
                                    onChange={(e) => setAdmissionNumber(e.target.value)}
                                    onFocus={() => setFocusedInput("admissionNumber")}
                                    onBlur={() => setFocusedInput(null)}
                                    // FIX: Ensure no conflicting background color on focus
                                    className="w-full bg-black/60 border-white/10 focus:border-indigo-400/50 text-white h-10 transition-all duration-300 pl-10 pr-3"
                                    required
                                />
                                <motion.label
                                    htmlFor="admissionNumber"
                                    // FIX: Add z-10 to lift label, and bg-black/60 to hide border behind it
                                    className="absolute left-10 cursor-text text-white/30 transition-all duration-300 ease-in-out pointer-events-none bg-black/60 px-1 z-10"
                                    animate={{
                                        y: focusedInput === "admissionNumber" || admissionNumber ? -18 : 0,
                                        x: focusedInput === "admissionNumber" || admissionNumber ? -24 : 0,
                                        scale: focusedInput === "admissionNumber" || admissionNumber ? 0.75 : 1,
                                        color: focusedInput === "admissionNumber" ? "rgba(99,102,241,1)" : (admissionNumber ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)")
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Admission Number*
                                </motion.label>
                                {focusedInput === "admissionNumber" && (
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

                        {/* Select Hostel Input */}
                        <motion.div
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <div className="relative flex items-center overflow-hidden rounded-lg">
                                <Home className={`absolute left-3 w-4 h-4 transition-all duration-300 ${focusedInput === "hostel" ? 'text-indigo-400' : 'text-white/40'}`} />
                                <Select
                                    id="selectedHostel"
                                    value={selectedHostel}
                                    onChange={(e) => setSelectedHostel(e.target.value)}
                                    onFocus={() => setFocusedInput("hostel")}
                                    onBlur={() => setFocusedInput(null)}
                                    // FIX: Ensure no conflicting background color on focus
                                    className="w-full bg-black/60 border-white/10 focus:border-indigo-400/50 text-white placeholder:text-white/30 h-10 transition-all duration-300 pl-10 pr-8"
                                    required
                                >
                                    <option value="" disabled className="bg-gray-800 text-white/50">Select Hostel*</option>
                                    {hostelList.map((hostel) => (
                                        <option key={hostel} value={hostel} className="bg-gray-800 text-white">
                                            {hostel}
                                        </option>
                                    ))}
                                </Select>
                                <ChevronDown className="absolute right-3 w-4 h-4 text-white/40 pointer-events-none" />
                                {focusedInput === "hostel" && (
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

                        <div className="flex justify-between gap-2 mt-5">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={handlePreviousStep}
                                className="w-full relative group/button"
                            >
                                <div className="absolute inset-0 bg-white/5 rounded-lg blur opacity-0 group-hover/button:opacity-70 transition-opacity duration-300" />
                                <div className="relative overflow-hidden bg-white/5 text-white/80 font-medium h-10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-1 text-sm">
                                    <ArrowLeft className="w-3 h-3 group-hover/button:-translate-x-1 transition-transform duration-300" />
                                    Back
                                </div>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full relative group/button"
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
                                                Complete Sign up
                                                <ArrowRight className="w-3 h-3 group-hover/button:translate-x-1 transition-transform duration-300" />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen p-4 pointer-events-none md:gap-8">
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

            {/* Desktop Step Tracker - Hidden on mobile, with 3D effect */}
            {!isMobile && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hidden md:block w-full max-w-[250px] relative" // Increased max-width for the tracker
                    style={{ perspective: 1500 }}
                >
                    <motion.div
                        className="relative"
                        style={{ rotateX: rotateXTracker, rotateY: rotateYTracker }}
                        onMouseMove={handleMouseMoveTracker}
                        onMouseLeave={handleMouseLeaveTracker}
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
                            <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.1] shadow-2xl overflow-hidden pointer-events-auto"
                                style={{ minHeight: `calc(${FORM_CONTENT_MIN_HEIGHT} + 80px)` }}
                            >
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500/20 to-rose-500/20">
                                        <GraduationCap className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">Campus Connect</span>
                                </div>

                                <ul className="space-y-6">
                                    {desktopSteps.map((s) => (
                                        <li key={s.id} className="flex items-start gap-3">
                                            <div className={cn(
                                                "w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center",
                                                step > s.id
                                                    ? "bg-indigo-500 text-white"
                                                    : step === s.id
                                                        ? "border-2 border-indigo-500 text-indigo-400"
                                                        : "border border-white/30 text-white/40"
                                            )}>
                                                {step > s.id ? (
                                                    <CheckCircle className="w-4 h-4" />
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-current" />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn(
                                                    "text-sm font-medium",
                                                    step >= s.id ? "text-white" : "text-white/60"
                                                )}>
                                                    {s.title}
                                                </span>
                                                <span className={cn(
                                                    "text-xs",
                                                    step >= s.id ? "text-white/70" : "text-white/40"
                                                )}>
                                                    {s.subtitle}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Main Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-sm relative md:max-w-md"
                style={{ perspective: 1500 }}
            >
                <motion.div
                    className="relative"
                    style={{ rotateX: rotateXForm, rotateY: rotateYForm }}
                    onMouseMove={handleMouseMoveForm}
                    onMouseLeave={handleMouseLeaveForm}
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
                            {/* Mobile Step Tracking - Hidden on desktop */}
                            {isMobile && (
                                <>
                                    {/* Mobile logo (Campus Connect icon) */}
                                    <div className="text-center space-y-1 mb-5">
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", duration: 0.8 }}
                                            className="mx-auto w-10 h-10 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-500/20 to-rose-500/20"
                                        >
                                            <GraduationCap className="w-6 h-6 text-indigo-400" />
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        key={`step-tracker-${step}`}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex justify-center items-center gap-2 mb-6 text-white/70 font-semibold"
                                    >
                                        Step {step} of 3
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map((s) => (
                                                <motion.div
                                                    key={s}
                                                    className={cn(
                                                        "h-2 rounded-full",
                                                        step === s ? "w-6 bg-indigo-400" : "w-2 bg-white/30"
                                                    )}
                                                    layout
                                                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                </>
                            )}

                            {/* Sign up form content */}
                            <form onSubmit={handleSubmit} className="pointer-events-auto">
                                {/* Wrap renderStepContent in a div with fixed height */}
                                <div style={{ minHeight: FORM_CONTENT_MIN_HEIGHT, overflow: 'hidden' }}>
                                    <AnimatePresence mode="wait">
                                        {renderStepContent()}
                                    </AnimatePresence>
                                </div>
                            </form>

                            {/* Sign in link */}
                            <motion.p
                                className="text-center text-xs text-white/60 mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => router.push('/sign-in')}
                                    className="relative inline-block group/signin"
                                >
                                    <span className="relative z-10 text-indigo-400 group-hover/signin:text-rose-400 transition-colors duration-300 font-medium">
                                        Sign in
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-indigo-400 to-rose-400 group-hover/signin:w-full transition-all duration-300" />
                                </button>
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}