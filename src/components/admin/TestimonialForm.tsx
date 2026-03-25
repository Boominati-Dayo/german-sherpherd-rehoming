"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface TestimonialFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export function TestimonialForm({ initialData, onSuccess, onCancel }: TestimonialFormProps) {
    const [formData, setFormData] = useState(
        initialData || {
            name: "",
            text: "",
            location: "",
            rating: 5,
            image: "",
        }
    );
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formDataUpload = new FormData();
            formDataUpload.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formDataUpload,
            });

            if (res.ok) {
                const data = await res.json();
                setFormData({ ...formData, image: data.url });
                toast.success("Image uploaded!");
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = initialData ? `/api/testimonials/${initialData._id}` : "/api/testimonials";
        const method = initialData ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success(initialData ? "Testimonial updated!" : "Testimonial added!");
                onSuccess();
            } else {
                toast.error("Failed to save testimonial");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving testimonial");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            {/* Image Preview */}
            {formData.image && (
                <div className="flex items-center gap-4 p-4 bg-brand-forest-50 rounded-xl">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-brand-forest-800">Image uploaded</p>
                        <p className="text-xs text-brand-forest-600 truncate">{formData.image}</p>
                    </div>
                    <button type="button" onClick={() => setFormData({ ...formData, image: "" })} className="text-red-500 text-sm font-bold">
                        Remove
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Client Name</Label>
                    <Input id="name" value={formData.name} onChange={handleChange} required className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Client Picture</Label>
                    <div className="flex gap-2">
                        <Input 
                            id="image" 
                            value={formData.image || ""} 
                            onChange={handleChange} 
                            placeholder="https://... or upload below"
                            className="rounded-xl h-11" 
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="testimonial-upload"
                        />
                        <label
                            htmlFor="testimonial-upload"
                            className="flex items-center justify-center w-11 h-11 bg-brand-forest-100 hover:bg-brand-forest-200 rounded-xl cursor-pointer transition-colors"
                        >
                            {uploading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-brand-forest-700" />
                            ) : (
                                <Upload className="w-5 h-5 text-brand-forest-700" />
                            )}
                        </label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Location</Label>
                    <Input id="location" value={formData.location} onChange={handleChange} placeholder="e.g. Austin, TX" required className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="rating" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Rating (1-5)</Label>
                    <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.5"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        className="rounded-xl h-11"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="text" className="text-[10px] font-black uppercase tracking-widest text-gray-500">Testimonial Text</Label>
                <Textarea id="text" value={formData.text} onChange={handleChange} required className="rounded-xl min-h-[120px]" />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto rounded-full px-8 h-12 text-sm font-bold border-gray-900 text-gray-900 uppercase tracking-widest">Cancel</Button>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto rounded-full px-10 h-12 text-sm font-black bg-brand-forest-700 text-white hover:bg-brand-forest-800 shadow-xl uppercase tracking-widest">
                    {loading ? "Saving..." : "Save Testimonial"}
                </Button>
            </div>
        </form>
    );
}
