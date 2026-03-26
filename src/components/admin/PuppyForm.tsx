"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Upload, X, Plus, Star, Image as ImageIcon } from "lucide-react";

interface PuppyData {
    _id?: string;
    name: string;
    breed: string;
    age: string;
    gender: "Male" | "Female";
    image: string;
    images: string[];
    status: "available" | "pending" | "adopted";
    featured: boolean;
    fee: string;
    nannyFee: string;
    description: string;
    story: string;
    whyRehoming: string;
    whatDogNeeds: string;
    currentWeight: string;
    expectedWeight: string;
    height: string;
    sizeCategory: string;
    personalityTraits: string[];
    goodWith: string[];
    specialNeeds: string;
    location: string;
}

interface PuppyFormProps {
    initialData?: PuppyData;
    onSuccess: () => void;
    onCancel: () => void;
}

export function PuppyForm({ initialData, onSuccess, onCancel }: PuppyFormProps) {
    const [formData, setFormData] = useState<PuppyData>(
        initialData || {
            name: "",
            breed: "",
            age: "",
            gender: "Male",
            image: "",
            images: [],
            status: "available",
            featured: false,
            fee: "",
            nannyFee: "",
            description: "",
            story: "",
            whyRehoming: "",
            whatDogNeeds: "",
            currentWeight: "",
            expectedWeight: "",
            height: "",
            sizeCategory: "",
            personalityTraits: [],
            goodWith: [],
            specialNeeds: "",
            location: "",
        }
    );
    const [loading, setLoading] = useState(false);
    const [linkInput, setLinkInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleAddLink = () => {
        if (!linkInput.trim()) return;
        setFormData({ ...formData, images: [...formData.images, linkInput.trim()] });
        setLinkInput("");
        toast.success("Link added to gallery");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = initialData ? `/api/puppies/${initialData._id}` : "/api/puppies";
        const method = initialData ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success(initialData ? "Puppy updated successfully!" : "Puppy added successfully!");
                onSuccess();
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || "Failed to save puppy");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while saving");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Column: Details */}
                <div className="p-6 sm:p-8 lg:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-brand-white-400">
                    <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-brand-orange-700" />
                        <h3 className="text-xl font-black text-brand-forest-900 uppercase tracking-tight">Puppy Information</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Name</Label>
                            <Input id="name" value={formData.name} onChange={handleChange} className="rounded-xl border-brand-white-400 h-11" placeholder="e.g. Charlie" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="breed" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Breed</Label>
                            <Input id="breed" value={formData.breed} onChange={handleChange} className="rounded-xl border-brand-white-400 h-11" placeholder="e.g. Cavalier King Charles Spaniel" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="age" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Age</Label>
                            <Input id="age" value={formData.age} onChange={handleChange} className="rounded-xl border-brand-white-400 h-11" placeholder="e.g. 3 months" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Gender</Label>
                            <select
                                id="gender"
                                className="flex h-11 w-full rounded-xl border border-brand-white-400 bg-white px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-brand-forest-100 transition-all outline-none"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div className="space-y-2 text-center lg:text-left">
                            <Label htmlFor="status" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Status</Label>
                            <select
                                id="status"
                                className="flex h-11 w-full rounded-xl border border-brand-white-400 bg-white px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-brand-forest-100 transition-all outline-none"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="available">Available</option>
                                <option value="pending">Pending</option>
                                <option value="adopted">Adopted</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fee" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Adoption Fee</Label>
                            <Input id="fee" value={formData.fee} onChange={handleChange} className="rounded-xl border-brand-white-400 h-11" placeholder="$1,500" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nannyFee" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Nanny Fee</Label>
                            <Input id="nannyFee" value={formData.nannyFee} onChange={handleChange} className="rounded-xl border-brand-white-400 h-11" placeholder="$350" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            className="w-5 h-5 rounded border-brand-white-400 text-brand-orange-700 focus:ring-brand-orange-500"
                        />
                        <Label htmlFor="featured" className="text-sm font-bold text-brand-forest-900 cursor-pointer">Feature on homepage</Label>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Description</Label>
                        <Textarea id="description" value={formData.description} onChange={handleChange} className="rounded-2xl border-brand-white-400 min-h-[100px] py-3" placeholder="Tell us about the puppy's personality..." />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="story" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Rehoming Story</Label>
                        <Textarea id="story" value={formData.story} onChange={handleChange} className="rounded-2xl border-brand-white-400 min-h-[100px] py-3" placeholder="Why is this puppy being rehomed?" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Location (City, State)</Label>
                        <Input id="location" value={formData.location} onChange={handleChange} className="rounded-xl border-brand-white-400 h-11" placeholder="e.g. Helltown, Ohio" />
                    </div>

                    {/* Physical Details */}
                    <div className="pt-4 border-t border-brand-white-400">
                        <h4 className="text-sm font-black uppercase text-brand-orange-700 mb-4">Physical Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentWeight" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Current Weight</Label>
                                <Input id="currentWeight" value={formData.currentWeight} onChange={handleChange} className="rounded-xl border-brand-white-400 h-11" placeholder="e.g. 5.5 - 7 kg" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expectedWeight" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Expected Adult Weight</Label>
                                <Input id="expectedWeight" value={formData.expectedWeight} onChange={handleChange} className="rounded-xl border-brand-white-400 h-11" placeholder="e.g. 6 - 8 kg" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="height" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Height</Label>
                                <Input id="height" value={formData.height} onChange={handleChange} className="rounded-xl border-brand-white-400 h-11" placeholder="e.g. 28 - 32 cm" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sizeCategory" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Size Category</Label>
                                <select
                                    id="sizeCategory"
                                    className="flex h-11 w-full rounded-xl border border-brand-white-400 bg-white px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-brand-forest-100 transition-all outline-none"
                                    value={formData.sizeCategory}
                                    onChange={handleChange}
                                >
                                    <option value="">Select size...</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Rehoming Details */}
                    <div className="pt-4 border-t border-brand-white-400">
                        <h4 className="text-sm font-black uppercase text-brand-orange-700 mb-4">Rehoming Details</h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="whyRehoming" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Why Rehoming (Detailed)</Label>
                                <Textarea id="whyRehoming" value={formData.whyRehoming} onChange={handleChange} className="rounded-2xl border-brand-white-400 min-h-[80px] py-3" placeholder="Detailed story about why the dog needs a new home..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="whatDogNeeds" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">What This Dog Needs</Label>
                                <Textarea id="whatDogNeeds" value={formData.whatDogNeeds} onChange={handleChange} className="rounded-2xl border-brand-white-400 min-h-[80px] py-3" placeholder="What kind of home/environment is best for this dog..." />
                            </div>
                        </div>
                    </div>

                    {/* Personality & Good With */}
                    <div className="pt-4 border-t border-brand-white-400">
                        <h4 className="text-sm font-black uppercase text-brand-orange-700 mb-4">Personality & Compatibility</h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Personality Traits</Label>
                                <div className="flex flex-wrap gap-2">
                                    {["Affectionate", "Playful", "Calm", "Energetic", "Gentle", "Confident", "Curious", "Intelligent", "Loyal", "Social"].map((trait) => (
                                        <button
                                            key={trait}
                                            type="button"
                                            onClick={() => {
                                                const traits = formData.personalityTraits || [];
                                                if (traits.includes(trait)) {
                                                    setFormData({ ...formData, personalityTraits: traits.filter((t: string) => t !== trait) });
                                                } else {
                                                    setFormData({ ...formData, personalityTraits: [...traits, trait] });
                                                }
                                            }}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                                formData.personalityTraits?.includes(trait)
                                                    ? "bg-brand-orange-600 text-white"
                                                    : "bg-brand-white-200 text-brand-forest-700 hover:bg-brand-orange-100"
                                            }`}
                                        >
                                            {trait}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Good With</Label>
                                <div className="flex flex-wrap gap-2">
                                    {["Children", "Seniors", "Other Dogs", "Cats"].map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => {
                                                const goodWith = formData.goodWith || [];
                                                if (goodWith.includes(item)) {
                                                    setFormData({ ...formData, goodWith: goodWith.filter((g: string) => g !== item) });
                                                } else {
                                                    setFormData({ ...formData, goodWith: [...goodWith, item] });
                                                }
                                            }}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                                formData.goodWith?.includes(item)
                                                    ? "bg-green-600 text-white"
                                                    : "bg-brand-white-200 text-brand-forest-700 hover:bg-green-100"
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="specialNeeds" className="text-[10px] font-black uppercase tracking-widest text-brand-white-900">Special Needs / Notes</Label>
                                <Textarea id="specialNeeds" value={formData.specialNeeds} onChange={handleChange} className="rounded-2xl border-brand-white-400 min-h-[60px] py-3" placeholder="Any special requirements or notes..." />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Media */}
                <div className="p-6 sm:p-8 lg:p-10 bg-brand-white-200/50 space-y-8">
                    <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-5 h-5 text-brand-forest-700" />
                        <h3 className="text-xl font-black text-brand-forest-900 uppercase tracking-tight">Media Management</h3>
                    </div>

                    {/* Primary Image */}
                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-brand-white-900 block">Primary Display Image</Label>
                        <div className="relative group aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-brand-white-400 bg-white flex flex-col items-center justify-center transition-all hover:border-brand-forest-300">
                            {formData.image ? (
                                <>
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <div className="relative">
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;
                                                    const promise = (async () => {
                                                        const fd = new FormData();
                                                        fd.append("file", file);
                                                        const res = await fetch("/api/upload", { method: "POST", body: fd });
                                                        const data = await res.json();
                                                        if (data.success) {
                                                            setFormData((prev: PuppyData) => ({ ...prev, image: data.url }));
                                                            return "Image uploaded!";
                                                        }
                                                        throw new Error("Upload failed");
                                                    })();
                                                    toast.promise(promise, {
                                                        loading: "Uploading...",
                                                        success: (m) => m,
                                                        error: (e) => e.message
                                                    });
                                                }}
                                            />
                                            <Button type="button" size="sm" variant="outline" className="rounded-full flex items-center gap-2">
                                                <Upload className="w-4 h-4" /> Change
                                            </Button>
                                        </div>
                                        <Button type="button" size="sm" variant="destructive" className="rounded-full" onClick={() => setFormData({ ...formData, image: "" })}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-10 h-10 text-brand-white-400 mb-2" />
                                    <p className="text-xs text-brand-white-900 font-bold uppercase tracking-widest mb-4">Click to upload primary photo</p>
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const promise = (async () => {
                                                const fd = new FormData();
                                                fd.append("file", file);
                                                const res = await fetch("/api/upload", { method: "POST", body: fd });
                                                const data = await res.json();
                                                if (data.success) {
                                                    setFormData((prev: PuppyData) => ({ ...prev, image: data.url }));
                                                    return "Image uploaded!";
                                                }
                                                throw new Error("Upload failed");
                                            })();
                                            toast.promise(promise, {
                                                loading: "Uploading...",
                                                success: (m) => m,
                                                error: (e) => e.message
                                            });
                                        }}
                                    />
                                    <Button type="button" variant="outline" size="sm" className="rounded-full">Select File</Button>
                                </>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                id="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Or paste Image URL here..."
                                className="rounded-xl border-brand-white-400 h-11 text-xs"
                            />
                            {formData.image && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="rounded-xl h-11 w-11 shrink-0"
                                    onClick={() => setFormData({ ...formData, image: "" })}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-brand-white-900 block">Gallery Images</Label>

                        {/* Compact Link Field */}
                        <div className="flex gap-2">
                            <Input
                                value={linkInput}
                                onChange={(e) => setLinkInput(e.target.value)}
                                placeholder="Paste Image URL here..."
                                className="rounded-xl border-brand-white-400 h-11 text-xs flex-grow"
                            />
                            <Button type="button" onClick={handleAddLink} variant="outline" className="rounded-xl h-11 px-4 font-bold text-xs uppercase tracking-widest border-brand-forest-700 text-brand-forest-700 hover:bg-brand-forest-50">
                                Add link
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                            {(formData.images || []).filter(img => img && img.trim() !== "").map((img, index) => (
                                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-brand-white-400 bg-white group">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            className="h-8 w-8 rounded-full p-0"
                                            onClick={() => {
                                                const newUrl = prompt("Enter new image URL:", img);
                                                if (newUrl && newUrl !== img) {
                                                    const newImages = [...formData.images];
                                                    newImages[index] = newUrl;
                                                    setFormData({ ...formData, images: newImages });
                                                }
                                            }}
                                        >
                                            <Plus className="w-4 h-4 rotate-45" /> {/* Use Plus as edit icon for now or just generic */}
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="destructive"
                                            className="h-8 w-8 rounded-full p-0"
                                            onClick={() => {
                                                const newImages = formData.images.filter((_, i) => i !== index);
                                                setFormData({ ...formData, images: newImages });
                                            }}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {/* Main Bulk Upload Card */}
                            <div className="relative aspect-square rounded-2xl border-2 border-dashed border-brand-white-400 flex flex-col items-center justify-center gap-1 text-brand-white-900 hover:bg-white hover:border-brand-forest-300 transition-all cursor-pointer group">
                                <input
                                    type="file"
                                    multiple
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={async (e) => {
                                        const files = e.target.files;
                                        if (!files || files.length === 0) return;

                                        const uploadPromise = (async () => {
                                            const newUrls: string[] = [];
                                            for (let i = 0; i < files.length; i++) {
                                                const fd = new FormData();
                                                fd.append("file", files[i]);
                                                const res = await fetch("/api/upload", { method: "POST", body: fd });
                                                const data = await res.json();
                                                if (data.success) newUrls.push(data.url);
                                            }
                                            setFormData((prev: PuppyData) => ({
                                                ...prev,
                                                images: [...(prev.images || []), ...newUrls]
                                            }));
                                            return `${newUrls.length} images added!`;
                                        })();

                                        toast.promise(uploadPromise, {
                                            loading: "Uploading gallery...",
                                            success: (m) => m,
                                            error: "Some uploads failed"
                                        });
                                    }}
                                />
                                <Upload className="w-6 h-6 text-brand-white-400 group-hover:text-brand-forest-700 transition-colors" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-center px-2">Bulk Upload Files</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Footer */}
            <div className="p-4 sm:p-6 lg:p-8 bg-brand-white-300 border-t border-brand-white-400 flex flex-col sm:flex-row justify-end gap-4 items-center">
                <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto rounded-full px-8 h-12 text-sm font-bold border-brand-white-900 text-brand-white-900 uppercase tracking-widest">Cancel</Button>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto rounded-full px-10 h-12 text-sm font-black bg-brand-forest-700 text-white hover:bg-brand-forest-800 shadow-xl uppercase tracking-widest">
                    {loading ? "Saving..." : initialData ? "Update Puppy" : "Add Puppy"}
                </Button>
            </div>
        </form>
    );
}
