import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ShieldCheck, Heart, Truck, PawPrint, ArrowRight, MapPin, Clock, CheckCircle, Bone, Award, Users, Star, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PuppyCard } from "@/components/PuppyCard";
import { HomeHero } from "@/components/HomeHero";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { TransportIncludedCard } from "@/components/TransportIncludedCard";
import dbConnect from "@/lib/db";
import Puppy from "@/models/Puppy";
import Testimonial from "@/models/Testimonial";
import NannyImage from "@/models/NannyImage";
import { seoConfig, generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "German Shepherd Puppies for Adoption | German Shepherd Rehoming Center",
    description: "Find your perfect German Shepherd puppy at German Shepherd Rehoming Center. Responsible adoption, health-guaranteed puppies raised with love. Browse available German Shepherd puppies today!",
});

export const revalidate = 0;

export default async function Home() {
  await dbConnect();
  
  // First try to get featured puppies, then fall back to available
  let puppiesDocs = await Puppy.find({ status: "available", featured: true }).limit(6).lean();
  
  // If no featured, get recent available puppies
  if (puppiesDocs.length === 0) {
    puppiesDocs = await Puppy.find({ status: "available" }).limit(6).sort({ createdAt: -1 }).lean();
  }
  
  const featuredPuppies = JSON.parse(JSON.stringify(puppiesDocs)).map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    breed: p.breed,
    age: p.age,
    image: p.image,
    status: p.status,
    description: p.description,
  }));

  const testimonialDocs = await Testimonial.find({}).limit(10).sort({ date: -1 }).lean();
  const testimonials = JSON.parse(JSON.stringify(testimonialDocs)).map((t: any) => ({
    name: t.name,
    text: t.text,
    location: t.location,
    rating: Number(t.rating) || 5,
    image: t.image || null
  }));

  const nannyImageDocs = await NannyImage.find({ featured: true }).limit(6).lean();
  const featuredNannyImages = JSON.parse(JSON.stringify(nannyImageDocs)).map((n: any) => ({
    id: n._id.toString(),
    image: n.image
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHero />

      {/* Modern Stats Section - No cards, inline style */}
      <section className="py-20 bg-gradient-to-br from-brand-black-900 via-brand-black-800 to-brand-black-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-copper-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-copper-600 rounded-full blur-3xl" />
          {/* Scattered icons as background */}
          <PawPrint className="absolute top-10 left-[10%] w-8 h-8 text-brand-copper-400/30" />
          <Bone className="absolute top-20 right-[15%] w-10 h-10 text-brand-copper-400/20" />
          <Heart className="absolute bottom-20 left-[20%] w-6 h-6 text-brand-copper-400/30" />
          <PawPrint className="absolute bottom-10 right-[25%] w-12 h-12 text-brand-copper-400/20" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {[
              { icon: Users, number: "20+", label: "Happy Families" },
              { icon: Heart, number: "2+", label: "Years Experience" },
              { icon: Star, number: "100%", label: "Dedication" },
              { icon: TrendingUp, number: "15+", label: "Dogs Placed" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center flex items-center gap-4">
                <stat.icon className="w-8 h-8 text-brand-copper-400" />
                <div className="text-left">
                  <p className="text-3xl font-black text-white">{stat.number}</p>
                  <p className="text-sm text-brand-copper-300 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dog Print Spiral Journey Section */}
      <section className="py-24 bg-brand-black-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            {/* Spiral of paw prints - small to big */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <PawPrint className="w-4 h-4 text-brand-copper-300" />
            </div>
            <div className="absolute top-4 left-[60%]">
              <PawPrint className="w-5 h-5 text-brand-copper-300" />
            </div>
            <div className="absolute top-12 left-[75%]">
              <PawPrint className="w-6 h-6 text-brand-copper-400" />
            </div>
            <div className="absolute top-24 left-[85%]">
              <PawPrint className="w-8 h-8 text-brand-copper-400" />
            </div>
            <div className="absolute top-40 right-0">
              <PawPrint className="w-10 h-10 text-brand-copper-500" />
            </div>
            <div className="absolute top-60 right-4">
              <PawPrint className="w-12 h-12 text-brand-copper-500" />
            </div>
            <div className="absolute top-[80%] right-20">
              <PawPrint className="w-14 h-14 text-brand-copper-600" />
            </div>
            <div className="absolute bottom-0 right-1/3">
              <PawPrint className="w-16 h-16 text-brand-copper-600" />
            </div>
            <div className="absolute bottom-4 left-1/3">
              <PawPrint className="w-14 h-14 text-brand-copper-500" />
            </div>
            <div className="absolute bottom-12 left-1/4">
              <PawPrint className="w-12 h-12 text-brand-copper-500" />
            </div>
            <div className="absolute bottom-24 left-10">
              <PawPrint className="w-10 h-10 text-brand-copper-400" />
            </div>
            <div className="absolute top-40 left-0">
              <PawPrint className="w-8 h-8 text-brand-copper-400" />
            </div>
            <div className="absolute top-24 left-8">
              <PawPrint className="w-6 h-6 text-brand-copper-300" />
            </div>
            <div className="absolute top-12 left-20">
              <PawPrint className="w-5 h-5 text-brand-copper-300" />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-brand-black-900 mb-4 uppercase tracking-tight">
              The Journey Home
            </h2>
            <p className="text-lg text-brand-black-600 max-w-2xl mx-auto">
              Every German Shepherd finds their forever family through a carefully crafted journey of love and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Connect", desc: "Share your story and what you're looking for in a German Shepherd companion." },
              { step: "02", title: "Match", desc: "We find the perfect German Shepherd that fits your lifestyle and family." },
              { step: "03", title: "Meet", desc: "Get to know your potential new best friend through photos and video calls." },
              { step: "04", title: "Welcome", desc: "Your German Shepherd arrives home with full support and guidance." }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-brand-black-100 hover:border-brand-copper-200 transition-colors relative">
                <span className="text-6xl font-black text-brand-black-100 absolute top-4 right-6">{item.step}</span>
                <div className="w-12 h-12 bg-brand-copper-100 rounded-2xl flex items-center justify-center mb-6">
                  <PawPrint className="w-6 h-6 text-brand-copper-600" />
                </div>
                <h3 className="text-xl font-black text-brand-black-900 mb-3 uppercase">{item.title}</h3>
                <p className="text-brand-black-600 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured German Shepherds - Horizontal Scroll */}
      {featuredPuppies.length > 0 && (
        <section className="py-24 bg-brand-black-50 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
              <div>
                <h2 className="text-3xl sm:text-5xl font-black text-brand-black-900 uppercase tracking-tight">
                  Featured <span className="text-brand-copper-600">German Shepherds</span>
                </h2>
                <p className="text-brand-black-600 mt-2 font-medium">Meet our precious babies looking for forever homes</p>
              </div>
              <Link
                href="/puppies"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-copper-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-copper-800 transition-all"
              >
                View All <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
              {featuredPuppies.map((puppy: any) => (
                <div key={puppy.id} className="flex-none w-72 sm:w-80 snap-center">
                  <PuppyCard puppy={puppy} />
                </div>
              ))}
              {/* View All Card */}
              <Link 
                href="/puppies"
                className="flex-none w-72 sm:w-80 snap-center bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-brand-copper-50 transition-colors border border-brand-black-100"
              >
                <div className="w-16 h-16 bg-brand-copper-100 rounded-2xl flex items-center justify-center mb-4">
                  <ArrowRight className="w-8 h-8 text-brand-copper-600" />
                </div>
                <p className="font-black text-brand-black-900 uppercase text-lg">View All</p>
                <p className="text-brand-black-600 text-sm">See all available German Shepherds</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Us Section */}
      <section className="py-24 bg-brand-black-900 text-white relative overflow-hidden">
        {/* Animated background - no image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-black-900 via-brand-black-800 to-brand-black-900" />
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-copper-700/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-copper-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        
        {/* Decorative paw pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-10 left-[5%]"><PawPrint className="w-20" /></div>
          <div className="absolute top-1/3 right-[10%]"><Bone className="w-14" /></div>
          <div className="absolute bottom-20 left-[20%]"><PawPrint className="w-10" /></div>
          <div className="absolute bottom-10 right-[25%]"><Bone className="w-12" /></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6 leading-tight">
                Connecting Families with <span className="text-brand-copper-500">German Shepherd Love</span>
              </h2>
              <div className="space-y-4 text-white/70">
                <p className="text-lg leading-relaxed">
                  We are a dedicated team passionate about finding loving forever homes for German Shepherds. Our mission is to ensure every German Shepherd finds their perfect family.
                </p>
                <p className="text-lg leading-relaxed">
                  With years of experience in German Shepherd rehoming, we understand the unique needs of this wonderful breed and work tirelessly to match puppies with the right families.
                </p>
                <p className="text-lg leading-relaxed">
                  Every German Shepherd in our care receives the highest quality of love, care, and attention. We conduct thorough assessments to ensure successful adoptions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/about" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-copper-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-copper-600 hover:scale-105 transition-all">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-copper-500 text-brand-copper-400 font-bold uppercase tracking-wider rounded-full hover:bg-brand-copper-500/10 transition-all">
                  Get in Touch
                </Link>
              </div>
            </div>
            
            {/* Feature cards - right side */}
            <div className="space-y-4 hidden lg:block">
              <div className="bg-brand-black-800 p-6 rounded-2xl border border-brand-copper-700/30 hover:border-brand-copper-500 transition-colors">
                <Heart className="w-10 h-10 text-brand-copper-500 mb-4" />
                <h3 className="text-xl font-black uppercase mb-2">Love & Care</h3>
                <p className="text-white/60">Every German Shepherd receives unconditional love and expert care</p>
              </div>
              <div className="bg-brand-black-800 p-6 rounded-2xl border border-brand-copper-700/30 hover:border-brand-copper-500 transition-colors ml-8">
                <Shield className="w-10 h-10 text-brand-copper-500 mb-4" />
                <h3 className="text-xl font-black uppercase mb-2">Trusted Process</h3>
                <p className="text-white/60">Thorough assessments ensure perfect matches</p>
              </div>
              <div className="bg-brand-black-800 p-6 rounded-2xl border border-brand-copper-700/30 hover:border-brand-copper-500 transition-colors">
                <PawPrint className="w-10 h-10 text-brand-copper-500 mb-4" />
                <h3 className="text-xl font-black uppercase mb-2">Breed Experts</h3>
                <p className="text-white/60">Years of specialized German Shepherd experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-black-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <PawPrint className="w-96 h-96 absolute top-0 right-0 -translate-y-1/2 translate-x-1/4" />
          <PawPrint className="w-64 h-64 absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              Why Choose <span className="text-brand-copper-500">Us</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">Because your new family member deserves the best start in life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Health Guaranteed", desc: "Every German Shepherd comes with a full health guarantee and up-to-date vaccinations." },
              { icon: Heart, title: "Personal Matching", desc: "We take the time to understand your family to find the perfect personality match." },
              { icon: Truck, title: "Safe Transport", desc: "Your German Shepherd travels safely with professional pet transport to your doorstep." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-brand-copper-700 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black uppercase mb-3">{item.title}</h3>
                <p className="text-white/70 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-black-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-brand-black-900 uppercase tracking-tight">
              Happy Families
            </h2>
            <p className="text-brand-black-600 mt-2 font-medium">See what families say about finding their perfect German Shepherd</p>
          </div>

          {testimonials && testimonials.length > 0 && <TestimonialsSlider testimonials={testimonials} />}
        </div>
      </section>

      {/* Pet Nanny Transport Section */}
      <section className="py-24 bg-brand-black-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-copper-700/10 rounded-full -mr-40 -mt-40 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-copper-700/5 rounded-full -ml-20 -mb-20 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6">
                Pet Nanny <span className="text-brand-copper-500">Transport</span>
              </h2>
              <p className="text-white/70 text-lg mb-8">
                We understand that your new German Shepherd is part of your family. Our professional pet nanny transport service ensures they arrive safely, comfortably, and with plenty of love—directly to your doorstep.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: ShieldCheck, title: "Fully Insured", desc: "Every transport is fully insured for peace of mind" },
                  { icon: Heart, title: "One-on-One Care", desc: "Individual attention throughout the journey" },
                  { icon: MapPin, title: "Door-to-Door", desc: "We deliver directly to your home" },
                  { icon: Clock, title: "Flexible Scheduling", desc: "We work with your schedule" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-copper-600/20 rounded-xl flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-brand-copper-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{feature.title}</h4>
                      <p className="text-sm text-white/60">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/transport" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-copper-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-copper-800 transition-all">
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-black uppercase tracking-wider rounded-full hover:bg-white/10 transition-all">
                  Get a Quote
                </Link>
              </div>

              {featuredNannyImages.length > 0 && (
                <div className="mt-8 lg:hidden">
                  <div className="grid grid-cols-3 gap-2">
                    {featuredNannyImages.slice(0, 6).map((img: any) => (
                      <div key={img.id} className="aspect-square rounded-xl overflow-hidden relative">
                        <Image 
                          src={img.image} 
                          alt="Pet nanny transport"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden lg:block">
              <TransportIncludedCard images={featuredNannyImages} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-brand-black-900 uppercase tracking-tight">
              Frequently Asked <span className="text-brand-copper-600">Questions</span>
            </h2>
            <p className="text-brand-black-600 mt-2 font-medium">Everything you need to know about adopting a German Shepherd</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What makes German Shepherds special?",
                a: "German Shepherds are known for their loyal nature, intelligence, and versatility. They're the perfect blend of elegance and protection, making them ideal family companions. German Shepherds are incredibly adaptable and thrive in various living situations."
              },
              {
                q: "Are your puppies health-tested?",
                a: "Yes! All our puppies come from health-tested parents and receive comprehensive veterinary care including vaccinations, deworming, and health certifications. We prioritize breeding for health and temperament."
              },
              {
                q: "How does the adoption process work?",
                a: "Our adoption process is thorough but straightforward: browse available puppies, submit an application, we'll review within 24-48 hours, and once approved, we arrange pickup or transport. We want to ensure every German Shepherd finds the perfect forever home."
              },
              {
                q: "Do you offer transport services?",
                a: "Absolutely! Our professional pet nanny transport service can deliver your new German Shepherd directly to your doorstep nationwide. We provide regular updates throughout the journey and ensure your puppy travels in comfort."
              },
              {
                q: "What should I expect after adoption?",
                a: "We provide ongoing support for all our adoptive families. You'll receive comprehensive care instructions, health records, and we're always available to answer questions as your new family member settles in."
              }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-brand-black-50 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-black text-brand-black-900 text-lg">{faq.q}</span>
                  <span className="w-8 h-8 bg-brand-copper-100 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-4 h-4 text-brand-copper-600" />
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-brand-black-600">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-brand-black-600 mb-4">Still have questions?</p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-black-900 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-black-800 transition-all">
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black-50 to-brand-copper-50/30" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-copper-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-copper-400/10 rounded-full blur-3xl" />
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-copper-100 rounded-full mb-6">
            <Star className="w-4 h-4 text-brand-copper-600" />
            <span className="text-sm font-bold text-brand-copper-700">Start Your Journey Today</span>
          </div>
          
          <h2 className="text-3xl sm:text-6xl font-black text-brand-black-900 uppercase tracking-tight mb-6">
            Ready to Meet Your
            <br /><span className="text-brand-copper-600">Perfect German Shepherd?</span>
          </h2>
          <p className="text-xl text-brand-black-600 mb-10 max-w-2xl mx-auto">
            "Finding the perfect home for every puppy is not just our mission, it's our promise to every family we work with."
            <br /><span className="font-black text-brand-copper-700">— The Team</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/puppies"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-brand-copper-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-copper-800 transition-all hover:scale-105"
            >
              Browse German Shepherds
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-brand-black-900 text-brand-black-900 font-black uppercase tracking-wider rounded-full hover:bg-brand-black-900 hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
