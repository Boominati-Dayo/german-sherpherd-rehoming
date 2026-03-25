import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { Heart, ShieldCheck, Star, PawPrint, ArrowRight, Bone, Dog, Clock, Home, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "About Rebecca Herman",
    description: "Learn about Rebecca Herman and her mission to find loving forever homes for Cavalier King Charles Spaniels. Our commitment to responsible breeding and adoption.",
});

const familyImages = [
    { src: "/assets/rebeccaFamily/rebeccainherweddingphoto.jpg", alt: "Rebecca in her wedding photo" },
    { src: "/assets/rebeccaFamily/rebeccawithahappyfamillyandanoldlady.jpg", alt: "Rebecca with a happy family and elderly lady" },
    { src: "/assets/rebeccaFamily/rebeccaatbirthdaypartyofsomecomunitykids.jpg", alt: "Rebecca at a community event" },
    { src: "/assets/rebeccaFamily/rebeccaandsomeladiesatapress.jpg", alt: "Rebecca with friends" },
    { src: "/assets/rebeccaFamily/rebebeccaandherfriendstakingselfieatnight.jpg", alt: "Rebecca taking selfie with friends" },
    { src: "/assets/rebeccaFamily/twoofrebeccasdogssleepingonchair.jpg", alt: "Rebecca's Cavaliers" },
];

