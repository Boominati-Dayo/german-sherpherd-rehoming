"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

interface ApplicationDetailProps {
    application: any;
    onBack: () => void;
    onUpdate: () => void;
}

const questionLabels: Record<string, string> = {
    homeLifestyle: "Home & Lifestyle",
    canineExperience: "Canine Experience",
    currentPets: "Current Pets",
    currentPetsDetails: "Current Pets Details",
    hoursAlone: "Hours Alone Per Day",
    careArrangement: "Care Arrangement",
    livingEnvironment: "Living Environment",
    livingEnvironmentOther: "Living Environment (Other)",
    outdoorSpace: "Outdoor Space",
    outdoorSpaceDetails: "Outdoor Space Details",
    readinessScore: "Readiness Score (1-100)",
    readinessExplanation: "Readiness Explanation",
    veterinarian: "Has Veterinarian",
    vetDetails: "Veterinarian Details",
    agreement: "Agreement"
};

export function ApplicationDetail({ application, onBack, onUpdate }: ApplicationDetailProps) {
    const [replyMessage, setReplyMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleApprove = async () => {
        if (!confirm("Approve this application? This will send a congratulatory email.")) return;
        setSending(true);
        try {
            const res = await fetch(`/api/applications/${application._id}/approve`, { method: "POST" });
            if (res.ok) {
                toast.success("Application approved and email sent!");
                onUpdate();
                onBack();
            } else {
                toast.error("Failed to approve");
            }
        } catch (e) {
            toast.error("Error approving");
        } finally {
            setSending(false);
        }
    };

    const handleReject = async () => {
        if (!confirm("Reject this application? This will send a notification email.")) return;
        setSending(true);
        try {
            const res = await fetch(`/api/applications/${application._id}/reject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "" })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Application rejected");
                onUpdate();
                onBack();
            } else {
                toast.error(data.error || "Failed to reject");
            }
        } catch (e) {
            toast.error("Error rejecting");
        } finally {
            setSending(false);
        }
    };

    const handleReply = async () => {
        if (!replyMessage.trim()) return toast.error("Enter a message");
        setSending(true);
        try {
            const res = await fetch(`/api/applications/${application._id}/reply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: replyMessage,
                    puppyName: application.puppyName 
                }),
            });
            if (res.ok) {
                toast.success("Reply sent!");
                setReplyMessage("");
            } else {
                toast.error("Failed to send reply");
            }
        } catch (e) {
            toast.error("Error sending reply");
        } finally {
            setSending(false);
        }
    };

    const answers = application.answers || {};

    return (
        <div className="bg-white p-6 rounded-3xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-black text-brand-forest-900 uppercase">{application.applicantName}</h2>
                    <p className="text-brand-forest-600">{application.email}</p>
                    <p className="text-brand-forest-500 text-sm">{application.phone}</p>
                    <p className="text-brand-forest-500 text-sm">{application.location}</p>
                    {application.puppyName && (
                        <p className="text-brand-orange-700 font-bold mt-2">Cavalier: {application.puppyName}</p>
                    )}
                    <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        application.status === 'approved' ? 'bg-green-100 text-green-700' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        application.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                    }`}>
                        {application.status}
                    </span>
                </div>
                <Button variant="outline" onClick={onBack} className="rounded-full font-bold">
                    Back
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Answers Column */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-black text-brand-forest-900 uppercase text-lg">Application Answers</h3>
                    {Object.entries(answers).map(([key, value]: [string, any]) => {
                        if (!value) return null;
                        return (
                            <div key={key} className="bg-brand-forest-50 p-4 rounded-xl">
                                <span className="text-xs font-black text-brand-forest-700 uppercase tracking-wider block mb-2">
                                    {questionLabels[key] || key}
                                </span>
                                {key === "readinessScore" ? (
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-3 bg-brand-forest-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-brand-orange-600" 
                                                style={{ width: `${value}%` }}
                                            />
                                        </div>
                                        <span className="text-xl font-black text-brand-orange-700">{value}</span>
                                    </div>
                                ) : (
                                    <p className="text-brand-forest-800 font-medium italic">"{value}"</p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Actions Column */}
                <div className="space-y-4">
                    <h3 className="font-black text-brand-forest-900 uppercase text-lg">Actions</h3>
                    
                    <div className="space-y-3">
                        {application.status !== 'approved' && (
                            <Button
                                onClick={handleApprove}
                                disabled={sending}
                                className="w-full bg-green-600 hover:bg-green-700 rounded-full font-black uppercase"
                            >
                                Approve Application
                            </Button>
                        )}
                        {application.status !== 'rejected' && (
                            <Button
                                onClick={handleReject}
                                disabled={sending}
                                variant="outline"
                                className="w-full border-red-300 text-red-600 hover:bg-red-50 rounded-full font-bold"
                            >
                                Reject Application
                            </Button>
                        )}
                    </div>

                    <div className="border-t border-brand-forest-100 pt-4 mt-4">
                        <h4 className="font-bold text-brand-forest-900 mb-3">Send Reply</h4>
                        <Textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            placeholder="Type your message to the applicant..."
                            className="mb-3 rounded-xl"
                            rows={4}
                        />
                        <Button 
                            onClick={handleReply} 
                            disabled={sending || !replyMessage}
                            className="w-full bg-brand-orange-700 hover:bg-brand-orange-800 rounded-full font-black uppercase"
                        >
                            Send Reply
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
