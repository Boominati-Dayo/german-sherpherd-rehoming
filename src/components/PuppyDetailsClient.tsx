"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Truck, Home, PawPrint, Shield, Calendar, ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdoptionForm } from "@/components/AdoptionForm";
import { Modal } from "@/components/ui/Modal";
import { PuppyCard } from "@/components/PuppyCard";

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
        whyRehoming?: string;
        whatDogNeeds?: string;
        currentWeight?: string;
        expectedWeight?: string;
        height?: string;
        sizeCategory?: string;
        personalityTraits?: string[];
        goodWith?: string[];
        specialNeeds?: string;
        location?: string;
    };
    relatedPuppies: any[];
}

export function PuppyDetailsClient({ puppy, relatedPuppies }: PuppyDetailsClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const gallery = [puppy.image, ...(puppy.images || [])].filter(Boolean);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    const isAvailable = puppy.status === "available";

    return (
        <div className="min-h-screen bg-brand-black-50 pt-24 pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link href="/puppies" className="inline-flex items-center text-sm font-bold text-brand-black-600 hover:text-brand-copper-700 mb-8 transition-all hover:gap-2 group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Puppies
                </Link>

                {/* Two Column - Image Left, Info Right */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
                    {/* Image Column - 2 cols */}
                    <div className="lg:col-span-2 space-y-4">
                        <div 
                            className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden bg-white shadow-lg cursor-pointer"
                            onClick={() => setIsFullscreenOpen(true)}
                        >
                            <Image
                                src={gallery[currentImageIndex]}
                                alt={`${puppy.name}`}
                                fill
                                className="object-cover"
                                priority
                            />

                            {gallery.length > 1 && (
                                <>
                                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-50 z-10">
                                        <ArrowLeft className="w-5 h-5 text-brand-black-800" />
                                    </button>
                                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-50 z-10">
                                        <ArrowRight className="w-5 h-5 text-brand-black-800" />
                                    </button>
                                </>
                            )}

                            <div className="absolute top-4 left-4 z-10">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                                    isAvailable ? "bg-green-600 text-white" : "bg-gray-500 text-white"
                                }`}>
                                    {puppy.status}
                                </span>
                            </div>
                        </div>

                        {gallery.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {gallery.map((img, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setCurrentImageIndex(idx)} 
                                        className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative border-2 ${currentImageIndex === idx ? "border-brand-copper-500" : "border-transparent opacity-60 hover:opacity-100"}`}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Quick Stats Row */}
                        <div className="grid grid-cols-3 gap-2">
                            {puppy.age && (
                                <div className="bg-white p-3 rounded-xl text-center shadow-sm">
                                    <Calendar className="w-4 h-4 mx-auto mb-1 text-brand-copper-600" />
                                    <p className="text-xs font-bold text-brand-black-600">{puppy.age}</p>
                                </div>
                            )}
                            {puppy.gender && (
                                <div className="bg-white p-3 rounded-xl text-center shadow-sm">
                                    <PawPrint className="w-4 h-4 mx-auto mb-1 text-brand-copper-600" />
                                    <p className="text-xs font-bold text-brand-black-600">{puppy.gender}</p>
                                </div>
                            )}
                            {puppy.sizeCategory && (
                                <div className="bg-white p-3 rounded-xl text-center shadow-sm">
                                    <Shield className="w-4 h-4 mx-auto mb-1 text-brand-copper-600" />
                                    <p className="text-xs font-bold text-brand-black-600">{puppy.sizeCategory}</p>
                                </div>
                            )}
                        </div>

                        {/* Personality */}
                        {puppy.personalityTraits && puppy.personalityTraits.length > 0 && (
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-xs font-bold text-brand-black-500 uppercase mb-2">Personality</p>
                                <div className="flex flex-wrap gap-1">
                                    {puppy.personalityTraits.map((trait: string) => (
                                        <span key={trait} className="bg-brand-copper-100 text-brand-copper-700 px-2 py-1 rounded-full text-xs font-bold">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Good With */}
                        {puppy.goodWith && puppy.goodWith.length > 0 && (
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-xs font-bold text-brand-black-500 uppercase mb-2">Good With</p>
                                <div className="flex flex-wrap gap-1">
                                    {puppy.goodWith.includes("Children") && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Kids</span>}
                                    {puppy.goodWith.includes("Other Dogs") && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Dogs</span>}
                                    {puppy.goodWith.includes("Cats") && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Cats</span>}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info Column - 3 cols */}
                    <div className="lg:col-span-3 space-y-6">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-black text-brand-black-900 uppercase tracking-tight mb-2">
                                {puppy.name}
                            </h1>
                            {puppy.location && (
                                <p className="text-brand-black-500 flex items-center gap-1">
                                    <Home className="w-4 h-4" /> {puppy.location}
                                </p>
                            )}
                        </div>

                        {isAvailable && (
                            <div className="inline-block bg-brand-copper-700 px-6 py-3 rounded-xl">
                                <p className="text-2xl font-bold text-white">{puppy.fee}</p>
                            </div>
                        )}

                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <p className="text-brand-black-700 leading-relaxed">{puppy.description}</p>
                        </div>

                        {puppy.whyRehoming && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-brand-copper-500">
                                <h3 className="font-bold text-brand-black-900 uppercase mb-2">Looking for a New Home</h3>
                                <p className="text-brand-black-600">{puppy.whyRehoming}</p>
                            </div>
                        )}

                        {puppy.whatDogNeeds && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm">
                                <h3 className="font-bold text-brand-black-900 uppercase mb-2">What {puppy.name} Needs</h3>
                                <p className="text-brand-black-600">{puppy.whatDogNeeds}</p>
                            </div>
                        )}

                        {puppy.specialNeeds && (
                            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-300">
                                <h3 className="font-bold text-yellow-800 uppercase mb-2">Special Needs / Notes</h3>
                                <p className="text-yellow-700">{puppy.specialNeeds}</p>
                            </div>
                        )}

                        {isAvailable && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm">
                                <p className="text-sm text-brand-black-500 mb-4 flex items-center gap-2">
                                    <Truck className="w-4 h-4" /> Transport fee varies by location
                                </p>
                                <Button onClick={() => setIsModalOpen(true)} className="w-full bg-brand-copper-700 hover:bg-brand-copper-600 rounded-full h-12 font-bold uppercase">
                                    Apply to Adopt
                                </Button>
                            </div>
                        )}

                        {!isAvailable && (
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-center">
                                <p className="font-bold text-green-700">Adopted</p>
                                <p className="text-brand-black-500">This German Shepherd has found their forever home!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Puppies - Horizontal scroll */}
                {relatedPuppies && relatedPuppies.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-brand-black-200">
                        <h2 className="text-2xl font-black text-brand-black-900 uppercase mb-8">
                            You Might Also Like
                        </h2>
                        <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
                            {relatedPuppies.map((p) => (
                                <div key={p.id} className="flex-none w-72 sm:w-80 snap-center">
                                    <PuppyCard puppy={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Adopt ${puppy.name}`}>
                    <AdoptionForm puppyName={puppy.name} puppyId={puppy.id} onSuccess={() => setIsModalOpen(false)} />
                </Modal>

                {/* Fullscreen Image Modal */}
                {isFullscreenOpen && (
                    <div 
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                        onClick={() => setIsFullscreenOpen(false)}
                    >
                        <button 
                            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full"
                            onClick={() => setIsFullscreenOpen(false)}
                        >
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {gallery.length > 1 && (
                            <>
                                <button 
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full"
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                                <button 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full"
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                >
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                        <div className="relative w-full h-full max-w-4xl max-h-[80vh] p-8">
                            <Image
                                src={gallery[currentImageIndex]}
                                alt={`${puppy.name}`}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                            {currentImageIndex + 1} / {gallery.length}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}