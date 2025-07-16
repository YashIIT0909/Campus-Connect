'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { motion, cubicBezier } from "framer-motion";

export function AboutUsSection() {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: i * 0.2,
                ease: cubicBezier(0.25, 0.4, 0.25, 1),
            },
        }),
    };

    return (
        <section id="about" className="w-full bg-[#030303] relative overflow-hidden py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03]" />

            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="rgba(99, 102, 241, 0.3)"
            />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left content */}
                    <div className="flex-1 space-y-8">
                        <motion.div
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                                    About Campus Connect
                                </span>
                            </h2>

                            <div className="flex flex-wrap items-center gap-2 text-lg md:text-xl text-white/80">
                                <span>Making campus life</span>
                                <ContainerTextFlip
                                    words={["safer", "easier", "connected", "better"]}
                                    className="text-lg md:text-xl px-3 py-1"
                                    interval={2500}
                                />
                                <span>for everyone</span>
                            </div>
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <p className="text-white/70 text-lg leading-relaxed">
                                Campus Connect is more than just a lost and found platform – it's a community-driven solution
                                designed specifically for college students and staff. We understand the unique challenges of
                                campus life and the frustration of losing important belongings.
                            </p>

                            <p className="text-white/60 leading-relaxed">
                                Founded by students who experienced the pain of losing valuable items, we've created a secure,
                                intuitive platform that brings our campus community together. From textbooks and laptops to
                                keys and personal items, we help reunite you with what matters most.
                            </p>
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-6 pt-6"
                        >

                            {/* Add other stats here if needed, e.g.: */}
                            {/* <div className="space-y-2">
                <h3 className="text-2xl font-bold text-indigo-300">100+</h3>
                <p className="text-white/60 text-sm">Active Users</p>
              </div> */}
                        </motion.div>
                    </div>

                    {/* Right content - 3D Scene */}
                    {/* This is the *only* SplineScene that should be rendered for the right content. */}
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex-1 relative hidden lg:block self-start mt-[-50px]"
                    >
                        <div className="w-full h-[600px] relative">
                            {/* Removed the absolute inset div that was creating the background and border,
        and likely interfering with interaction. */}
                            <SplineScene
                                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                // Removed rounded-2xl to remove the rounded border, and ensured it fills the parent div.
                                className="w-full h-full"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Mission Statement */}
                <motion.div
                    custom={4}
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-20 text-center max-w-4xl mx-auto"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-rose-300">
                            Our Mission
                        </span>
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                        To create a trusted, secure, and efficient platform where every lost item has the best chance
                        of finding its way home. We believe in the power of community and technology working together
                        to solve real-world problems that affect students' daily lives.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}