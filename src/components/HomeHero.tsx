"use client";

import { motion } from "framer-motion";
import { PawPrint, Heart, ArrowRight, Bone, Dog } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HomeHero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/homeHeroImage.jpg"
                    alt="Rebecca Herman with Cavalier"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-forest-900/90 via-brand-forest-900/80 to-brand-forest-900/60" />
            </div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-32 left-[10%] opacity-10">
                    <Bone className="w-16 h-16 text-white" />
                </div>
                <div className="absolute top-48 right-[15%] opacity-10">
                    <Dog className="w-24 h-24 text-white" />
                </div>
                <div className="absolute bottom-32 left-[20%] opacity-10">
                    <PawPrint className="w-20 h-20 text-white" />
                </div>
                <div className="absolute bottom-48 right-[25%] opacity-10">
                    <Bone className="w-12 h-12 text-white" />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center min-h-[calc(100vh-80px)] py-12">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
                            Finding Forever
                            <br />
                            <span className="text-brand-orange-500">Together</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
                            I connect loving families with beautiful Cavalier King Charles Spaniels who are ready to fill your home with unconditional love.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/puppies"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-orange-800 transition-all hover:scale-105 shadow-xl"
                            >
                                Meet Our Cavaliers
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold uppercase tracking-wider rounded-full hover:bg-white/10 transition-all"
                            >
                                <Bone className="w-4 h-4" />
                                My Story
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 justify-center mt-12 pt-8 border-t border-white/10">
                            <div>
                                <p className="text-3xl font-black text-brand-orange-500">40+</p>
                                <p className="text-sm text-white/50 font-medium uppercase tracking-wider">Happy Families</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-brand-orange-500">10+</p>
                                <p className="text-sm text-white/50 font-medium uppercase tracking-wider">Years Experience</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-brand-orange-500">50+</p>
                                <p className="text-sm text-white/50 font-medium uppercase tracking-wider">Cavaliers Placed</p>
                            </div>
                        </div>
                    </motion.div>


                </div>
            </div>
        </section>
    );
}
