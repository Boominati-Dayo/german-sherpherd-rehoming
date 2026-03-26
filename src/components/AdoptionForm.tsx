"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface Question {
    id: string;
    question: string;
    type: "text" | "textarea" | "select" | "radio" | "checkbox" | "scale";
    options?: string[];
    required?: boolean;
}

const questions: Question[] = [
    {
        id: "homeLifestyle",
        question: "1. Home & Lifestyle - Please provide an overview of your household, including who resides in the home, your living environment (house, apartment, etc.), and what a typical weekday and weekend look like.",
        type: "textarea",
        required: true
    },
    {
        id: "canineExperience",
        question: "2. Canine Experience - Kindly share your experience with dogs, particularly companion or small breeds such as the Cavalier King Charles Spaniel. If applicable, include details of any current or previous pets.",
        type: "textarea",
        required: true
    },
    {
        id: "currentPets",
        question: "Do you currently have any pets?",
        type: "radio",
        options: ["Yes, dogs", "Yes, cats", "Yes, both", "No pets currently"],
        required: true
    },
    {
        id: "currentPetsDetails",
        question: "Please provide details about your current pets (breeds, ages, etc.):",
        type: "textarea",
        required: false
    },
    {
        id: "hoursAlone",
        question: "3. Time, Presence & Care Plan - Approximately how many hours per day would the Cavalier be alone?",
        type: "select",
        options: ["Less than 2 hours", "2-4 hours", "4-6 hours", "6-8 hours", "More than 8 hours"],
        required: true
    },
    {
        id: "careArrangement",
        question: "What arrangements are in place to ensure the Cavalier's mental stimulation, care, and emotional well-being when you're away?",
        type: "textarea",
        required: true
    },
    {
        id: "livingEnvironment",
        question: "4. Environment & Safety - What type of living environment do you have?",
        type: "radio",
        options: ["Detached House", "Semi-detached House", "Apartment", "Condo", "Other"],
        required: true
    },
    {
        id: "livingEnvironmentOther",
        question: "Please specify your living environment:",
        type: "text",
        required: false
    },
    {
        id: "outdoorSpace",
        question: "Do you have outdoor space available?",
        type: "radio",
        options: ["Yes, fenced yard", "Yes, unfenced yard", "No outdoor space", "Other"],
        required: true
    },
    {
        id: "outdoorSpaceDetails",
        question: "Please describe your outdoor space:",
        type: "textarea",
        required: false
    },
    {
        id: "readinessScore",
        question: "5. Readiness & Long-Term Commitment - On a scale of 1-100, how prepared do you feel to welcome a Cavalier into your home at this time?",
        type: "scale",
        required: true
    },
    {
        id: "readinessExplanation",
        question: "Please elaborate on your response and what makes you confident in your readiness for the long-term responsibilities of dog ownership:",
        type: "textarea",
        required: true
    },
    {
        id: "veterinarian",
        question: "Do you have a veterinarian selected?",
        type: "radio",
        options: ["Yes", "No, but plan to", "No"],
        required: true
    },
    {
        id: "vetDetails",
        question: "Please provide your veterinarian's name and contact (if available):",
        type: "text",
        required: false
    },
    {
        id: "pickupOrShipping",
        question: "6. Pickup or Shipping - Would you prefer to pick up the Cavalier yourself, or would you like us to arrange professional pet transport/shipping?",
        type: "radio",
        options: ["I will pick up in person", "Please arrange pet transport/shipping"],
        required: true
    },
    {
        id: "agreement",
        question: "I understand that this is a standard placement process and agree to provide accurate information:",
        type: "radio",
        options: ["I agree"],
        required: true
    }
];

interface AdoptionFormProps {
    puppyName: string;
    puppyId: string;
    onSuccess: () => void;
}

