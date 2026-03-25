"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PuppyForm } from "@/components/admin/PuppyForm";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { ApplicationDetail } from "@/components/admin/ApplicationDetail";
import { Plus, Edit, Trash } from "lucide-react";
import { ContactList } from "@/components/admin/ContactList";

type Tab = "puppies" | "applications" | "testimonials" | "contacts";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>("puppies");
    const [puppies, setPuppies] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [contacts, setContacts] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPuppy, setCurrentPuppy] = useState<any>(null);
    const [currentTestimonial, setCurrentTestimonial] = useState<any>(null);
    const [currentApplication, setCurrentApplication] = useState<any>(null);

    useEffect(() => {
        fetchPuppies();
        fetchApplications();
        fetchTestimonials();
        fetchContacts();
    }, []);

    const fetchPuppies = async () => {
        const res = await fetch("/api/puppies");
        if (res.ok) setPuppies(await res.json());
    };

    const fetchApplications = async () => {
        const res = await fetch("/api/applications");
        if (res.ok) setApplications(await res.json());
    };

    const fetchTestimonials = async () => {
        const res = await fetch("/api/testimonials");
        if (res.ok) setTestimonials(await res.json());
    };

    const fetchContacts = async () => {
        const res = await fetch("/api/contacts");
        if (res.ok) setContacts(await res.json());
    };

    const handleDeletePuppy = async (id: string) => {
        if (confirm("Are you sure you want to delete this puppy?")) {
            await fetch(`/api/puppies/${id}`, { method: "DELETE" });
            fetchPuppies();
        }
    };

    const handleDeleteTestimonial = async (id: string) => {
        if (confirm("Are you sure you want to delete this testimonial?")) {
            await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            fetchTestimonials();
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-black text-brand-forest-900 uppercase">
                    {activeTab === "puppies" && "Manage Puppies"}
                    {activeTab === "applications" && "Applications"}
                    {activeTab === "testimonials" && "Testimonials"}
                    {activeTab === "contacts" && "Contact Messages"}
                </h1>
                <div className="flex gap-2">
                    {activeTab === "puppies" && !isEditing && (
                        <Button onClick={() => { setCurrentPuppy(null); setIsEditing(true); }} className="bg-brand-orange-700 hover:bg-brand-orange-800 rounded-full font-black uppercase text-sm">
                            <Plus className="w-4 h-4 mr-2" /> Add Puppy
                        </Button>
                    )}
                    {activeTab === "testimonials" && !isEditing && (
                        <Button onClick={() => { setCurrentTestimonial(null); setIsEditing(true); }} className="bg-brand-orange-700 hover:bg-brand-orange-800 rounded-full font-black uppercase text-sm">
                            <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                        </Button>
                    )}
                </div>
            </div>

            {/* Puppies Tab - List Card View on Mobile */}
            {activeTab === "puppies" && (
                isEditing ? (
                    <div className="bg-white p-6 rounded-3xl shadow-lg">
                        <h3 className="text-xl font-black text-brand-forest-900 mb-6 uppercase">{currentPuppy ? "Edit Puppy" : "Add New Puppy"}</h3>
                        <PuppyForm
                            initialData={currentPuppy}
                            onSuccess={() => { setIsEditing(false); fetchPuppies(); }}
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                        {/* Desktop Table - Hidden on mobile */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-brand-forest-50">
                                    <tr>
                                        <th className="p-4 font-black text-brand-forest-700 uppercase text-xs">Name</th>
                                        <th className="p-4 font-black text-brand-forest-700 uppercase text-xs">Breed</th>
                                        <th className="p-4 font-black text-brand-forest-700 uppercase text-xs">Age</th>
                                        <th className="p-4 font-black text-brand-forest-700 uppercase text-xs">Status</th>
                                        <th className="p-4 font-black text-brand-forest-700 uppercase text-xs text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {puppies.map((puppy) => (
                                        <tr key={puppy._id} className="hover:bg-gray-50">
                                            <td className="p-4 font-bold text-brand-forest-900">{puppy.name}</td>
                                            <td className="p-4 text-brand-forest-600">{puppy.breed}</td>
                                            <td className="p-4 text-brand-forest-600">{puppy.age}</td>
                                            <td className="p-4">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                    puppy.status === 'available' ? 'bg-green-100 text-green-700' :
                                                    puppy.status === 'adopted' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {puppy.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => { setCurrentPuppy(puppy); setIsEditing(true); }} className="rounded-full">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDeletePuppy(puppy._id)} className="rounded-full">
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {puppies.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-gray-500">No puppies found. Add one to get started.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Mobile List Card View */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {puppies.map((puppy) => (
                                <div key={puppy._id} className="p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-bold text-brand-forest-900">{puppy.name}</p>
                                            <p className="text-sm text-brand-forest-600">{puppy.breed} • {puppy.age}</p>
                                        </div>
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold uppercase shrink-0 ${
                                            puppy.status === 'available' ? 'bg-green-100 text-green-700' :
                                            puppy.status === 'adopted' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {puppy.status}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <Button size="sm" variant="outline" onClick={() => { setCurrentPuppy(puppy); setIsEditing(true); }} className="rounded-full flex-1">
                                            <Edit className="w-4 h-4 mr-1" /> Edit
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDeletePuppy(puppy._id)} className="rounded-full">
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {puppies.length === 0 && (
                                <div className="p-8 text-center text-gray-500">No puppies found. Add one to get started.</div>
                            )}
                        </div>
                    </div>
                )
            )}

            {/* Testimonials Tab */}
            {activeTab === "testimonials" && (
                isEditing ? (
                    <div className="bg-white p-6 rounded-3xl shadow-lg max-w-2xl">
                        <h3 className="text-xl font-black text-brand-forest-900 mb-6 uppercase">{currentTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</h3>
                        <TestimonialForm
                            initialData={currentTestimonial}
                            onSuccess={() => { setIsEditing(false); fetchTestimonials(); }}
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                ) : (
                    <div className="space-y-3 max-w-full overflow-hidden">
                        {testimonials.map((t) => (
                            <div key={t._id} className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-stretch sm:items-start gap-3 sm:gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h4 className="font-black text-brand-forest-900 truncate">{t.name}</h4>
                                        <span className="text-gray-400 text-sm">({t.location})</span>
                                        <span className="text-yellow-500 shrink-0">{"★".repeat(t.rating)}</span>
                                    </div>
                                    <p className="text-brand-forest-600 italic line-clamp-2 sm:line-clamp-none">"{t.text}"</p>
                                    {t.image && <img src={t.image} alt={t.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mt-2 sm:mt-3" />}
                                </div>
                                <div className="flex space-x-2 justify-end sm:justify-start">
                                    <Button size="sm" variant="outline" onClick={() => { setCurrentTestimonial(t); setIsEditing(true); }} className="rounded-full">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleDeleteTestimonial(t._id)} className="rounded-full">
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {testimonials.length === 0 && (
                            <div className="bg-white p-8 rounded-3xl shadow-lg text-center text-gray-500">No testimonials yet.</div>
                        )}
                    </div>
                )
            )}

            {/* Applications Tab */}
            {activeTab === "applications" && (
                currentApplication ? (
                    <ApplicationDetail
                        application={currentApplication}
                        onBack={() => setCurrentApplication(null)}
                        onUpdate={fetchApplications}
                    />
                ) : (
                    <div className="space-y-3 max-w-full overflow-hidden">
                        {applications.map((app) => (
                            <div key={app._id} className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-stretch sm:items-start gap-3 sm:gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h4 className="font-black text-brand-forest-900 truncate">{app.applicantName}</h4>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase shrink-0 ${
                                            app.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </div>
                                    <p className="text-brand-forest-600 text-sm truncate">{app.email}</p>
                                    <p className="text-gray-400 text-xs mt-1">For: {app.puppyName || "General Inquiry"} • {new Date(app.createdAt).toLocaleDateString()}</p>
                                </div>
                                <Button variant="outline" onClick={() => setCurrentApplication(app)} className="rounded-full font-bold text-xs sm:text-sm shrink-0 w-full sm:w-auto">
                                    View
                                </Button>
                            </div>
                        ))}
                        {applications.length === 0 && (
                            <div className="bg-white p-8 rounded-3xl shadow-lg text-center text-gray-500">No applications yet.</div>
                        )}
                    </div>
                )
            )}

            {/* Contacts Tab */}
            {activeTab === "contacts" && (
                <ContactList contacts={contacts} onUpdate={fetchContacts} />
            )}
        </div>
    );
}
