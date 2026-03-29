"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Bone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const whiteBgPages = ["/puppies", "/puppies/", "/transport", "/transport/"];
const darkBgPages = ["/", "/about", "/contact"];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    
    const isWhiteBgPage = whiteBgPages.includes(pathname);
    const isDarkBgPage = darkBgPages.includes(pathname);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Transport", href: "/transport" },
        { name: "Contact", href: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => pathname === href;
    
    const getNavColors = () => {
        if (isDarkBgPage) {
            return {
                bg: scrolled ? "bg-brand-forest-900 shadow-lg" : "bg-transparent",
                text: "text-white",
                textHover: "hover:text-brand-orange-500",
                logoBg: scrolled ? "bg-brand-orange-700" : "bg-white",
                logoIcon: scrolled ? "text-white" : "text-brand-forest-800",
                active: "text-brand-orange-500",
            };
        }
        if (isWhiteBgPage) {
            return {
                bg: scrolled ? "bg-white shadow-lg" : "bg-white",
                text: "text-brand-forest-800",
                textHover: "hover:text-brand-orange-700",
                logoBg: scrolled ? "bg-brand-orange-700" : "bg-brand-forest-800",
                logoIcon: "text-white",
                active: "text-brand-orange-700",
            };
        }
        return {
            bg: scrolled ? "bg-white shadow-lg" : "bg-transparent",
            text: scrolled ? "text-brand-forest-800" : "text-brand-forest-800",
            textHover: "hover:text-brand-orange-700",
            logoBg: scrolled ? "bg-brand-orange-700" : "bg-brand-forest-800",
            logoIcon: "text-white",
            active: "text-brand-orange-700",
        };
    };
    
    const colors = getNavColors();

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${colors.bg}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-36 h-12">
                            <Image 
                                src="/assets/CRCRehomingCenterLogo.png" 
                                alt="Cavalier King Charles Rehoming Center"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                                    isActive(link.href)
                                        ? colors.active
                                        : `${colors.text} ${colors.textHover}`
                                }`}
                            >
                                {link.name}
                                {isActive(link.href) && (
                                    <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-orange-500 rounded-full`} />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link 
                            href="/puppies" 
                            className="inline-flex items-center justify-center px-6 py-3 text-sm font-black uppercase tracking-wider bg-brand-orange-700 text-white rounded-full hover:bg-brand-orange-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <Bone className="w-4 h-4 mr-2" />
                            Meet Our Cavaliers
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 transition-colors duration-300 ${colors.text}`}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-brand-forest-900 text-white overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-2 max-h-[70vh] overflow-y-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block py-4 text-lg font-black uppercase tracking-wider transition-colors border-b border-white/10 ${
                                        isActive(link.href)
                                            ? "text-brand-orange-500"
                                            : "hover:text-brand-orange-500"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link 
                                href="/puppies" 
                                onClick={() => setIsOpen(false)}
                                className="block text-center py-4 mt-6 text-sm font-black uppercase tracking-wider bg-brand-orange-700 text-white rounded-full"
                            >
                                Meet Our Cavaliers
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
