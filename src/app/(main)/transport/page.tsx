import { Metadata } from "next";
import Image from "next/image";
import { Truck, ShieldCheck, Heart, Phone, Mail, MapPin, Clock, PawPrint, CheckCircle, Star, ArrowRight, DollarSign, Route, Leaf } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";
import dbConnect from "@/lib/db";
import NannyImage from "@/models/NannyImage";

export const metadata: Metadata = generatePageMetadata({
    title: "Pet Nanny Transport Service",
    description: "Safe, reliable pet nanny transport for your German Shepherd. Professional dog transport service ensuring your puppy travels safely to your doorstep. Available nationwide.",
});

export const revalidate = 0;

export default async function TransportPage() {
    await dbConnect();
    const nannyImagesDocs = await NannyImage.find({}).sort({ createdAt: -1 }).lean();
    const nannyImages = JSON.parse(JSON.stringify(nannyImagesDocs)).map((img: any) => ({
        _id: img._id.toString(),
        image: img.image,
        featured: img.featured,
    }));
    
    return (
        <div className="min-h-screen bg-white">
            {/* Hero - Dark */}
            <section className="bg-brand-black-900 py-24 lg:py-36 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-copper-700/10 rounded-full -mr-40 -mt-40 blur-3xl" />
                </div>
                
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-copper-700 rounded-full mb-6">
                        <Truck className="w-4 h-4 text-white" />
                        <span className="text-sm font-bold text-white">Safe & Reliable</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-6">
                        Pet Nanny <span className="text-brand-copper-500">Transport</span>
                    </h1>
                    <p className="text-xl text-brand-copper-200 max-w-2xl mx-auto mb-8">
                        Your German Shepherd deserves safe, comfortable travel. We deliver directly to your door.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="inline-flex items-center justify-center bg-brand-copper-700 hover:bg-brand-copper-600 text-white rounded-full font-black uppercase px-8 py-4 text-lg transition-colors">
                            Get a Quote
                        </Link>
                        <Link href="/puppies" className="inline-flex items-center justify-center border-2 border-brand-copper-500 text-brand-copper-400 hover:bg-brand-copper-700/20 rounded-full font-black uppercase px-8 py-4 text-lg transition-colors">
                            View Puppies
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Strip - Light gray */}
            <section className="py-12 bg-brand-black-50 border-y border-brand-black-100">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        {[
                            { icon: ShieldCheck, title: "Fully Insured", subtitle: "Yes" },
                            { icon: Heart, title: "Happy Clients", subtitle: "20+" },
                            { icon: Clock, title: "On-Time", subtitle: "Always" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <stat.icon className="w-8 h-8 text-brand-copper-600" />
                                <p className="text-xl font-black text-brand-black-900">{stat.subtitle}</p>
                                <p className="text-sm text-brand-black-500">{stat.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process - White */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black text-brand-black-900 uppercase mb-3">
                            Our <span className="text-brand-copper-600">Process</span>
                        </h2>
                        <p className="text-brand-black-500">Four simple steps to get your German Shepherd home</p>
                    </div>

                    {/* Vertical Timeline */}
                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-copper-200 -translate-x-1/2 hidden md:block" />
                        
                        <div className="space-y-12 md:space-y-0">
                            {[
                                {
                                    step: "01",
                                    title: "Contact Us",
                                    desc: "Tell us your location and needs",
                                    icon: Phone,
                                    align: "left"
                                },
                                {
                                    step: "02", 
                                    title: "We Schedule",
                                    desc: "Pick a date that works for you",
                                    icon: Clock,
                                    align: "right"
                                },
                                {
                                    step: "03",
                                    title: "We Transport",
                                    desc: "Your pup travels in comfort",
                                    icon: Truck,
                                    align: "left"
                                },
                                {
                                    step: "04",
                                    title: "Delivered",
                                    desc: "Your German Shepherd arrives home",
                                    icon: MapPin,
                                    align: "right"
                                }
                            ].map((item, idx) => (
                                <div key={idx} className={`relative flex items-center gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="flex-1 hidden md:block" />
                                    <div className="w-12 h-12 rounded-full bg-brand-copper-700 flex items-center justify-center z-10 shrink-0">
                                        <span className="text-white font-black text-sm">{item.step}</span>
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="bg-brand-black-50 border border-brand-black-100 rounded-2xl p-6 inline-block">
                                            <item.icon className="w-8 h-8 text-brand-copper-600 mx-auto mb-2 md:hidden" />
                                            <h3 className="text-xl font-black text-brand-black-900 uppercase">{item.title}</h3>
                                            <p className="text-brand-black-500">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features - Light gray */}
            <section className="py-24 bg-brand-black-50">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black text-brand-black-900 uppercase mb-3">
                            What's <span className="text-brand-copper-600">Included</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { icon: ShieldCheck, title: "Fully Insured" },
                            { icon: Heart, title: "One-on-One Care" },
                            { icon: MapPin, title: "Door-to-Door" },
                            { icon: Clock, title: "Flexible Times" },
                            { icon: Truck, title: "Climate Control" },
                            { icon: PawPrint, title: "Expert Handlers" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-brand-black-100 rounded-xl">
                                <div className="w-10 h-10 bg-brand-copper-700 rounded-lg flex items-center justify-center">
                                    <item.icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-black text-brand-black-900">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Images Gallery */}
            {nannyImages.length > 0 && (
                <section className="py-16 bg-white border-t border-brand-black-100">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-black text-brand-black-900 uppercase">Transport <span className="text-brand-copper-600">Gallery</span></h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {nannyImages.slice(0, 8).map((img: any, idx: number) => (
                                <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-brand-black-100">
                                    <Image
                                        src={img.image}
                                        alt={`Transport ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ - Light gray */}
            <section className="py-24 bg-brand-black-50">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-black text-brand-black-900 uppercase">Questions?</h2>
                    </div>

                    <div className="space-y-3">
                        {[
                            { q: "How long does transport take?", a: "Same-day delivery within 500 miles. Longer distances may need an overnight stop." },
                            { q: "Can I track my puppy?", a: "Yes! We send photo and video updates throughout the journey." },
                            { q: "Is it safe?", a: "Absolutely. Climate-controlled vehicles and experienced handlers. Fully insured." }
                        ].map((faq, idx) => (
                            <details key={idx} className="group bg-white border border-brand-black-100 rounded-xl overflow-hidden">
                                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                                    <span className="font-black text-brand-black-900">{faq.q}</span>
                                    <span className="w-6 h-6 bg-brand-copper-100 rounded-full flex items-center justify-center text-brand-copper-600 text-xs group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="px-4 pb-4">
                                    <p className="text-brand-black-500">{faq.a}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA - Copper */}
            <section className="py-20 bg-brand-copper-700">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-black text-white uppercase mb-4">
                        Ready to bring your German Shepherd home?
                    </h2>
                    <p className="text-white/80 mb-8">Get in touch for a customized quote</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="inline-flex items-center justify-center bg-brand-black-900 text-white rounded-full font-black uppercase px-8 py-4">
                            Contact Us
                        </Link>
                        <Link href="/puppies" className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 rounded-full font-black uppercase px-8 py-4">
                            View Puppies
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}