export default function AboutPage() {
    return (
        <div className="bg-brand-forest-50 min-h-screen">
            {/* Hero */}
            <section className="relative bg-brand-forest-900 py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange-700/10 rounded-full -mr-40 -mt-40 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange-700/5 rounded-full -ml-20 -mb-20 blur-3xl" />
                </div>
                
                <div className="absolute inset-0 opacity-10">
                    <Bone className="w-32 h-32 absolute top-20 left-[10%]" />
                    <Dog className="w-24 h-24 absolute top-40 right-[20%]" />
                    <PawPrint className="w-20 h-20 absolute bottom-32 left-[30%]" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-6">
                        About <span className="text-brand-orange-500">Rebecca</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        The founder of Rebecca Herman's Fostering
                    </p>
                </div>
            </section>

            {/* My Story */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="relative">
                                <div className="aspect-[4/5] rounded-[3rem] bg-gradient-to-br from-brand-forest-100 to-brand-orange-100 overflow-hidden shadow-2xl">
                                    <Image 
                                        src="/assets/rebeccaFamily/rebeccainherweddingphoto.jpg"
                                        alt="Rebecca Herman"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                                    <p className="text-4xl font-black text-brand-orange-600">10+</p>
                                    <p className="text-sm font-bold text-brand-forest-600 uppercase">Years of Love</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl sm:text-5xl font-black text-brand-forest-900 uppercase tracking-tight mb-8">
                                My <span className="text-brand-orange-600">Journey</span>
                            </h2>
                            
                            <div className="space-y-6 text-brand-forest-700 text-lg leading-relaxed">
                                <p>
                                    I'm Rebecca Herman, a 34-year-old wife, mother of four, and passionate dog lover. My connection with dogs—especially Cavalier King Charles Spaniels—began in childhood.
                                </p>
                                <p>
                                    Although my early experiences weren't ideal, they shaped a deep personal promise within me: to always love, protect, and advocate for dogs, and to support anyone who shares that same compassion.
                                </p>
                                <p>
                                    Over the years, I became increasingly aware of the heartbreaking number of dogs in shelters, often surrendered for reasons beyond their control. Seeing this inspired me to take action and make a difference.
                                </p>
                            </div>

                            <div className="mt-10 p-8 bg-brand-forest-50 rounded-[2rem] border-l-4 border-brand-orange-600">
                                <p className="text-xl font-serif italic text-brand-forest-800">
                                    "Every family I help find their perfect Cavalier becomes part of my extended family. Watching these beautiful dogs bring joy to homes across the country is what makes this work so meaningful."
                                </p>
                                <p className="mt-4 font-black text-brand-orange-700">— Rebecca Herman</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Family Images - Carousel on mobile, grid on desktop */}
            <section className="py-16 bg-brand-forest-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Desktop: Grid */}
                    <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {familyImages.map((img, idx) => (
                            <div key={idx} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg relative">
                                <Image 
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Mobile: Carousel */}
                    <div className="lg:hidden">
                        <div className="flex gap-4 overflow-x-auto snap-x pb-4 scrollbar-hide">
                            {familyImages.map((img, idx) => (
                                <div key={idx} className="flex-none w-[280px] snap-center">
                                    <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg relative">
                                        <Image 
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                            {familyImages.map((_, idx) => (
                                <div key={idx} className="w-2 h-2 rounded-full bg-brand-orange-300" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* My Mission */}
            <section className="py-24 bg-brand-forest-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <PawPrint className="w-48 h-48 absolute top-10 right-10" />
                    <PawPrint className="w-32 h-32 absolute bottom-10 left-10" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                            My <span className="text-brand-orange-500">Mission</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">Creating meaningful connections between Cavaliers and loving families.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <Heart className="w-12 h-12 text-brand-orange-500 mb-4" />
                            <h3 className="text-xl font-black uppercase mb-3">A Bridge of Love</h3>
                            <p className="text-white/70">
                                This platform was built to bridge the gap between dog owners who can no longer care for their pets and loving individuals or families ready to provide them with safe, happy homes.
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                            <ShieldCheck className="w-12 h-12 text-brand-orange-500 mb-4" />
                            <h3 className="text-xl font-black uppercase mb-3">Trusted Intermediary</h3>
                            <p className="text-white/70">
                                My role is to act as a trusted intermediary—ensuring every rehoming process is handled with care, transparency, and the best interests of the dogs at heart.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-2xl font-serif italic text-white/80 max-w-3xl mx-auto">
                            "For me, this is more than just a platform—it's a commitment to giving every dog the second chance they deserve and helping loving homes find the perfect companion."
                        </p>
                    </div>
                </div>
            </section>

            {/* About Cavaliers */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black text-brand-forest-900 uppercase tracking-tight">
                            The <span className="text-brand-orange-600">Cavalier</span>
                        </h2>
                        <p className="text-brand-forest-600 mt-2">Why I specialize in these magnificent dogs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Heart, title: "Affectionate", desc: "Known for their loving, gentle nature and desire to be close to their humans" },
                            { icon: Star, title: "Royal Heritage", desc: "Descendants of royal companions, carrying elegance and grace" },
                            { icon: ShieldCheck, title: "Healthy", desc: "When properly cared for, they bring years of joy" },
                            { icon: PawPrint, title: "Adaptable", desc: "Perfect for various living situations, from apartments to houses" }
                        ].map((item, i) => (
                            <div key={i} className="bg-brand-forest-50 rounded-3xl p-8 text-center hover:bg-brand-orange-50 transition-colors">
                                <div className="w-16 h-16 bg-brand-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-black text-brand-forest-900 uppercase mb-2">{item.title}</h3>
                                <p className="text-sm text-brand-forest-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About The Breed - Cavalier King Charles Spaniel */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    {/* Scattered Cavalier Picture Cards - Using local images */}
                    <div className="absolute top-20 left-[5%] w-48 h-48 rotate-[-12deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image1.jpg" 
                                alt="Cavalier King Charles Spaniel"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute top-40 right-[8%] w-40 h-40 rotate-[8deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image2.jpg" 
                                alt="Cavalier Puppy"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute bottom-32 left-[12%] w-36 h-36 rotate-[-6deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image3.jpg" 
                                alt="Cavalier Dog"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute bottom-20 right-[5%] w-44 h-44 rotate-[10deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image4.jpg" 
                                alt="Cavalier Companion"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute top-1/3 left-[25%] w-32 h-32 rotate-[-15deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image5.jpg" 
                                alt="Cavalier Portrait"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute top-1/2 right-[20%] w-28 h-28 rotate-[5deg] hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                                src="/assets/cavalierKingCharlesAboutBreedImages/image6.jpg" 
                                alt="Cavalier Playing"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-5xl font-black text-brand-forest-900 uppercase tracking-tight mb-4">
                            About The <span className="text-brand-orange-600">Breed</span>
                        </h2>
                        <p className="text-brand-forest-600 text-lg">The Royal Breed That Steals Hearts</p>
                    </div>

                    <div className="space-y-8 text-brand-forest-700">
                        <div className="bg-brand-forest-50 p-8 rounded-3xl">
                            <h3 className="text-xl font-black text-brand-forest-900 uppercase mb-4 flex items-center gap-2">
                                <Star className="w-6 h-6 text-brand-orange-600" />
                                History & Heritage
                            </h3>
                            <p className="text-lg leading-relaxed">
                                The Cavalier King Charles Spaniel is a breed with Royal roots stretching back to the courts of King Charles II of England in the 17th century. These elegant companions were beloved by aristocracy and royalty for centuries, often depicted in paintings alongside their noble owners. Today's Cavaliers retain that aristocratic bearing while possessing an affectionate, playful nature that makes them the perfect family companion.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-brand-forest-50 p-8 rounded-3xl">
                                <h3 className="text-lg font-black text-brand-forest-900 uppercase mb-4 flex items-center gap-2">
                                    <Heart className="w-6 h-6 text-brand-orange-600" />
                                    Temperament
                                </h3>
                                <p className="leading-relaxed">
                                    Cavaliers are the epitome of a lap dog with a heart full of love. They're known for their gentle, affectionate nature and their ability to get along with everyone—from children to seniors, other dogs, and even cats. Their trusting, friendly disposition makes them poor guard dogs but perfect therapy dogs and family companions.
                                </p>
                            </div>
                            <div className="bg-brand-forest-50 p-8 rounded-3xl">
                                <h3 className="text-lg font-black text-brand-forest-900 uppercase mb-4 flex items-center gap-2">
                                    <Activity className="w-6 h-6 text-brand-orange-600" />
                                    Health
                                </h3>
                                <p className="leading-relaxed">
                                    While generally healthy, Cavaliers can be prone to certain conditions including Mitral Valve Disease (heart), syringomyelia, and hip dysplasia. Responsible breeders screen for these conditions. With proper care, nutrition, and regular veterinary checkups, Cavaliers typically live 10-14 years, bringing a decade or more of joy to their families.
                                </p>
                            </div>
                        </div>

                        <div className="bg-brand-forest-50 p-8 rounded-3xl">
                            <h3 className="text-lg font-black text-brand-forest-900 uppercase mb-4 flex items-center gap-2">
                                <Home className="w-6 h-6 text-brand-orange-600" />
                                Perfect Home
                            </h3>
                            <p className="leading-relaxed">
                                Cavaliers are incredibly adaptable and thrive in various living situations. Whether you live in a spacious country home or a cozy city apartment, Cavaliers will be content as long as they're with their beloved family. They don't do well being left alone for long periods—they're true companion dogs who need to be part of family life. Daily walks and some playtime keep them happy and healthy.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-brand-orange-600 to-brand-orange-700 p-8 rounded-3xl text-white">
                            <h3 className="text-lg font-black uppercase mb-4">Why Cavaliers Make Perfect Family Pets</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <Star className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                    <span>Exceptionally gentle and good with children of all ages</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Star className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                    <span>Adaptable to apartment living or houses with yards</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Star className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                    <span>Low to moderate exercise needs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Star className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                    <span>Highly trainable and eager to please</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Star className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                    <span>Affectionate and always want to be by your side</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-5xl font-black text-brand-forest-900 uppercase tracking-tight mb-6">
                        Let's Find Your
                        <br /><span className="text-brand-orange-600">Perfect Match</span>
                    </h2>
                    <p className="text-xl text-brand-forest-600 mb-10">
                        I'd love to help you find your new best friend.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/puppies" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-orange-800 transition-all">
                            Meet the Cavaliers <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-forest-900 text-brand-forest-900 font-black uppercase tracking-wider rounded-full hover:bg-brand-forest-900 hover:text-white transition-all">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
