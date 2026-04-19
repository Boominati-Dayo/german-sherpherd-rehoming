import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { Heart, ShieldCheck, Star, PawPrint, ArrowRight, Bone, Dog, Clock, Home, Activity, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "About Us",
    description: "Learn about German Shepherd Rehoming Center and our mission to find loving forever homes for German Shepherds. Our commitment to responsible adoption.",
});

export default function AboutPage() {
    return (
        <div className="bg-brand-black-50 min-h-screen">
            {/* Hero */}
            <section className="relative bg-brand-black-900 py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-copper-700/10 rounded-full -mr-40 -mt-40 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-copper-700/5 rounded-full -ml-20 -mb-20 blur-3xl" />
                </div>
                
                <div className="absolute inset-0 opacity-10">
                    <Bone className="w-32 h-32 absolute top-20 left-[10%]" />
                    <Dog className="w-24 h-24 absolute top-40 right-[20%]" />
                    <PawPrint className="w-20 h-20 absolute bottom-32 left-[30%]" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-6">
                        About <span className="text-brand-copper-500">Us</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        German Shepherd Rehoming Center
                    </p>
                </div>
            </section>

            {/* NEW: Why German Shepherds Section */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-copper-100 rounded-full mb-4">
                            <Star className="w-4 h-4 text-brand-copper-600" />
                            <span className="text-sm font-bold text-brand-copper-700">Why Choose German Shepherds</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black text-brand-black-900 uppercase tracking-tight">
                            The <span className="text-brand-copper-600">Perfect Companion</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Heart, title: "Loyal & Protective", desc: "German Shepherds form unbreakable bonds with their families and are naturally protective of loved ones." },
                            { icon: Award, title: "Highly Intelligent", desc: "Ranked among the smartest breeds, German Shepherds are easy to train and excel in various roles." },
                            { icon: Target, title: "Versatile Workers", desc: "From family pets to service dogs, German Shepherds adapt beautifully to any role or lifestyle." }
                        ].map((item, i) => (
                            <div key={i} className="bg-gradient-to-br from-brand-black-50 to-brand-copper-50 rounded-3xl p-8 border border-brand-black-100 hover:border-brand-copper-200 transition-all hover:-translate-y-1">
                                <div className="w-14 h-14 bg-brand-copper-100 rounded-2xl flex items-center justify-center mb-6">
                                    <item.icon className="w-7 h-7 text-brand-copper-600" />
                                </div>
                                <h3 className="text-xl font-black text-brand-black-900 uppercase mb-3">{item.title}</h3>
                                <p className="text-brand-black-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW: Our Process Section */}
            <section className="py-24 bg-gradient-to-br from-brand-black-900 via-brand-black-800 to-brand-black-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-20 w-64 h-64 bg-brand-copper-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-20 w-48 h-48 bg-brand-copper-600/10 rounded-full blur-3xl" />
                </div>
                
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                            Our <span className="text-brand-copper-500">Process</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">How we match families with their perfect German Shepherd</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Application", desc: "Fill out our detailed application to help us understand your needs" },
                            { step: "02", title: "Consultation", desc: "We discuss your lifestyle and preferences to find the right match" },
                            { step: "03", title: "Meet & Greet", desc: "Connect with available German Shepherds that fit your criteria" },
                            { step: "04", title: "Welcome Home", desc: "Complete the adoption and welcome your new family member" }
                        ].map((item, i) => (
                            <div key={i} className="relative group">
                                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-brand-copper-500/50 transition-all">
                                    <p className="text-5xl font-black text-brand-copper-500/30 mb-4">{item.step}</p>
                                    <h3 className="text-lg font-black uppercase mb-2">{item.title}</h3>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </div>
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <ArrowRight className="w-6 h-6 text-brand-copper-500" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* My Story */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="relative">
                                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden">
                                    <Image 
                                        src="/assets/about_image.png"
                                        alt="German Shepherd Rehoming Center"
                                        fill
                                        className="object-contain bg-transparent"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl sm:text-5xl font-black text-brand-black-900 uppercase tracking-tight mb-8">
                                Our <span className="text-brand-copper-600">Story</span>
                            </h2>
                            
                            <div className="space-y-6 text-brand-black-700 text-lg leading-relaxed">
                                <p>
                                    We are a dedicated team passionate about finding loving forever homes for German Shepherds. Our journey began with a simple belief: every German Shepherd deserves a caring family.
                                </p>
                                <p>
                                    Our team brings together years of experience in German Shepherd care and rehoming. We understand the unique needs of this wonderful breed and work tirelessly to ensure successful adoptions.
                                </p>
                                <p>
                                    We believe in transparent, ethical rehoming practices. Every German Shepherd in our care receives the highest quality of love, attention, and veterinary care.
                                </p>
                            </div>

                            <div className="mt-10 p-8 bg-brand-black-50 rounded-[2rem] border-l-4 border-brand-copper-600">
                                <p className="text-xl font-serif italic text-brand-black-800">
                                    "Every family we help find their perfect German Shepherd becomes part of our extended family. Watching these beautiful dogs bring joy to homes across the country is what makes this work so meaningful."
                                </p>
                                <p className="mt-4 font-black text-brand-copper-700">— The Team</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* My Mission */}
            <section className="py-24 bg-brand-black-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <PawPrint className="w-48 h-48 absolute top-10 right-10" />
                    <PawPrint className="w-32 h-32 absolute bottom-10 left-10" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                            Our <span className="text-brand-copper-500">Mission</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">Creating meaningful connections between German Shepherds and loving families.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <Heart className="w-12 h-12 text-brand-copper-500 mb-4" />
                            <h3 className="text-xl font-black uppercase mb-3">A Bridge of Love</h3>
                            <p className="text-white/70">
                                This platform was built to bridge the gap between dog owners who can no longer care for their pets and loving individuals or families ready to provide them with safe, happy homes.
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ShieldCheck className="w-12 h-12 text-brand-copper-500 mb-4" />
                            <h3 className="text-xl font-black uppercase mb-3">Trusted Intermediary</h3>
                            <p className="text-white/70">
                                Our role is to act as a trusted intermediary—ensuring every rehoming process is handled with care, transparency, and the best interests of the dogs at heart.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-2xl font-serif italic text-white/80 max-w-3xl mx-auto">
                            "For us, this is more than just a platform—it's a commitment to giving every dog the second chance they deserve and helping loving homes find the perfect companion."
                        </p>
                    </div>
                </div>
            </section>

            {/* About German Shepherds */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black text-brand-black-900 uppercase tracking-tight">
                            The <span className="text-brand-copper-600">German Shepherd</span>
                        </h2>
                        <p className="text-brand-black-600 mt-2">Why we specialize in these magnificent dogs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Heart, title: "Loyal", desc: "Known for their unwavering loyalty and devotion to their families" },
                            { icon: Star, title: "Intelligent", desc: "One of the most intelligent breeds, easy to train and highly versatile" },
                            { icon: ShieldCheck, title: "Protective", desc: "Natural protective instincts make them excellent family guardians" },
                            { icon: PawPrint, title: "Athletic", desc: "Perfect for active families who love outdoor activities" }
                        ].map((item, i) => (
                            <div key={i} className="bg-brand-black-50 rounded-3xl p-8 text-center hover:bg-brand-copper-50 transition-colors">
                                <div className="w-16 h-16 bg-brand-copper-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-black text-brand-black-900 uppercase mb-2">{item.title}</h3>
                                <p className="text-sm text-brand-black-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About The Breed - German Shepherd */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    {/* Scattered German Shepherd Picture Cards - Using local images */}
                    <div className="absolute top-20 left-[5%] w-48 h-48 rotate-[-12deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image1.jpg" 
                                alt="German Shepherd"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute top-40 right-[8%] w-40 h-40 rotate-[8deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image2.jpg" 
                                alt="German Shepherd Puppy"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute bottom-32 left-[12%] w-36 h-36 rotate-[-6deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image3.jpg" 
                                alt="German Shepherd Dog"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute bottom-20 right-[5%] w-44 h-44 rotate-[10deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image4.jpg" 
                                alt="German Shepherd Companion"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute top-1/3 left-[25%] w-32 h-32 rotate-[-15deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image5.jpg" 
                                alt="German Shepherd Portrait"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute top-1/2 right-[20%] w-28 h-28 rotate-[5deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image6.jpg" 
                                alt="German Shepherd Playing"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black text-brand-black-900 uppercase tracking-tight mb-4">
                            About The <span className="text-brand-copper-600">Breed</span>
                        </h2>
                        <p className="text-brand-black-600 text-lg">The Noble Breed That Sets the Standard</p>
                    </div>

                    <div className="space-y-8 text-brand-black-700">
                        <div className="bg-brand-black-50 p-8 rounded-3xl">
                            <h3 className="text-xl font-black text-brand-black-900 uppercase mb-4 flex items-center gap-2">
                                <Star className="w-6 h-6 text-brand-copper-600" />
                                History & Heritage
                            </h3>
                            <p className="text-lg leading-relaxed">
                                The German Shepherd is a breed with a rich history originating from Germany in the late 19th century. Originally developed for herding sheep, they quickly gained recognition for their intelligence, trainability, and versatility. Today, German Shepherds serve in various roles including police work, search and rescue, service dogs, and beloved family companions.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-brand-black-50 p-8 rounded-3xl">
                                <h3 className="text-lg font-black text-brand-black-900 uppercase mb-4 flex items-center gap-2">
                                    <Heart className="w-6 h-6 text-brand-copper-600" />
                                    Temperament
                                </h3>
                                <p className="leading-relaxed">
                                    German Shepherds are known for their confident, courageous, and smart nature. They're extremely loyal to their families and form strong bonds with their owners. While they're protective of their loved ones, properly socialized German Shepherds are friendly and gentle with children and other pets.
                                </p>
                            </div>
                            <div className="bg-brand-black-50 p-8 rounded-3xl">
                                <h3 className="text-lg font-black text-brand-black-900 uppercase mb-4 flex items-center gap-2">
                                    <Activity className="w-6 h-6 text-brand-copper-600" />
                                    Health
                                </h3>
                                <p className="leading-relaxed">
                                    German Shepherds are generally healthy but can be prone to certain conditions including hip dysplasia, elbow dysplasia, and degenerative myelopathy. Responsible breeders screen for these conditions. With proper care, nutrition, and regular veterinary checkups, German Shepherds typically live 9-13 years.
                                </p>
                            </div>
                        </div>

                        <div className="bg-brand-black-50 p-8 rounded-3xl">
                            <h3 className="text-lg font-black text-brand-black-900 uppercase mb-4 flex items-center gap-2">
                                <Home className="w-6 h-6 text-brand-copper-600" />
                                Perfect Home
                            </h3>
                            <p className="leading-relaxed">
                                German Shepherds thrive in active households where they can be part of family life. They need regular exercise, mental stimulation, and training to be happy and well-adjusted. Whether in a house with a yard or an apartment (with sufficient exercise), German Shepherds will be devoted companions as long as their needs are met.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-brand-copper-600 to-brand-copper-700 p-8 rounded-3xl text-white">
                            <h3 className="text-lg font-black uppercase mb-4">Why German Shepherds Make Perfect Family Pets</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <Star className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                    <span>Exceptionally loyal and protective of their families</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Star className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                    <span>Highly intelligent and trainable for various tasks</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Star className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                    <span>Excellent with children when properly socialized</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Star className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                    <span>Versatile - great for work or as family companions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Star className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                    <span>Athletic and great for outdoor activities</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-5xl font-black text-brand-black-900 uppercase tracking-tight mb-6">
                        Let's Find Your
                        <br /><span className="text-brand-copper-600">Perfect Match</span>
                    </h2>
                    <p className="text-xl text-brand-black-600 mb-10">
                        We'd love to help you find your new best friend.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/puppies" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-copper-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-copper-800 transition-all">
                            Meet the German Shepherds <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-black-900 text-brand-black-900 font-black uppercase tracking-wider rounded-full hover:bg-brand-black-900 hover:text-white transition-all">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
