"use client";

import { useState } from "react";
import { Mail, Phone, Heart, Send, Bone, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

export function ContactFormClient() {
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
                alert(errorData.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Main Content */}
            <section className="py-20 -mt-10">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                    {/* Success Message */}
                    <AnimatePresence>
                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center mb-12"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-black text-green-800 uppercase mb-2">Message Sent!</h3>
                                <p className="text-green-700 mb-4">Thank you for reaching out! I'll get back to you within 24 hours.</p>
                                <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full font-bold">
                                    Send Another Message
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-lg">
                                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <Label htmlFor="name" className="font-bold text-brand-forest-800 mb-2 block">Your Name *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="rounded-xl h-12 border-brand-forest-200 focus:border-brand-orange-500"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="font-bold text-brand-forest-800 mb-2 block">Email Address *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="rounded-xl h-12 border-brand-forest-200 focus:border-brand-orange-500"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <Label htmlFor="subject" className="font-bold text-brand-forest-800 mb-2 block">Subject</Label>
                                    <Input
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="rounded-xl h-12 border-brand-forest-200 focus:border-brand-orange-500"
                                        placeholder="Adoption inquiry, question about a puppy, etc."
                                    />
                                </div>

                                <div className="mb-6">
                                    <Label htmlFor="message" className="font-bold text-brand-forest-800 mb-2 block">Message *</Label>
                                    <Textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="rounded-xl border-brand-forest-200 focus:border-brand-orange-500 min-h-[150px]"
                                        placeholder="Tell me about yourself and what you're looking for..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-brand-orange-700 hover:bg-brand-orange-800 rounded-full font-black uppercase h-14 text-lg"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl p-8 shadow-lg">
                                <h3 className="text-xl font-black text-brand-forest-900 uppercase mb-6">Contact Info</h3>
                                <div className="space-y-4">
                                    <a href="mailto:rebecca@thecavaliercommunity.com" className="flex items-center gap-4 text-brand-forest-600 hover:text-brand-orange-600 transition-colors">
                                        <div className="w-12 h-12 bg-brand-orange-100 rounded-2xl flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-brand-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-forest-900">Email</p>
                                            <p className="text-sm">rebecca@thecavaliercommunity.com</p>
                                        </div>
                                    </a>
                                    <a href="tel:+15551234567" className="flex items-center gap-4 text-brand-forest-600 hover:text-brand-orange-600 transition-colors">
                                        <div className="w-12 h-12 bg-brand-orange-100 rounded-2xl flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-brand-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-forest-900">Phone</p>
                                            <p className="text-sm">(555) 123-4567</p>
                                            <p className="text-xs text-brand-forest-500">Text messages only</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="bg-brand-forest-900 rounded-3xl p-8 text-white">
                                <h3 className="text-xl font-black uppercase mb-4">Why Adopt?</h3>
                                <ul className="space-y-3 text-white/70">
                                    <li className="flex items-start gap-2">
                                        <Heart className="w-5 h-5 text-brand-orange-500 shrink-0 mt-0.5" />
                                        <span>Give a loving dog a forever home</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Heart className="w-5 h-5 text-brand-orange-500 shrink-0 mt-0.5" />
                                        <span>Health-checked and vaccinated</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Heart className="w-5 h-5 text-brand-orange-500 shrink-0 mt-0.5" />
                                        <span>Support responsible rehoming</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