export function AdoptionForm({ puppyName, puppyId, onSuccess }: AdoptionFormProps) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        fullLegalName: "",
        email: "",
        residentialAddress: "",
        telephone: "",
        nearestAirport: "",
        deliveryOption: "",
        arrivalAvailability: ""
    });

    const currentQuestion = questions[step];
    const progress = ((step + 1) / questions.length) * 100;

    const handleAnswer = (answer: any) => {
        setFormData({ ...formData, [currentQuestion.id]: answer });
        setStep(step + 1);
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const fullData = {
                ...formData,
                applicantName: contactInfo.fullLegalName,
                email: contactInfo.email,
                phone: contactInfo.telephone,
                location: contactInfo.residentialAddress,
                nearestAirport: contactInfo.nearestAirport,
                deliveryOption: contactInfo.deliveryOption,
                arrivalAvailability: contactInfo.arrivalAvailability,
                puppyName,
                puppyId
            };

            const res = await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fullData),
            });

            if (res.ok) {
                toast.success("Application submitted successfully!");
                setSubmitted(true);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const shouldShowQuestion = () => {
        if (currentQuestion.id === "currentPetsDetails") {
            return formData.currentPets && ["Yes, dogs", "Yes, cats", "Yes, both"].includes(formData.currentPets);
        }
        if (currentQuestion.id === "livingEnvironmentOther") {
            return formData.livingEnvironment === "Other";
        }
        if (currentQuestion.id === "outdoorSpaceDetails") {
            return formData.outdoorSpace === "Other";
        }
        if (currentQuestion.id === "vetDetails") {
            return formData.veterinarian === "Yes" || formData.veterinarian === "No, but plan to";
        }
        return true;
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-forest-50 rounded-[2rem] p-8 md:p-12 text-center border border-brand-forest-100"
            >
                <div className="w-20 h-20 bg-brand-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-brand-orange-700" />
                </div>
                <h3 className="text-2xl font-black text-brand-forest-900 mb-4 uppercase">Application Submitted!</h3>
                <p className="text-brand-forest-700 mb-6 leading-relaxed">
                    Thank you for your interest in <strong>{puppyName}</strong>. Rebecca will personally review your application and get back to you within 24-48 hours.
                </p>
                <p className="text-sm text-brand-forest-500">
                    You will receive a confirmation email shortly.
                </p>
            </motion.div>
        );
    }

    if (step >= questions.length) {
        if (!showContactForm) {
            setShowContactForm(true);
            return null;
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-brand-forest-100"
            >
                <h3 className="text-xl font-black text-brand-forest-900 mb-6 uppercase">Final Details</h3>
                <p className="text-brand-forest-600 mb-6">Please provide your contact and delivery information to complete your application.</p>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs font-black text-brand-forest-700 uppercase">Full Legal Name(s) *</Label>
                        <Input
                            value={contactInfo.fullLegalName}
                            onChange={(e) => setContactInfo({ ...contactInfo, fullLegalName: e.target.value })}
                            placeholder="Enter full legal name(s)"
                            required
                            className="rounded-xl h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-black text-brand-forest-700 uppercase">Email Address *</Label>
                        <Input
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                            required
                            className="rounded-xl h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-black text-brand-forest-700 uppercase">Residential Address *</Label>
                        <Input
                            value={contactInfo.residentialAddress}
                            onChange={(e) => setContactInfo({ ...contactInfo, residentialAddress: e.target.value })}
                            placeholder="Full street address, city, state, zip"
                            required
                            className="rounded-xl h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-black text-brand-forest-700 uppercase">Telephone Number *</Label>
                        <Input
                            type="tel"
                            value={contactInfo.telephone}
                            onChange={(e) => setContactInfo({ ...contactInfo, telephone: e.target.value })}
                            required
                            className="rounded-xl h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-black text-brand-forest-700 uppercase">Nearest Major Airport *</Label>
                        <Input
                            value={contactInfo.nearestAirport}
                            onChange={(e) => setContactInfo({ ...contactInfo, nearestAirport: e.target.value })}
                            placeholder="e.g. John F. Kennedy International Airport"
                            required
                            className="rounded-xl h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-black text-brand-forest-700 uppercase">Preferred Delivery Option *</Label>
                        <select
                            value={contactInfo.deliveryOption}
                            onChange={(e) => setContactInfo({ ...contactInfo, deliveryOption: e.target.value })}
                            required
                            className="flex h-12 w-full rounded-xl border border-brand-forest-200 bg-white px-3 py-2 text-sm font-medium"
                        >
                            <option value="">Select delivery option...</option>
                            <option value="Airport Pickup">Airport Pickup</option>
                            <option value="Home Delivery">Home Delivery</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-black text-brand-forest-700 uppercase">Availability on Day of Arrival *</Label>
                        <Input
                            value={contactInfo.arrivalAvailability}
                            onChange={(e) => setContactInfo({ ...contactInfo, arrivalAvailability: e.target.value })}
                            placeholder="e.g. Available all day / Between 9am-5pm"
                            required
                            className="rounded-xl h-12"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-brand-orange-700 hover:bg-brand-orange-800 rounded-full font-black uppercase tracking-wider mt-6"
                    >
                        {loading ? "Submitting..." : "Submit Application"}
                    </Button>
                </form>
            </motion.div>
        );
    }

    if (!shouldShowQuestion()) {
        setStep(step + 1);
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <div className="flex justify-between text-xs font-bold text-brand-forest-600 uppercase tracking-wider mb-2">
                    <span>Question {step + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-brand-forest-100 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-brand-orange-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-brand-forest-100"
                >
                    <Label className="text-base font-medium text-brand-forest-700 leading-relaxed block mb-6">
                        {currentQuestion.question}
                    </Label>

                    {currentQuestion.type === "text" && (
                        <Input
                            value={formData[currentQuestion.id] || ""}
                            onChange={(e) => setFormData({ ...formData, [currentQuestion.id]: e.target.value })}
                            placeholder="Type your answer..."
                            className="rounded-xl h-12 border-brand-forest-200"
                        />
                    )}

                    {currentQuestion.type === "textarea" && (
                        <Textarea
                            value={formData[currentQuestion.id] || ""}
                            onChange={(e) => setFormData({ ...formData, [currentQuestion.id]: e.target.value })}
                            placeholder="Type your answer..."
                            className="rounded-xl min-h-[150px]"
                        />
                    )}

                    {currentQuestion.type === "select" && (
                        <select
                            value={formData[currentQuestion.id] || ""}
                            onChange={(e) => handleAnswer(e.target.value)}
                            className="w-full h-12 rounded-xl border border-brand-forest-200 px-4 font-medium"
                        >
                            <option value="">Select an option...</option>
                            {currentQuestion.options?.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    )}

                    {currentQuestion.type === "radio" && (
                        <div className="space-y-3">
                            {currentQuestion.options?.map((opt) => (
                                <label
                                    key={opt}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                        formData[currentQuestion.id] === opt
                                            ? "border-brand-orange-500 bg-brand-orange-50"
                                            : "border-brand-forest-100 hover:border-brand-forest-200"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={currentQuestion.id}
                                        value={opt}
                                        checked={formData[currentQuestion.id] === opt}
                                        onChange={() => handleAnswer(opt)}
                                        className="w-5 h-5 text-brand-orange-600"
                                    />
                                    <span className="font-medium text-brand-forest-800">{opt}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {currentQuestion.type === "scale" && (
                        <div className="space-y-4">
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={formData[currentQuestion.id] || 50}
                                onChange={(e) => setFormData({ ...formData, [currentQuestion.id]: parseInt(e.target.value) })}
                                className="w-full h-3 bg-brand-forest-100 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-sm font-bold text-brand-forest-600">
                                <span>1</span>
                                <span className="text-2xl text-brand-orange-600">{formData[currentQuestion.id] || 50}</span>
                                <span>100</span>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        {step > 0 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStep(step - 1)}
                                className="flex-1 h-12 rounded-full font-bold"
                            >
                                Back
                            </Button>
                        )}
                        <Button
                            onClick={() => handleAnswer(formData[currentQuestion.id] || "")}
                            disabled={currentQuestion.required && !formData[currentQuestion.id]}
                            className="flex-1 h-12 bg-brand-orange-700 hover:bg-brand-orange-800 rounded-full font-black uppercase"
                        >
                            {step === questions.length - 1 ? "Finish" : "Continue"}
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
