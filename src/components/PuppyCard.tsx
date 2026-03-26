import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

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
            <div className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 h-full flex flex-col ${isAdopted ? 'opacity-75' : 'hover:-translate-y-2'}`}>
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                        src={puppy.image}
                        alt={puppy.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                            isAvailable 
                                ? "bg-brand-orange-600 text-white" 
                                : isAdopted
                                ? "bg-green-600 text-white"
                                : "bg-gray-500 text-white"
                        }`}>
                            {puppy.status}
                        </span>
                    </div>

                    {/* Name & Info on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{puppy.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-white/80 text-sm font-medium">
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {puppy.age}
                            </span>
                            {puppy.sizeCategory && (
                                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{puppy.sizeCategory}</span>
                            )}
                            {puppy.location && (
                                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{puppy.location}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-grow flex flex-col">
                    <p className="text-brand-forest-600 text-sm italic line-clamp-2 mb-4 flex-grow">
                        "{puppy.description}"
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-brand-forest-100">
                        <span className="text-xs font-bold text-brand-forest-500 uppercase tracking-wider">View Details</span>
                        <div className="w-8 h-8 bg-brand-orange-100 rounded-full flex items-center justify-center group-hover:bg-brand-orange-600 transition-colors">
                            <ArrowRight className="w-4 h-4 text-brand-orange-600 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
