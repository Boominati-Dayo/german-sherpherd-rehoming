import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ShieldCheck, Heart, Truck, PawPrint, ArrowRight, MapPin, Clock, CheckCircle, Bone } from "lucide-react";
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
    title: "Cavalier King Charles Spaniel Puppies for Adoption | Cavalier King Charles Rehoming Center",
    description: "Find your perfect Cavalier King Charles Spaniel puppy at Cavalier King Charles Rehoming Center. Responsible adoption, health-guaranteed puppies raised with love. Browse available Cavalier puppies today!",
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

      {/* Dog Print Spiral Journey Section */}
      <section className="py-24 bg-brand-forest-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            {/* Spiral of paw prints - small to big */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <PawPrint className="w-4 h-4 text-brand-orange-300" />
            </div>
            <div className="absolute top-4 left-[60%]">
              <PawPrint className="w-5 h-5 text-brand-orange-300" />
            </div>
            <div className="absolute top-12 left-[75%]">
              <PawPrint className="w-6 h-6 text-brand-orange-400" />
            </div>
            <div className="absolute top-24 left-[85%]">
              <PawPrint className="w-8 h-8 text-brand-orange-400" />
            </div>
            <div className="absolute top-40 right-0">
              <PawPrint className="w-10 h-10 text-brand-orange-500" />
            </div>
            <div className="absolute top-60 right-4">
              <PawPrint className="w-12 h-12 text-brand-orange-500" />
            </div>
            <div className="absolute top-[80%] right-20">
              <PawPrint className="w-14 h-14 text-brand-orange-600" />
            </div>
            <div className="absolute bottom-0 right-1/3">
              <PawPrint className="w-16 h-16 text-brand-orange-600" />
            </div>
            <div className="absolute bottom-4 left-1/3">
              <PawPrint className="w-14 h-14 text-brand-orange-500" />
            </div>
            <div className="absolute bottom-12 left-1/4">
              <PawPrint className="w-12 h-12 text-brand-orange-500" />
            </div>
            <div className="absolute bottom-24 left-10">
              <PawPrint className="w-10 h-10 text-brand-orange-400" />
            </div>
            <div className="absolute top-40 left-0">
              <PawPrint className="w-8 h-8 text-brand-orange-400" />
            </div>
            <div className="absolute top-24 left-8">
              <PawPrint className="w-6 h-6 text-brand-orange-300" />
            </div>
            <div className="absolute top-12 left-20">
              <PawPrint className="w-5 h-5 text-brand-orange-300" />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-brand-forest-900 mb-4 uppercase tracking-tight">
              The Journey Home
            </h2>
            <p className="text-lg text-brand-forest-600 max-w-2xl mx-auto">
              Every Cavalier finds their forever family through a carefully crafted journey of love and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Connect", desc: "Share your story and what you're looking for in a Cavalier companion." },
              { step: "02", title: "Match", desc: "We find the perfect Cavalier that fits your lifestyle and family." },
              { step: "03", title: "Meet", desc: "Get to know your potential new best friend through photos and video calls." },
              { step: "04", title: "Welcome", desc: "Your Cavalier arrives home with full support and guidance." }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow relative">
                <span className="text-6xl font-black text-brand-forest-100 absolute top-4 right-6">{item.step}</span>
                <div className="w-12 h-12 bg-brand-orange-700 rounded-full flex items-center justify-center mb-6">
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-brand-forest-900 mb-3 uppercase">{item.title}</h3>
                <p className="text-brand-forest-600 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cavaliers - Horizontal Scroll */}
      {featuredPuppies.length > 0 && (
        <section className="py-24 bg-brand-forest-50 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
              <div>
                <h2 className="text-3xl sm:text-5xl font-black text-brand-forest-900 uppercase tracking-tight">
                  Featured <span className="text-brand-orange-600">Cavaliers</span>
                </h2>
                <p className="text-brand-forest-600 mt-2 font-medium">Meet our precious babies looking for forever homes</p>
              </div>
              <Link
                href="/puppies"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-orange-800 transition-all"
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
                className="flex-none w-72 sm:w-80 snap-center bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-brand-orange-50 transition-colors shadow-lg"
              >
                <div className="w-16 h-16 bg-brand-orange-100 rounded-full flex items-center justify-center mb-4">
                  <ArrowRight className="w-8 h-8 text-brand-orange-600" />
                </div>
                <p className="font-black text-brand-forest-900 uppercase text-lg">View All</p>
                <p className="text-brand-forest-600 text-sm">See all available Cavaliers</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About Us Section */}
      <section className="py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/thumbnail.png" 
            alt="Cavalier King Charles Rehoming Center"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-forest-900/90 via-brand-forest-900/80 to-brand-forest-900/60" />
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] opacity-20">
            <Bone className="w-12 h-12 text-white" />
          </div>
          <div className="absolute top-40 right-[15%] opacity-20">
            <PawPrint className="w-16 h-16 text-white" />
          </div>
          <div className="absolute bottom-32 left-[20%] opacity-20">
            <Bone className="w-10 h-10 text-white" />
          </div>
          <div className="absolute bottom-20 right-[25%] opacity-20">
            <PawPrint className="w-14 h-14 text-white" />
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6">
                Connecting Families with <span className="text-brand-orange-500">Cavalier Love</span>
              </h2>
              <div className="space-y-4 text-white/70">
                <p className="text-lg leading-relaxed">
                  We are a dedicated team passionate about finding loving forever homes for Cavalier King Charles Spaniels. Our mission is to ensure every Cavalier finds their perfect family.
                </p>
                <p className="text-lg leading-relaxed">
                  With years of experience in Cavalier rehoming, we understand the unique needs of this wonderful breed and work tirelessly to match puppies with the right families.
                </p>
                <p className="text-lg leading-relaxed">
                  Every Cavalier in our care receives the highest quality of love, care, and attention. We conduct thorough assessments to ensure successful adoptions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/about" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-orange-800 transition-all">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold uppercase tracking-wider rounded-full hover:bg-white/10 transition-all">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-forest-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <PawPrint className="w-96 h-96 absolute top-0 right-0 -translate-y-1/2 translate-x-1/4" />
          <PawPrint className="w-64 h-64 absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              Why Choose <span className="text-brand-orange-500">Us</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">Because your new family member deserves the best start in life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Health Guaranteed", desc: "Every Cavalier comes with a full health guarantee and up-to-date vaccinations." },
              { icon: Heart, title: "Personal Matching", desc: "We take the time to understand your family to find the perfect personality match." },
              { icon: Truck, title: "Safe Transport", desc: "Your Cavalier travels safely with professional pet transport to your doorstep." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-brand-orange-700 rounded-2xl flex items-center justify-center mb-6">
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
      <section className="py-24 bg-brand-forest-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-brand-forest-900 uppercase tracking-tight">
              Happy Families
            </h2>
            <p className="text-brand-forest-600 mt-2 font-medium">See what families say about finding their perfect Cavalier</p>
          </div>

          {testimonials && testimonials.length > 0 && <TestimonialsSlider testimonials={testimonials} />}
        </div>
      </section>

      {/* Pet Nanny Transport Section */}
      <section className="py-24 bg-brand-forest-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange-700/10 rounded-full -mr-40 -mt-40 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange-700/5 rounded-full -ml-20 -mb-20 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-6">
                Pet Nanny <span className="text-brand-orange-500">Transport</span>
              </h2>
              <p className="text-white/70 text-lg mb-8">
                We understand that your new Cavalier is part of your family. Our professional pet nanny transport service ensures they arrive safely, comfortably, and with plenty of love—directly to your doorstep.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: ShieldCheck, title: "Fully Insured", desc: "Every transport is fully insured for peace of mind" },
                  { icon: Heart, title: "One-on-One Care", desc: "Individual attention throughout the journey" },
                  { icon: MapPin, title: "Door-to-Door", desc: "We deliver directly to your home" },
                  { icon: Clock, title: "Flexible Scheduling", desc: "We work with your schedule" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-orange-600/20 rounded-xl flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-brand-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{feature.title}</h4>
                      <p className="text-sm text-white/60">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/transport" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-orange-800 transition-all">
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
            <h2 className="text-3xl sm:text-5xl font-black text-brand-forest-900 uppercase tracking-tight">
              Frequently Asked <span className="text-brand-orange-600">Questions</span>
            </h2>
            <p className="text-brand-forest-600 mt-2 font-medium">Everything you need to know about adopting a Cavalier</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What makes Cavalier King Charles Spaniels special?",
                a: "Cavalier King Charles Spaniels are known for their affectionate nature, gentle demeanor, and Royal heritage. They're the perfect blend of elegance and cuddles, making them ideal family companions. Cavaliers are incredibly adaptable and thrive in various living situations."
              },
              {
                q: "Are your puppies health-tested?",
                a: "Yes! All our puppies come from health-tested parents and receive comprehensive veterinary care including vaccinations, deworming, and health certifications. We prioritize breeding for health and temperament."
              },
              {
                q: "How does the adoption process work?",
                a: "Our adoption process is thorough but straightforward: browse available puppies, submit an application, we'll review within 24-48 hours, and once approved, we arrange pickup or transport. We want to ensure every Cavalier finds the perfect forever home."
              },
              {
                q: "Do you offer transport services?",
                a: "Absolutely! Our professional pet nanny transport service can deliver your new Cavalier directly to your doorstep nationwide. We provide regular updates throughout the journey and ensure your puppy travels in comfort."
              },
              {
                q: "What should I expect after adoption?",
                a: "We provide ongoing support for all our adoptive families. You'll receive comprehensive care instructions, health records, and we're always available to answer questions as your new family member settles in."
              }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-brand-forest-50 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-black text-brand-forest-900 text-lg">{faq.q}</span>
                  <span className="w-8 h-8 bg-brand-orange-100 rounded-full flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-4 h-4 text-brand-orange-600" />
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-brand-forest-600">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-brand-forest-600 mb-4">Still have questions?</p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-forest-900 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-forest-800 transition-all">
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-forest-50 to-brand-orange-50/30" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-6xl font-black text-brand-forest-900 uppercase tracking-tight mb-6">
            Ready to Meet Your
            <br /><span className="text-brand-orange-600">Perfect Cavalier?</span>
          </h2>
          <p className="text-xl text-brand-forest-600 mb-10 max-w-2xl mx-auto">
            "Finding the perfect home for every puppy is not just our mission, it's our promise to every family we work with."
            <br /><span className="font-black text-brand-orange-700">— The Team</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/puppies"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-brand-orange-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-orange-800 transition-all hover:scale-105 shadow-xl"
            >
              Browse Cavaliers
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-brand-forest-900 text-brand-forest-900 font-black uppercase tracking-wider rounded-full hover:bg-brand-forest-900 hover:text-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
