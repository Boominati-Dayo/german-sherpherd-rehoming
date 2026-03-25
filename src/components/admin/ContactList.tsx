"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { Mail, MessageCircle, Clock, CheckCircle, Trash } from "lucide-react";

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: "new" | "replied" | "archived";
    createdAt: string;
}

export function ContactList({ contacts, onUpdate }: { contacts: Contact[], onUpdate: () => void }) {
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReply = async (id: string) => {
        if (!replyMessage.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/contacts/${id}/reply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: replyMessage }),
            });
            if (res.ok) {
                toast.success("Reply sent successfully!");
                setReplyingTo(null);
                setReplyMessage("");
                onUpdate();
            } else {
                toast.error("Failed to send reply");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {contacts.map((contact) => (
                <div key={contact._id} className="bg-white rounded-2xl shadow-sm border border-brand-white-400 overflow-hidden transition-all hover:shadow-md">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-black text-brand-forest-700 uppercase tracking-tight">{contact.name}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${contact.status === 'new' ? 'bg-brand-orange-100 text-brand-orange-700' :
                                            contact.status === 'replied' ? 'bg-brand-forest-100 text-brand-forest-700' :
                                                'bg-brand-white-300 text-brand-white-900'
                                        }`}>
                                        {contact.status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-brand-white-900 font-bold uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {contact.email}</span>
                                    {contact.phone && <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {contact.phone}</span>}
                                    <span className="flex items-center gap-1.5 text-brand-white-700"><CheckCircle className="w-3 h-3" /> {new Date(contact.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="rounded-full h-10 px-6 font-bold uppercase tracking-widest text-xs border-brand-forest-700 text-brand-forest-700 hover:bg-brand-forest-50"
                                    onClick={() => setReplyingTo(replyingTo === contact._id ? null : contact._id)}
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    {replyingTo === contact._id ? "Cancel" : "Reply"}
                                </Button>
                            </div>
                        </div>

                        <div className="bg-brand-white-300 p-5 rounded-2xl">
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-white-900 mb-2">Subject: {contact.subject || "N/A"}</p>
                            <p className="text-brand-forest-900 font-medium whitespace-pre-line leading-relaxed italic">
                                "{contact.message}"
                            </p>
                        </div>

                        {replyingTo === contact._id && (
                            <div className="mt-6 pt-6 border-t border-brand-white-400 space-y-4 animate-in fade-in slide-in-from-top-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageCircle className="w-5 h-5 text-brand-forest-700" />
                                    <h4 className="text-sm font-black text-brand-forest-700 uppercase tracking-tight">Write your reply</h4>
                                </div>
                                <Textarea
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    placeholder="Type your message to Rebecca's potential collector..."
                                    className="rounded-2xl border-brand-white-400 min-h-[150px] p-5 bg-white shadow-inner focus:ring-brand-forest-300"
                                />
                                <div className="flex justify-end gap-3">
                                    <Button
                                        onClick={() => handleReply(contact._id)}
                                        disabled={loading || !replyMessage.trim()}
                                        className="rounded-full px-10 h-12 text-sm font-black bg-brand-forest-700 text-white hover:bg-brand-forest-800 shadow-xl uppercase tracking-widest"
                                    >
                                        {loading ? "Sending..." : "Send Reply"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {contacts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-brand-white-400 shadow-inner">
                    <Mail className="w-12 h-12 text-brand-white-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-brand-forest-700">No messages yet</h3>
                    <p className="text-brand-white-900 mt-2">When people contact Rebecca, their messages will appear here.</p>
                </div>
            )}
        </div>
    );
}
