"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
    name: string;
    text: string;
    location: string;
    rating: number;
    image: string | null;
}

interface TestimonialsSliderProps {
    testimonials: Testimonial[];
}

export function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying || !isReady) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
                const len = Array.isArray(testimonials) ? testimonials.length : 0;
                if (len === 0) return 0;
                return (prev + 1) % len;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, isReady, testimonials]);

    const isValid = isReady && Array.isArray(testimonials) && testimonials.length > 0;
    const safeIndex = isValid ? Math.min(Math.max(0, currentIndex), testimonials.length - 1) : 0;
    const current = isValid ? testimonials[safeIndex] : null;
    const nextIndex = isValid ? (safeIndex + 1) % testimonials.length : 0;
    const next = isValid ? testimonials[nextIndex] : null;

    if (!isValid || !current) {
        return null;
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="relative">
            {/* Large screens: 2 cards, Small screens: 1 card */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6">
                {/* Current - Main */}
                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: current.image ? `url(${current.image})` : undefined }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-900 via-brand-forest-900/70 to-transparent" />
                    <div className="absolute inset-0 flex items-end pb-8 px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full"
                        >
                            <div className="flex gap-1 mb-3">
                                {Array.from({ length: Math.floor(current.rating || 5) }).map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-white text-xl font-medium italic mb-4 leading-relaxed">"{current.text}"</p>
                            <div className="flex items-center gap-3">
                                {current.image && (
                                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30">
                                        <img src={current.image} alt={current.name} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div>
                                    <p className="text-white font-bold">{current.name}</p>
                                    <p className="text-white/60 text-sm">{current.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Next - Secondary */}
                {testimonials.length > 1 && next && (
                    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl opacity-80 hover:opacity-100 transition-opacity">
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: next.image ? `url(${next.image})` : undefined }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-900 via-brand-forest-900/70 to-transparent" />
                        <div className="absolute inset-0 flex items-end pb-8 px-8">
                            <div className="w-full">
                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: Math.floor(next.rating || 5) }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-white text-lg font-medium italic mb-4 leading-relaxed line-clamp-3">"{next.text}"</p>
                                <div className="flex items-center gap-3">
                                    {next.image && (
                                        <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/30">
                                            <img src={next.image} alt={next.name} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-white font-bold text-sm">{next.name}</p>
                                        <p className="text-white/60 text-xs">{next.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile: Single card */}
            <div className="lg:hidden relative h-[350px] rounded-3xl overflow-hidden" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: current.image ? `url(${current.image})` : undefined }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-900 via-brand-forest-900/70 to-transparent" />
                <div className="absolute inset-0 flex items-end pb-8 px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={safeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <div className="flex gap-1 mb-3">
                                {Array.from({ length: Math.floor(current.rating || 5) }).map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-white text-lg font-medium italic mb-4 leading-relaxed">"{current.text}"</p>
                            <div className="flex items-center gap-3">
                                {current.image && (
                                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30">
                                        <img src={current.image} alt={current.name} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div>
                                    <p className="text-white font-bold">{current.name}</p>
                                    <p className="text-white/60 text-sm">{current.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {testimonials.length > 1 && (
                    <>
                        <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-2 rounded-full transition-all ${idx === safeIndex ? "bg-white w-6" : "bg-white/40 w-2"}`} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Navigation for large screens */}
            {testimonials.length > 1 && (
                <div className="hidden lg:flex justify-center gap-4 mt-6">
                    <button onClick={prevSlide} className="p-3 rounded-full bg-brand-forest-100 text-brand-forest-700 hover:bg-brand-forest-200">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextSlide} className="p-3 rounded-full bg-brand-forest-100 text-brand-forest-700 hover:bg-brand-forest-200">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
