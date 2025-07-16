"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChromeGrid } from '@/components/ui/chrome-grid';
import { LumaSpin } from '@/components/ui/luma-spin';
import { SignUpForm } from '@/components/ui/sign-up-form';

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Simulate loading time (optional)
        const timer = setTimeout(() => {
            // Only hide loader if both components are ready

            setIsLoading(false);

        }, 2000);

        return () => clearTimeout(timer);
    }, []);



    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <LumaSpin />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/70 text-sm"
                    >
                        Loading Campus Connect...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* 3D Chrome Grid Background */}
            <div className="absolute inset-0 z-0">
                <ChromeGrid />
            </div>

            {/* Sign Up Form */}
            <SignUpForm />
        </div>
    );
}

export default SignUp;