"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { Plus, Edit, Trash } from "lucide-react";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState<any>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        const res = await fetch("/api/testimonials");
        if (res.ok) setTestimonials(await res.json());
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this testimonial?")) {
            await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            fetchTestimonials();
        }
    };

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl font-black text-brand-forest-900 uppercase">Testimonials</h1>
                {!isEditing && (
                    <Button onClick={() => { setCurrentTestimonial(null); setIsEditing(true); }} className="bg-brand-orange-700 hover:bg-brand-orange-800 rounded-full font-black uppercase text-sm">
                        <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                    </Button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-6 rounded-3xl shadow-lg max-w-2xl">
                    <h3 className="text-xl font-black text-brand-forest-900 mb-6 uppercase">{currentTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</h3>
                    <TestimonialForm
                        initialData={currentTestimonial}
                        onSuccess={() => { setIsEditing(false); fetchTestimonials(); }}
                        onCancel={() => setIsEditing(false)}
                    />
                </div>
            ) : (
                <div className="space-y-3 max-w-full overflow-hidden">
                    {testimonials.map((t) => (
                        <div key={t._id} className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-stretch sm:items-start gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <h4 className="font-black text-brand-forest-900 truncate">{t.name}</h4>
                                    <span className="text-gray-400 text-sm">({t.location})</span>
                                    <span className="text-yellow-500 shrink-0">{"★".repeat(t.rating)}</span>
                                </div>
                                <p className="text-brand-forest-600 italic line-clamp-2 sm:line-clamp-none">"{t.text}"</p>
                                {t.image && <img src={t.image} alt={t.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mt-2 sm:mt-3" />}
                            </div>
                            <div className="flex space-x-2 justify-end sm:justify-start">
                                <Button size="sm" variant="outline" onClick={() => { setCurrentTestimonial(t); setIsEditing(true); }} className="rounded-full">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(t._id)} className="rounded-full">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {testimonials.length === 0 && (
                        <div className="bg-white p-8 rounded-3xl shadow-lg text-center text-gray-500">No testimonials yet.</div>
                    )}
                </div>
            )}
        </div>
    );
}
