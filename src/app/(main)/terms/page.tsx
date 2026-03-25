"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="bg-brand-white-200 min-h-screen py-24">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-2xl md:text-5xl font-extrabold text-brand-forest-700 mb-8 flex items-center gap-4">
                        <span className="w-1.5 h-10 bg-brand-orange-700 rounded-full" />
                        Terms & Conditions
                    </h1>

                    <div className="bg-brand-white-100 p-8 md:p-12 rounded-[2.5rem] border border-brand-white-400 shadow-xl space-y-12">
                        <section>
                            <p className="text-brand-white-900 font-bold mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
                            <p className="text-brand-forest-900 leading-relaxed text-lg">
                                By using Rebecca Herman Fostering website and services, you agree to the following terms and conditions. Our mission is to ensure every puppy finds a safe, loving, and permanent home.
                            </p>
                        </section>

                        <div className="space-y-10">
                            {[
                                {
                                    id: "1",
                                    title: "Adoption Eligibility",
                                    content: "Submitting an application does not guarantee adoption. Rebecca Herman reserves the right to deny any application if we believe it is not in the best interest of the puppy's welfare. Adoption is at our sole discretion."
                                },
                                {
                                    id: "2",
                                    title: "Placement Fees",
                                    content: "Adoption fees are used to cover veterinary costs, health checks, vaccinations, and the coordination of rehoming services. These fees are final and non-refundable once the adoption is finalized."
                                },
                                {
                                    id: "3",
                                    title: "Health Guarantee",
                                    content: "Every puppy is health-checked by a vet before rehoming. We provide full disclosure of known health histories. Owners are expected to take the puppy to their own vet within 72 hours of arrival."
                                },
                                {
                                    id: "4",
                                    title: "Rehoming Commitment",
                                    content: "If for any reason you can no longer care for a puppy adopted through us, you agree to contact us first. Our priority is ensuring these dogs never end up in a shelter."
                                },
                                {
                                    id: "5",
                                    title: "Transportation",
                                    content: "Transportation costs (Pet Nanny) are separate from adoption fees and must be settled before the journey begins. We are not responsible for delays caused by weather or airline issues."
                                }
                            ].map((section) => (
                                <div key={section.id} className="relative pl-8">
                                    <span className="absolute left-0 top-0 text-brand-orange-700/20 text-5xl font-extrabold -ml-4 -mt-2 select-none">
                                        {section.id}
                                    </span>
                                    <h2 className="text-xl font-extrabold text-brand-forest-700 mb-4 sm:text-2xl">{section.title}</h2>
                                    <p className="text-brand-white-900 leading-relaxed font-medium">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
