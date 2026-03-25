"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ArrowLeft, ArrowRight, Heart, ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdoptionForm } from "@/components/AdoptionForm";
import { Modal } from "@/components/ui/Modal";
import { PuppyCard } from "@/components/PuppyCard";
import { motion, AnimatePresence } from "framer-motion";

interface PuppyDetailsClientProps {
    puppy: {
        id: string;
        name: string;
        breed: string;
        age: string;
        gender: string;
        image: string;
        images: string[];
        status: string;
        fee: string;
        nannyFee: string;
        description: string;
        story: string;
    };
    relatedPuppies: any[];
}

export function PuppyDetailsClient({ puppy, relatedPuppies }: PuppyDetailsClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const gallery = [puppy.image, ...(puppy.images || [])].filter(Boolean);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    return (
        <div className="bg-brand-forest-50 min-h-screen pt-24 pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link href="/puppies" className="inline-flex items-center text-sm font-bold text-brand-forest-700 hover:text-brand-forest-700 mb-8 transition-all hover:gap-2 group bg-white px-4 py-2 rounded-full shadow-md">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Available Cavaliers
                </Link>

                {/* Hero / Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10 sm:mb-16">
                    {/* Image Carousel Column */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-white-300 group ring-1 ring-brand-white-400">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={gallery[currentImageIndex]}
                                        alt={`${puppy.name} - image ${currentImageIndex + 1}`}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {gallery.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm text-brand-forest-700 shadow-lg hover:bg-brand-forest-700 hover:text-white transition-all z-10"
                                    >
                                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm text-brand-forest-700 shadow-lg hover:bg-brand-forest-700 hover:text-white transition-all z-10"
                                    >
                                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                    {/* Pagination indicator */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-brand-forest-900/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest z-10">
                                        {currentImageIndex + 1} / {gallery.length}
                                    </div>
                                </>
                            )}

                        </div>

                        {/* Thumbnails */}
                        {gallery.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar px-1">
                                {gallery.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${currentImageIndex === index ? "border-brand-orange-700 scale-105 shadow-md" : "border-brand-white-400 opacity-60"
                                            }`}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Column */}
                    <div className="flex flex-col justify-center">
                        <span className="inline-block px-4 py-1.5 bg-brand-orange-600 text-white rounded-full text-xs font-black uppercase tracking-wider w-fit mb-4">
                            {puppy.status}
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-forest-900 mb-4 sm:mb-6 uppercase tracking-tight">
                            {puppy.name}
                        </h1>
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="bg-brand-forest-100 text-brand-forest-700 px-4 py-2 rounded-full font-bold text-sm border border-brand-forest-200">{puppy.age}</span>
                            <span className="bg-brand-forest-100 text-brand-forest-700 px-4 py-2 rounded-full font-bold text-sm border border-brand-forest-200">{puppy.gender}</span>
                            {puppy.status === "available" && <span className="bg-brand-orange-100 text-brand-orange-700 px-4 py-2 rounded-full font-bold text-sm border border-brand-orange-200">Fee: {puppy.fee}</span>}
                        </div>
                        {puppy.status === "available" && (
                            <div className="mb-8 flex items-center gap-2 bg-brand-forest-50 p-4 rounded-2xl border border-brand-forest-200">
                                <Truck className="w-5 h-5 text-brand-orange-600" />
                                <span className="text-sm font-medium text-brand-forest-700">Final delivery fee depends on your location</span>
                            </div>
                        )}

                        <div className="mb-8 sm:mb-10">
                            <h3 className="text-xl sm:text-2xl font-black text-brand-forest-900 mb-4 uppercase">About {puppy.name}</h3>
                            <p className="text-brand-forest-600 text-base sm:text-lg leading-relaxed italic mb-8">{puppy.description}</p>

                            <h3 className="text-xl sm:text-2xl font-black text-brand-orange-600 mb-4 uppercase">Why Rehoming?</h3>
                            <div className="bg-brand-orange-50 p-6 sm:p-8 rounded-3xl border border-brand-orange-200 relative">
                                <Heart className="w-6 h-6 text-brand-orange-600 absolute -top-3 -left-3 bg-white rounded-full p-1 shadow-md" />
                                <p className="text-brand-forest-700 text-base sm:text-lg italic leading-relaxed">{puppy.story}</p>
                            </div>
                        </div>

                        {/* CTA / Modal Trigger */}
                        {puppy.status === "available" ? (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-brand-forest-100">
                                <h4 className="text-xl font-black text-brand-forest-900 mb-3 uppercase">Meet {puppy.name}</h4>
                                <p className="text-brand-forest-600 mb-6">Start the journey by filling out our adoption application.</p>
                                <Button onClick={() => setIsModalOpen(true)} className="w-full bg-brand-orange-700 hover:bg-brand-orange-800 rounded-full h-14 text-base font-black uppercase tracking-wider">
                                    Apply to Adopt
                                </Button>
                            </div>
                        ) : (
                            <div className="bg-brand-forest-100 p-8 rounded-3xl text-center border border-brand-forest-200">
                                <p className="text-lg sm:text-xl font-bold text-brand-forest-700">Found a forever home.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Puppies Section */}
                {relatedPuppies && relatedPuppies.length > 0 && (
                    <div className="mt-20 sm:mt-32 border-t border-brand-forest-100 pt-16 sm:pt-20">
                        <div className="flex items-end justify-between mb-8 sm:mb-12 px-4 lg:px-0">
                            <div>
                                <h2 className="text-xl sm:text-4xl font-black text-brand-forest-900 tracking-tight uppercase">You Might Also <span className="text-brand-orange-600">Like</span></h2>
                                <p className="text-brand-forest-600 mt-1 sm:mt-3 text-sm sm:text-lg italic font-medium">More Cavaliers waiting for their forever homes</p>
                            </div>
                            <Link href="/puppies" className="text-[10px] sm:text-sm font-black text-brand-orange-600 hover:text-brand-orange-700 transition-all flex items-center gap-1.5 sm:gap-2 group mb-1 uppercase tracking-widest">
                                View all
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="flex gap-6 overflow-x-auto pb-4 px-4 snap-x">
                            {relatedPuppies.map((relatedPuppy) => (
                                <div key={relatedPuppy.id} className="flex-none w-72 sm:w-80 snap-center">
                                    <PuppyCard puppy={relatedPuppy} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Modal for Adoption Form */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Adoption Application for ${puppy.name}`}>
                    <AdoptionForm puppyName={puppy.name} puppyId={puppy.id} onSuccess={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </div>
    );
}
