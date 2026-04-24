"use client";

import { useState } from "react";
import { Mail, Heart, Send, MessageCircle } from "lucide-react";
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
        <section className="py-20 -mt-10 relative z-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-brand-black-900 rounded-3xl p-8 border border-brand-copper-700/30">
                            <h3 className="text-lg font-black text-white uppercase mb-6">Get In Touch</h3>
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-brand-copper-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-brand-copper-400 uppercase">Email</p>
                                        <p className="text-white font-medium break-all">admin@germanshepherdrehomingcenter.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-copper-700 rounded-3xl p-8 text-white text-center">
                            <MessageCircle className="w-10 h-10 text-white/80 mx-auto mb-4" />
                            <h3 className="text-lg font-black uppercase mb-3">We Are Here to Help</h3>
                            <p className="text-white/80 font-medium mb-3">
                                "Every family deserves the perfect German Shepherd companion. Let's find yours together."
                            </p>
                            <p className="text-white/60 text-sm italic">
                                "We match every German Shepherd with their perfect forever home."
                            </p>
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
                                    className="bg-brand-black-900 border-2 border-brand-copper-500 p-10 rounded-3xl text-center min-h-[400px] flex flex-col items-center justify-center"
                                >
                                    <div className="w-20 h-20 bg-brand-copper-700 rounded-full flex items-center justify-center mb-6">
                                        <Send className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-black text-white mb-4 uppercase">Message Sent!</h2>
                                    <p className="text-brand-copper-200 mb-8 max-w-md">
                                        Thank you for reaching out. We will get back to you within 24 hours.
                                    </p>
                                    <Button
                                        onClick={() => setSubmitted(false)}
                                        className="bg-brand-copper-700 text-white rounded-full px-8 py-3 font-black uppercase"
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
                                    className="bg-brand-black-900 border-2 border-brand-copper-600/30 p-8 md:p-10 rounded-3xl"
                                >
                                    <h2 className="text-2xl font-black text-white mb-2 uppercase">Send Us a Message</h2>
                                    <p className="text-brand-copper-300 mb-8">Have questions? We'd love to hear from you.</p>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-xs font-black text-brand-copper-300 uppercase">Your Name</Label>
                                                <Input 
                                                    id="name" 
                                                    placeholder="John Doe" 
                                                    value={formData.name} 
                                                    onChange={handleChange} 
                                                    className="bg-brand-black-800 border-brand-copper-700/30 text-white placeholder:text-brand-copper-400 h-12 focus:ring-brand-copper-500 rounded-xl" 
                                                    required 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-xs font-black text-brand-copper-300 uppercase">Email</Label>
                                                <Input 
                                                    id="email" 
                                                    type="email" 
                                                    placeholder="john@example.com" 
                                                    value={formData.email} 
                                                    onChange={handleChange} 
                                                    className="bg-brand-black-800 border-brand-copper-700/30 text-white placeholder:text-brand-copper-400 h-12 focus:ring-brand-copper-500 rounded-xl" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject" className="text-xs font-black text-brand-copper-300 uppercase">Subject</Label>
                                            <Input 
                                                id="subject" 
                                                placeholder="General Inquiry / Adoption / Shipping" 
                                                value={formData.subject} 
                                                onChange={handleChange} 
                                                className="bg-brand-black-800 border-brand-copper-700/30 text-white placeholder:text-brand-copper-400 h-12 focus:ring-brand-copper-500 rounded-xl" 
                                                required 
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-xs font-black text-brand-copper-300 uppercase">Message</Label>
                                            <Textarea 
                                                id="message" 
                                                placeholder="Tell us about yourself and what you're looking for..." 
                                                value={formData.message} 
                                                onChange={handleChange} 
                                                className="bg-brand-black-800 border-brand-copper-700/30 text-white placeholder:text-brand-copper-400 min-h-[150px] focus:ring-brand-copper-500 rounded-xl" 
                                                required 
                                            />
                                        </div>

                                        <Button 
                                            type="submit" 
                                            disabled={loading}
                                            className="w-full h-14 bg-brand-copper-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-copper-600 transition-all"
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