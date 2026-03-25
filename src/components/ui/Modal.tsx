"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" ref={overlayRef} onClick={handleOverlayClick}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        aria-hidden="true"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            mass: 1
                        }}
                        className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-brand-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] ring-1 ring-black/5 flex flex-col"
                    >
                        {/* Glass Header */}
                        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
                            <div>
                                <h2 className="text-2xl font-bold text-brand-forest tracking-tight">{title}</h2>
                                <div className="h-1 w-12 bg-brand-orange rounded-full mt-1" />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="rounded-full bg-gray-50 hover:bg-brand-orange hover:text-white transition-all duration-300 group"
                            >
                                <X className="w-5 h-5 text-gray-500 group-hover:text-white" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>

                        {/* Content Area with custom scrollbar */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-6 custom-scrollbar">
                            {children}
                        </div>

                        {/* Footer/Bottom spacing */}
                        <div className="h-4 bg-gradient-to-t from-white to-transparent pointer-events-none absolute bottom-0 left-0 right-0" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
