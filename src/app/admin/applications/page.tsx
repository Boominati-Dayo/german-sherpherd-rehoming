"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ApplicationDetail } from "@/components/admin/ApplicationDetail";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [currentApplication, setCurrentApplication] = useState<any>(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        const res = await fetch("/api/applications");
        if (res.ok) setApplications(await res.json());
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-brand-black-900 uppercase">Applications</h1>
            </div>

            {currentApplication ? (
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
                                    <h4 className="font-black text-brand-black-900 truncate">{app.applicantName}</h4>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase shrink-0 ${
                                        app.status === 'approved' ? 'bg-green-100 text-green-700' :
                                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {app.status}
                                    </span>
                                </div>
                                <p className="text-brand-black-600 text-sm truncate">{app.email}</p>
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
            )}
        </div>
    );
}
