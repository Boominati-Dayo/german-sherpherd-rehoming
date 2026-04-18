"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface TransportIncludedCardProps {
    images: { id: string; image: string }[];
}

export function TransportIncludedCard({ images }: TransportIncludedCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    if (images.length === 0) {
        return (
            <div className="bg-gradient-to-br from-brand-copper-600/20 to-brand-black-800/50 rounded-3xl p-8">
                <h3 className="text-xl font-black uppercase mb-6 text-center">What's Included</h3>
                <div className="space-y-4">
                    {[
                        "Door-to-door service within 500 miles",
                        "One-on-one transport (no shared rides)",
                        "Regular photo and video updates",
                        "Food and water provided",
                        "Comfort stops every 2-3 hours",
                        "Fully insured transport",
                        "Experienced German Shepherd handlers",
                        "Climate-controlled vehicles"
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-brand-copper-500 shrink-0" />
                            <span className="text-white/80">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative rounded-3xl overflow-hidden min-h-[400px]">
            {/* Background Image with fade transition */}
            {images.map((img, idx) => (
                <div
                    key={img.id}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{ opacity: idx === currentImageIndex ? 1 : 0 }}
                >
                    <Image
                        src={img.image}
                        alt="Pet nanny transport"
                        fill
                        className="object-cover"
                    />
                </div>
            ))}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-black-900/80 via-brand-black-900/70 to-brand-black-900/80" />

            {/* Content */}
            <div className="relative z-10 p-8">
                <h3 className="text-xl font-black uppercase mb-6 text-center text-white">What's Included</h3>
                <div className="space-y-4">
                    {[
                        "Door-to-door service within 500 miles",
                        "One-on-one transport (no shared rides)",
                        "Regular photo and video updates",
                        "Food and water provided",
                        "Comfort stops every 2-3 hours",
                        "Fully insured transport",
                        "Experienced German Shepherd handlers",
                        "Climate-controlled vehicles"
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-brand-copper-500 shrink-0" />
                            <span className="text-white/90">{item}</span>
                        </div>
                    ))}
                </div>

                {/* Image indicators */}
                {images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    idx === currentImageIndex 
                                        ? "bg-brand-copper-500 w-4" 
                                        : "bg-white/30 hover:bg-white/50"
                                }`}
                                aria-label={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
