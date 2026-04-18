"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Plus, Trash, Star, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface NannyImage {
    _id: string;
    image: string;
    featured: boolean;
    createdAt: string;
}

export default function NannyImagesPage() {
    const [images, setImages] = useState<NannyImage[]>([]);
    const [newImageUrl, setNewImageUrl] = useState("");
    const [makeFeatured, setMakeFeatured] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const res = await fetch("/api/nanny-images");
        if (res.ok) setImages(await res.json());
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                // Add the uploaded image
                const addRes = await fetch("/api/nanny-images", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: data.url, featured: false }),
                });
                
                if (addRes.ok) {
                    toast.success("Image uploaded successfully!");
                    fetchImages();
                } else {
                    toast.error("Failed to save image");
                }
            } else {
                toast.error("Upload failed");
            }
        } catch (error) {
            toast.error("Error uploading image");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleAddImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImageUrl.trim()) return;
        
        setLoading(true);
        try {
            const res = await fetch("/api/nanny-images", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: newImageUrl, featured: makeFeatured }),
            });
            
            if (res.ok) {
                toast.success("Image added successfully!");
                setNewImageUrl("");
                setMakeFeatured(false);
                fetchImages();
            } else {
                toast.error("Failed to add image");
            }
        } catch (error) {
            toast.error("Error adding image");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this image?")) return;
        
        try {
            const res = await fetch(`/api/nanny-images/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Image deleted");
                fetchImages();
            }
        } catch (error) {
            toast.error("Error deleting image");
        }
    };

    const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
        try {
            const res = await fetch(`/api/nanny-images/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ featured: !currentFeatured }),
            });
            
            if (res.ok) {
                toast.success(currentFeatured ? "Removed from featured" : "Set as featured!");
                fetchImages();
            }
        } catch (error) {
            toast.error("Error updating image");
        }
    };

    const featuredImage = images.find(img => img.featured);
    const otherImages = images.filter(img => !img.featured);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-brand-black-900 uppercase">Pet Nanny Images</h1>
                <p className="text-brand-black-600">Manage images shown on the transport page</p>
            </div>

            {/* Add New Image */}
            <div className="bg-white p-6 rounded-3xl shadow-lg mb-8">
                <h3 className="text-lg font-black text-brand-black-900 uppercase mb-4">Add New Image</h3>
                
                {/* File Upload */}
                <div className="mb-6">
                    <Label className="text-xs font-black text-brand-black-700 uppercase mb-2 block">Upload Image</Label>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="nanny-image-upload"
                        />
                        <label
                            htmlFor="nanny-image-upload"
                            className="flex items-center gap-2 px-6 py-3 bg-brand-black-100 hover:bg-brand-black-200 text-brand-black-800 font-bold rounded-full cursor-pointer transition-colors"
                        >
                            {uploading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Upload className="w-5 h-5" />
                            )}
                            {uploading ? "Uploading..." : "Choose File"}
                        </label>
                        <span className="text-sm text-brand-black-600">or paste a URL below</span>
                    </div>
                </div>

                {/* URL Input */}
                <form onSubmit={handleAddImage} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <Label className="text-xs font-black text-brand-black-700 uppercase">Image URL</Label>
                            <Input
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="rounded-xl"
                            />
                        </div>
                        <div className="flex items-end gap-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="makeFeatured"
                                    checked={makeFeatured}
                                    onChange={(e) => setMakeFeatured(e.target.checked)}
                                    className="w-5 h-5 rounded"
                                />
                                <Label htmlFor="makeFeatured" className="text-sm font-bold text-brand-black-700">Set as Featured</Label>
                            </div>
                            <Button 
                                type="submit" 
                                disabled={loading || !newImageUrl.trim()}
                                className="bg-brand-copper-700 hover:bg-brand-copper-800 rounded-full font-black uppercase"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Featured Image */}
            {featuredImage && (
                <div className="mb-8">
                    <h3 className="text-lg font-black text-brand-black-900 uppercase mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-brand-copper-600" />
                        Featured Image
                    </h3>
                    <div className="bg-white p-4 rounded-3xl shadow-lg">
                        <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden">
                            <Image
                                src={featuredImage.image}
                                alt="Featured nanny"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm font-bold text-brand-black-600">Used on homepage hero</span>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => handleToggleFeatured(featuredImage._id, featuredImage.featured)}
                                    className="rounded-full font-bold text-sm"
                                >
                                    <Star className="w-4 h-4 mr-1" /> Remove Featured
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(featuredImage._id)}
                                    className="rounded-full font-bold text-sm"
                                >
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Other Images */}
            <div>
                <h3 className="text-lg font-black text-brand-black-900 uppercase mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-brand-black-700" />
                    All Images ({otherImages.length})
                </h3>
                
                {otherImages.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {otherImages.map((img) => (
                            <div key={img._id} className="bg-white p-3 rounded-2xl shadow-lg">
                                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                                    <Image
                                        src={img.image}
                                        alt="Nanny image"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleToggleFeatured(img._id, img.featured)}
                                        className="flex-1 rounded-full font-bold text-xs"
                                    >
                                        <Star className="w-3 h-3 mr-1" /> Featured
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(img._id)}
                                        className="rounded-full"
                                    >
                                        <Trash className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-3xl shadow-lg text-center text-gray-500">
                        No images yet. Add some above!
                    </div>
                )}
            </div>
        </div>
    );
}
