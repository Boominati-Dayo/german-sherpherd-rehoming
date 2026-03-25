"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
    children: React.ReactNode;
    className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
    return <div className={cn("space-y-4", className)}>{children}</div>;
}

interface AccordionItemProps {
    value: string;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function AccordionItem({ title, children, className }: AccordionItemProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={cn("border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-300", isOpen && "shadow-md ring-1 ring-brand-forest/5", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50/50 transition-colors focus:outline-none"
            >
                <h3 className="font-bold text-gray-900 leading-tight">{title}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-brand-forest flex-shrink-0 ml-4"
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function AccordionTrigger() { return null; }
export function AccordionContent() { return null; }
