"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="bg-brand-white-200 min-h-screen py-24">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-2xl md:text-5xl font-extrabold text-brand-forest-700 mb-8 flex items-center gap-4 uppercase tracking-tighter">
                        <span className="w-1.5 h-10 bg-brand-orange-700 rounded-full" />
                        Privacy Policy
                    </h1>

                    <div className="bg-brand-white-100 p-8 md:p-12 rounded-[2.5rem] border border-brand-white-400 shadow-xl space-y-12">
                        <section>
                            <p className="text-brand-white-900 font-bold mb-4 uppercase tracking-widest text-xs">Last Updated: {new Date().toLocaleDateString()}</p>
                            <p className="text-brand-forest-900 leading-relaxed text-lg font-medium italic">
                                At Rebecca Herman Fostering, we respect your privacy and are committed to protecting any personal information you share with us. This policy outlines how we handle data collected through our adoption applications and website.
                            </p>
                        </section>

                        <div className="space-y-12">
                            {[
                                {
                                    icon: Eye,
                                    title: "1. Information We Collect",
                                    content: "When you submit an adoption application, we collect your name, email address, location, and answers to our screening questions (including family status, home environment, and dog ownership history). This information is strictly for our vetting process."
                                },
                                {
                                    icon: Lock,
                                    title: "2. How We Use Your Information",
                                    content: "We use your information strictly for assessing adoption eligibility and coordinating the rehoming of our puppies. We do not sell, rent, or trade your data to third parties for marketing purposes."
                                },
                                {
                                    icon: Shield,
                                    title: "3. Data Sharing",
                                    content: "We take your privacy seriously. We only share necessary contact information with our trusted Pet Nanny service after an adoption is approved. We may also share health data with licensed veterinarians if required for the puppy's immediate care."
                                },
                                {
                                    icon: FileText,
                                    title: "4. Your Rights",
                                    content: "You have the right to request access to the information we hold about you or to request that we delete your application from our records. Please contact us at rebecca@rebecca-herman.com to make such a request."
                                }
                            ].map((section, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-2 bg-brand-forest-100 rounded-xl text-brand-forest-700 group-hover:bg-brand-orange-100 group-hover:text-brand-orange-700 transition-colors">
                                            <section.icon className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-extrabold text-brand-forest-700 sm:text-2xl">{section.title}</h2>
                                    </div>
                                    <p className="text-brand-white-900 leading-relaxed font-medium pl-14">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 pt-12 border-t border-brand-white-400 text-center">
                            <p className="text-brand-forest-900 font-bold mb-4">Questions about your privacy?</p>
                            <p className="text-brand-white-900 font-medium italic">Reach out via our contact page, and we'll be happy to provide more details on our data protection practices.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
