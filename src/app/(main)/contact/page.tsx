import { Metadata } from "next";
import { Mail, Phone, Heart, Send, Bone, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ContactForm } from "@/components/ContactForm";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Contact Us",
    description: "Get in touch with German Shepherd Rehoming Center. Contact us about German Shepherd adoption, questions, or to schedule a visit. We're here to help!",
});

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-brand-black-50">
            {/* Hero */}
            <section className="bg-brand-black-900 py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-copper-700/10 rounded-full -mr-40 -mt-40 blur-3xl" />
                </div>
                <div className="absolute inset-0 opacity-10">
                    <Bone className="w-24 h-24 absolute top-20 left-[10%]" />
                    <Dog className="w-20 h-20 absolute top-40 right-[15%]" />
                </div>

                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-4">
                        Get in <span className="text-brand-copper-500">Touch</span>
                    </h1>
                    <p className="text-xl text-white/60">We'd love to hear from you</p>
                </div>
            </section>

            <ContactForm />
        </div>
    );
}
