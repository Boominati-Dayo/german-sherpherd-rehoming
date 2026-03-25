import Link from "next/link";
import Image from "next/image";
import { PawPrint, Mail, Phone, Bone, Dog } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-brand-forest-900 text-white pt-20 pb-8 relative overflow-hidden">
            {/* Dog-themed Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10">
                    <PawPrint className="w-8 h-8" />
                </div>
                <div className="absolute top-40 right-20">
                    <Bone className="w-10 h-10" />
                </div>
                <div className="absolute bottom-20 left-1/4">
                    <Dog className="w-8 h-8" />
                </div>
                <div className="absolute bottom-40 right-1/3">
                    <PawPrint className="w-12 h-12" />
                </div>
                <div className="absolute top-1/3 left-10">
                    <Bone className="w-6 h-6" />
                </div>
                <div className="absolute bottom-1/3 right-10">
                    <Dog className="w-6 h-6" />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <div className="relative w-48 h-16">
                                <Image 
                                    src="/assets/RebeccaHermanFosteringLogo.png" 
                                    alt="Rebecca Herman's Fostering"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-white/70 leading-relaxed font-medium italic">
                            "Connecting loving families with their perfect Cavalier companions."
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-brand-orange-500">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-white/70 hover:text-brand-orange-500 transition-colors font-medium">Home</Link></li>
                            <li><Link href="/about" className="text-white/70 hover:text-brand-orange-500 transition-colors font-medium">About Rebecca</Link></li>
                            <li><Link href="/puppies" className="text-white/70 hover:text-brand-orange-500 transition-colors font-medium">Available Cavaliers</Link></li>
                            <li><Link href="/contact" className="text-white/70 hover:text-brand-orange-500 transition-colors font-medium">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-brand-orange-500">Resources</h4>
                        <ul className="space-y-3">
                            <li><Link href="/terms" className="text-white/70 hover:text-brand-orange-500 transition-colors font-medium">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-white/70 hover:text-brand-orange-500 transition-colors font-medium">Privacy Policy</Link></li>
                            <li><Link href="/admin" className="text-white/70 hover:text-brand-orange-500 transition-colors font-medium">Admin</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-brand-orange-500">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-orange-700/20 rounded-full flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-brand-orange-500" />
                                </div>
                                <span className="text-white/70 font-medium">rebecca@rebecca-herman.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-orange-700/20 rounded-full flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-brand-orange-500" />
                                </div>
                                <span className="text-white/70 font-medium">(555) 123-4567</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <p className="text-center text-xs font-medium text-white/50">
                        &copy; {new Date().getFullYear()} Rebecca Herman's Fostering. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
