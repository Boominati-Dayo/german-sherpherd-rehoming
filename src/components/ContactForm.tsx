"use client";

import { useState } from "react";
import { Mail, Phone, Heart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 -mt-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info - Combined Card */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-lg">
                            <h3 className="text-lg font-black text-brand-forest-900 uppercase mb-6">Contact Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-brand-orange-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-brand-forest-600 uppercase">Email</p>
                                        <p className="text-brand-forest-800 font-medium">rebecca@rebecca-herman.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-brand-orange-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-brand-forest-600 uppercase">Phone</p>
                                        <p className="text-brand-forest-800 font-medium">(555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-forest-900 rounded-3xl p-8 text-white">
                            <Heart className="w-10 h-10 text-brand-orange-500 mb-4" />
                            <h3 className="text-lg font-black uppercase mb-2">My Promise</h3>
                            <p className="text-white/70 font-medium italic">
                                "Finding the perfect home for every puppy is not just my job, it's my promise to every family I work with."
                            </p>
                            <p className="mt-4 font-black text-brand-orange-500">— Rebecca Herman</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white p-10 rounded-3xl shadow-lg text-center min-h-[400px] flex flex-col items-center justify-center"
                                >
                                    <div className="w-20 h-20 bg-brand-orange-100 rounded-full flex items-center justify-center mb-6">
                                        <Send className="w-10 h-10 text-brand-orange-700" />
                                    </div>
                                    <h2 className="text-3xl font-black text-brand-forest-900 mb-4 uppercase">Message Sent!</h2>
                                    <p className="text-brand-forest-600 mb-8 max-w-md">
                                        Thank you for reaching out. Rebecca will get back to you within 24 hours.
                                    </p>
                                    <Button
                                        onClick={() => setSubmitted(false)}
                                        className="bg-brand-forest-900 text-white rounded-full px-8 py-3 font-black uppercase"
                                    >
                                        Send Another
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white p-8 md:p-10 rounded-3xl shadow-lg"
                                >
                                    <h2 className="text-2xl font-black text-brand-forest-900 mb-8 uppercase">Send a Message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-xs font-black text-brand-forest-700 uppercase">Your Name</Label>
                                                <Input 
                                                    id="name" 
                                                    placeholder="John Doe" 
                                                    value={formData.name} 
                                                    onChange={handleChange} 
                                                    className="rounded-xl border-brand-forest-200 h-12 focus:ring-brand-orange-500" 
                                                    required 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-xs font-black text-brand-forest-700 uppercase">Email</Label>
                                                <Input 
                                                    id="email" 
                                                    type="email" 
                                                    placeholder="john@example.com" 
                                                    value={formData.email} 
                                                    onChange={handleChange} 
                                                    className="rounded-xl border-brand-forest-200 h-12 focus:ring-brand-orange-500" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject" className="text-xs font-black text-brand-forest-700 uppercase">Subject</Label>
                                            <Input 
                                                id="subject" 
                                                placeholder="General Inquiry / Adoption / Shipping" 
                                                value={formData.subject} 
                                                onChange={handleChange} 
                                                className="rounded-xl border-brand-forest-200 h-12 focus:ring-brand-orange-500" 
                                                required 
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-xs font-black text-brand-forest-700 uppercase">Message</Label>
                                            <Textarea 
                                                id="message" 
                                                placeholder="Tell me about yourself and what you're looking for..." 
                                                value={formData.message} 
                                                onChange={handleChange} 
                                                className="rounded-xl border-brand-forest-200 min-h-[150px] focus:ring-brand-orange-500" 
                                                required 
                                            />
                                        </div>

                                        <Button 
                                            type="submit" 
                                            disabled={loading}
                                            className="w-full h-14 bg-brand-orange-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-orange-800 transition-all"
                                        >
                                            {loading ? "Sending..." : "Send Message"}
                                        </Button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
