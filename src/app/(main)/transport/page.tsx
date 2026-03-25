import { Metadata } from "next";
import Image from "next/image";
import { Truck, ShieldCheck, Heart, Phone, Mail, MapPin, Clock, PawPrint, CheckCircle } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";
import dbConnect from "@/lib/db";
import NannyImage from "@/models/NannyImage";

export const metadata: Metadata = generatePageMetadata({
    title: "Pet Nanny Transport Service",
    description: "Safe, reliable pet nanny transport for your Cavalier King Charles Spaniel. Professional dog transport service ensuring your puppy travels safely to your doorstep. Available nationwide.",
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
        <div className="bg-brand-forest-50 min-h-screen">
            {/* Hero */}
            <section className="relative bg-brand-forest-900 py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange-700/10 rounded-full -mr-40 -mt-40 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange-700/5 rounded-full -ml-20 -mb-20 blur-3xl" />
                </div>
                
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-6">
                        Pet Nanny <span className="text-brand-orange-500">Transport</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
                        Safe, comfortable transport for your Cavalier. We bring your new furry family member directly to you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="inline-flex items-center justify-center bg-brand-orange-700 hover:bg-brand-orange-800 text-white rounded-full font-black uppercase px-8 py-6 text-lg transition-colors">
                            Get a Quote
                        </Link>
                        <Link href="/puppies" className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 rounded-full font-black uppercase px-8 py-6 text-lg transition-colors">
                            View Puppies
                        </Link>
                    </div>
                </div>
            </section>

            {/* Images Gallery */}
            {nannyImages.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl sm:text-3xl font-black text-brand-forest-900 uppercase">
                                Our Transport <span className="text-brand-orange-600">Gallery</span>
                            </h2>
                        </div>
                        {/* Desktop: Grid, Mobile: Horizontal scroll */}
                        <div className="lg:grid lg:grid-cols-4 lg:gap-4 flex gap-4 overflow-x-auto pb-4 snap-x">
                            {nannyImages.map((img: any, idx: number) => (
                                <div key={idx} className="flex-none w-64 lg:w-auto snap-center">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                                        <Image
                                            src={img.image}
                                            alt={`Transport ${idx + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose Our Transport */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black text-brand-forest-900 uppercase mb-4">
                            Why Choose Our <span className="text-brand-orange-600">Pet Nanny Service</span>
                        </h2>
                        <p className="text-brand-forest-600 max-w-2xl mx-auto">
                            We understand that your new Cavalier is part of your family. Our transport service ensures they arrive safely, comfortably, and with plenty of love.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Fully Insured",
                                description: "Every transport is fully insured for your peace of mind. Your puppy is protected from pickup to delivery."
                            },
                            {
                                icon: Heart,
                                title: "One-on-One Care",
                                description: "Your Cavalier receives individual attention throughout the journey. No crowded cargo holds."
                            },
                            {
                                icon: Clock,
                                title: "Flexible Scheduling",
                                description: "We work with your schedule to arrange pickup and delivery times that work for you."
                            },
                            {
                                icon: MapPin,
                                title: "Door-to-Door Service",
                                description: "We deliver your puppy directly to your home. No need to travel to airports or pickup locations."
                            },
                            {
                                icon: Truck,
                                title: "Climate Controlled",
                                description: "Our vehicles are climate-controlled to keep your Cavalier comfortable regardless of weather."
                            },
                            {
                                icon: PawPrint,
                                title: "Experienced Handlers",
                                description: "Our team has years of experience handling Cavalier King Charles Spaniels with the utmost care."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-brand-forest-50 p-8 rounded-3xl">
                                <div className="w-14 h-14 bg-brand-orange-100 rounded-2xl flex items-center justify-center mb-4">
                                    <feature.icon className="w-7 h-7 text-brand-orange-600" />
                                </div>
                                <h3 className="text-xl font-black text-brand-forest-900 uppercase mb-2">{feature.title}</h3>
                                <p className="text-brand-forest-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-brand-forest-900 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4">
                            How Our <span className="text-brand-orange-500">Transport Works</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Getting your new Cavalier home has never been easier. Our simple process ensures a smooth experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Contact Us",
                                description: "Reach out to discuss your transport needs and get a customized quote."
                            },
                            {
                                step: "02",
                                title: "Schedule Pickup",
                                description: "We coordinate with you to schedule a convenient pickup time."
                            },
                            {
                                step: "03",
                                title: "Safe Transport",
                                description: "Your Cavalier travels in comfort with regular breaks and updates."
                            },
                            {
                                step: "04",
                                title: "Doorstep Delivery",
                                description: "We deliver your new furry family member directly to your home."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="relative">
                                <div className="text-6xl font-black text-brand-orange-500/20 mb-4">{item.step}</div>
                                <h3 className="text-xl font-black uppercase mb-2">{item.title}</h3>
                                <p className="text-white/60">{item.description}</p>
                                {idx < 3 && (
                                    <div className="hidden md:block absolute top-8 left-[80px] w-[180px] h-0.5 bg-gradient-to-r from-brand-orange-500/50 to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black text-brand-forest-900 uppercase mb-4">
                            Transport <span className="text-brand-orange-600">Pricing</span>
                        </h2>
                        <p className="text-brand-forest-600 max-w-2xl mx-auto">
                            Transparent pricing with no hidden fees. The cost depends on the distance and specific requirements.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto bg-brand-forest-50 rounded-3xl p-8 md:p-12">
                        <div className="space-y-4">
                            {[
                                "Door-to-door service within 500 miles",
                                "One-on-one transport (no shared rides)",
                                "Regular photo and video updates",
                                "Food and water provided",
                                "Comfort stops every 2-3 hours",
                                "Fully insured transport"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-brand-orange-600 shrink-0" />
                                    <span className="text-brand-forest-800 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 pt-8 border-t border-brand-forest-200">
                            <p className="text-brand-forest-600 text-center mb-4">
                                Want to know the exact cost for your location?
                            </p>
                            <div className="flex justify-center">
                                <Link href="/contact" className="inline-flex items-center justify-center bg-brand-orange-700 hover:bg-brand-orange-800 text-white rounded-full font-black uppercase px-8 py-3 transition-colors">
                                    Get Your Quote
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-brand-forest-50">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-black text-brand-forest-900 uppercase mb-4">
                            Frequently Asked <span className="text-brand-orange-600">Questions</span>
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "How long does transport take?",
                                a: "Transport time varies based on distance. Typically, within 500 miles, same-day delivery is possible. Longer distances may require an overnight stay for your puppy's comfort."
                            },
                            {
                                q: "Can I track my puppy during transport?",
                                a: "Yes! We provide regular photo and video updates throughout the journey so you always know how your Cavalier is doing."
                            },
                            {
                                q: "What if my puppy needs to use the bathroom?",
                                a: "We make comfort stops every 2-3 hours, allowing your puppy to stretch their legs, use the bathroom, and have water."
                            },
                            {
                                q: "Is the transport safe for my Cavalier?",
                                a: "Absolutely. Our vehicles are climate-controlled, and our handlers are experienced with Cavalier King Charles Spaniels. Every transport is fully insured."
                            },
                            {
                                q: "How much does pet nanny transport cost?",
                                a: "Pricing depends on distance and specific needs. Contact us for a customized quote. We offer competitive rates with no hidden fees."
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm">
                                <h3 className="font-black text-brand-forest-900 uppercase mb-2">{faq.q}</h3>
                                <p className="text-brand-forest-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-brand-forest-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange-700/20 rounded-full -mr-40 -mt-40 blur-3xl" />
                </div>
                
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-6">
                        Ready to Bring Your <span className="text-brand-orange-500">Cavalier Home</span>?
                    </h2>
                    <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                        Contact us today to discuss your transport needs. We're here to help your new furry family member arrive safely.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="inline-flex items-center justify-center bg-brand-orange-700 hover:bg-brand-orange-800 text-white rounded-full font-black uppercase px-8 py-6 transition-colors">
                            Contact Us
                        </Link>
                        <Link href="/puppies" className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white/10 rounded-full font-black uppercase px-8 py-6 transition-colors">
                            View Available Puppies
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
