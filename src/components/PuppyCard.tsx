import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Heart } from "lucide-react";

interface PuppyProps {
    id: string;
    name: string;
    breed: string;
    age: string;
    image: string;
    status: "available" | "adopted" | "pending";
    description: string;
    location?: string;
    personalityTraits?: string[];
    sizeCategory?: string;
}

export function PuppyCard({ puppy }: { puppy: PuppyProps }) {
    const isAvailable = puppy.status === "available";
    const isAdopted = puppy.status === "adopted";
    
    return (
        <Link href={`/puppies/${puppy.id}`} className={`block ${isAdopted ? 'pointer-events-none' : ''}`}>
            <div className={`bg-white rounded-3xl overflow-hidden border border-brand-black-100 hover:border-brand-copper-200 transition-all duration-500 group hover:-translate-y-3 h-full flex flex-col ${isAdopted ? 'opacity-75' : ''}`}>
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                        src={puppy.image}
                        alt={puppy.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                            isAvailable 
                                ? "bg-brand-copper-700 text-white" 
                                : isAdopted
                                ? "bg-green-600 text-white"
                                : "bg-gray-500 text-white"
                        }`}>
                            {puppy.status}
                        </span>
                    </div>

                    {/* Quick View Button - appears on hover */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    {/* Name & Info on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 drop-shadow-lg">{puppy.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-white/90 text-sm font-medium">
                            <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                <Star className="w-3.5 h-3.5 text-brand-copper-400" />
                                {puppy.age}
                            </span>
                            {puppy.sizeCategory && (
                                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">{puppy.sizeCategory}</span>
                            )}
                            {puppy.location && (
                                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">{puppy.location}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col bg-gradient-to-b from-white to-brand-black-50">
                    <p className="text-brand-black-600 text-sm italic line-clamp-2 mb-4 flex-grow leading-relaxed">
                        "{puppy.description}"
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-brand-black-100">
                        <span className="text-xs font-bold text-brand-copper-700 uppercase tracking-wider">View Details</span>
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-copper-100 to-brand-copper-50 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-copper-600 group-hover:to-brand-copper-700 transition-all duration-300">
                            <ArrowRight className="w-4 h-4 text-brand-copper-600 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
