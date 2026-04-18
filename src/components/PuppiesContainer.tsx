"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Filter, Heart, PawPrint, Search } from "lucide-react";
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
    adoptedPuppies?: Puppy[];
}

export function PuppiesContainer({ initialPuppies, adoptedPuppies = [] }: PuppiesContainerProps) {
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
            {/* Hero Section - Dark */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-brand-black-900 border-b border-brand-copper-700/30">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-copper-700/10 rounded-full -mr-40 -mt-40 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-copper-700/5 rounded-full -ml-20 -mb-20 blur-3xl" />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <PawPrint className="w-24 h-24 absolute top-20 left-[10%] text-brand-copper-500" />
                    <PawPrint className="w-16 h-16 absolute top-40 right-[20%] text-brand-copper-400" />
                    <PawPrint className="w-20 h-20 absolute bottom-32 left-[30%] text-brand-copper-500" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-copper-700 rounded-full mb-6">
                            <PawPrint className="w-4 h-4 text-white" />
                            <span className="text-sm font-bold text-white">Available Now</span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-4">
                            Our <span className="text-brand-copper-500">German Shepherds</span>
                        </h1>
                        <p className="text-xl text-brand-copper-200 max-w-xl mx-auto">
                            Find your perfect companion
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Puppies Grid - White background */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                    {/* Header with count and filters toggle */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <p className="text-brand-black-600 font-medium">
                                {filteredPuppies.length} available
                            </p>
                            <span className="w-2 h-2 bg-brand-copper-500 rounded-full animate-pulse" />
                        </div>
                        <Button
                            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                            className="flex items-center gap-2 rounded-full border-2 border-brand-copper-600 text-brand-copper-700 hover:bg-brand-copper-50 h-10 px-4 text-xs font-bold"
                        >
                            <Filter className="w-4 h-4" />
                            {isFiltersOpen ? "Hide" : "Show"} Filters
                            {isFiltersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                    </div>

                    {/* Filters Panel - White themed */}
                    <AnimatePresence>
                        {isFiltersOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-brand-black-50 rounded-3xl p-6 mb-8 overflow-hidden"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black text-brand-black-600 uppercase">Search by Name</Label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-copper-400" />
                                            <Input
                                                placeholder="Search name..."
                                                value={searchName}
                                                onChange={(e) => {
                                                    setSearchName(e.target.value);
                                                    updateFilters("name", e.target.value);
                                                }}
                                                className="pl-10 rounded-xl h-11"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black text-brand-black-600 uppercase">Gender</Label>
                                        <select
                                            value={selectedGender}
                                            onChange={(e) => {
                                                setSelectedGender(e.target.value);
                                                updateFilters("gender", e.target.value);
                                            }}
                                            className="w-full h-11 rounded-xl border border-brand-black-200 px-4 text-sm font-medium"
                                        >
                                            <option value="All">All Genders</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="flex items-end">
                                        <Button
                                            onClick={clearFilters}
                                            className="w-full rounded-xl h-11 font-bold bg-brand-copper-700 hover:bg-brand-copper-600"
                                        >
                                            Clear All
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
                        <div className="text-center py-16 bg-brand-black-50 rounded-3xl">
                            <div className="w-20 h-20 bg-brand-copper-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-10 h-10 text-brand-copper-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-black-900 mb-2">No German Shepherds Found</h3>
                            <p className="text-brand-black-500 mb-6">Try adjusting your filters</p>
                            <Button
                                onClick={clearFilters}
                                className="rounded-full bg-brand-copper-700 text-white font-bold px-8"
                            >
                                View All
                            </Button>
                        </div>
                    )}

                    {/* Adopted Puppies Section */}
                    {adoptedPuppies.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-brand-black-200">
                            <h3 className="text-2xl sm:text-3xl font-black text-brand-black-900 uppercase mb-2">
                                Already <span className="text-brand-copper-600">Adopted</span>
                            </h3>
                            <p className="text-brand-black-600 mb-8">These beautiful German Shepherds have found their forever homes.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {adoptedPuppies.map((puppy) => (
                                    <PuppyCard key={puppy.id} puppy={puppy} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}