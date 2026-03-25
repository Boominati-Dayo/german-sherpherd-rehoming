"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Filter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PuppyCard } from "@/components/PuppyCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Puppy {
    id: string;
    name: string;
    breed: string;
    gender: string;
    age: string;
    status: "available" | "adopted" | "pending";
    image: string;
    fee: string;
    description: string;
}

interface PuppiesContainerProps {
    initialPuppies: Puppy[];
}

const CORE_BREEDS = ["Cavalier King Charles Spaniel"];

export function PuppiesContainer({ initialPuppies }: PuppiesContainerProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isFiltersOpen, setIsFiltersOpen] = useState(searchParams.toString() !== "");
    const [selectedBreed, setSelectedBreed] = useState<string>(searchParams.get("breed") || "All");
    const [selectedGender, setSelectedGender] = useState<string>(searchParams.get("gender") || "All");
    const [searchName, setSearchName] = useState(searchParams.get("name") || "");

    useEffect(() => {
        setSelectedBreed(searchParams.get("breed") || "All");
        setSelectedGender(searchParams.get("gender") || "All");
        setSearchName(searchParams.get("name") || "");
        if (searchParams.toString() !== "") setIsFiltersOpen(true);
    }, [searchParams]);

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "All" || value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`/puppies?${params.toString()}`, { scroll: false });
    };

    const filteredPuppies = useMemo(() => {
        return initialPuppies.filter(puppy => {
            if (selectedBreed !== "All" && puppy.breed !== selectedBreed) return false;
            if (selectedGender !== "All" && puppy.gender !== selectedGender) return false;
            if (searchName && !puppy.name.toLowerCase().includes(searchName.toLowerCase())) return false;
            return true;
        });
    }, [initialPuppies, selectedBreed, selectedGender, searchName]);

    const clearFilters = () => {
        setSelectedBreed("All");
        setSelectedGender("All");
        setSearchName("");
        router.push("/puppies", { scroll: false });
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section with Cavalier Background */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image Placeholder - User needs to add actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-forest-800 to-brand-forest-900">
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                
                {/* Decorative circles */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-orange-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-brand-orange-500/10 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Circle with Cavalier text */}
                        <div className="w-40 h-40 mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                            <span className="text-3xl font-black text-white uppercase tracking-wider">Cavalier</span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-4">
                            Available <span className="text-brand-orange-500">Cavaliers</span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-xl mx-auto">
                            Find your perfect companion from our loving Cavaliers
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Puppies Grid */}
            <div className="bg-brand-forest-50 py-16">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                    {/* Filters Toggle */}
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-brand-forest-600 font-medium">
                            {filteredPuppies.length} Cavalier{filteredPuppies.length !== 1 ? 's' : ''} available
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                            className="flex items-center gap-2 rounded-full border-2 h-10 px-4 text-xs font-bold"
                        >
                            <Filter className="w-4 h-4" />
                            {isFiltersOpen ? "Hide" : "Show"} Filters
                            {isFiltersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                    </div>

                    {/* Filters Panel */}
                    <AnimatePresence>
                        {isFiltersOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-white rounded-3xl p-6 mb-8 overflow-hidden shadow-lg"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black text-brand-forest-600 uppercase">Search by Name</Label>
                                        <Input
                                            placeholder="Search name..."
                                            value={searchName}
                                            onChange={(e) => {
                                                setSearchName(e.target.value);
                                                updateFilters("name", e.target.value);
                                            }}
                                            className="rounded-xl border-brand-forest-200 h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black text-brand-forest-600 uppercase">Gender</Label>
                                        <select
                                            value={selectedGender}
                                            onChange={(e) => {
                                                setSelectedGender(e.target.value);
                                                updateFilters("gender", e.target.value);
                                            }}
                                            className="w-full h-11 rounded-xl border border-brand-forest-200 px-4 text-sm font-medium"
                                        >
                                            <option value="All">All Genders</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="flex items-end">
                                        <Button
                                            onClick={clearFilters}
                                            variant="outline"
                                            className="w-full rounded-xl h-11 font-bold"
                                        >
                                            Clear Filters
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Puppies Grid */}
                    {filteredPuppies.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPuppies.map((puppy) => (
                                <PuppyCard key={puppy.id} puppy={puppy} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-brand-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-10 h-10 text-brand-forest-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-forest-700 mb-2">No Cavaliers Found</h3>
                            <p className="text-brand-forest-500 mb-6">Try adjusting your filters</p>
                            <Button
                                onClick={clearFilters}
                                className="rounded-full bg-brand-orange-700 text-white font-bold px-8"
                            >
                                View All Cavaliers
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
