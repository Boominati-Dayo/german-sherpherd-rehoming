"use client";

import { useState, useEffect } from "react";
import { ContactList } from "@/components/admin/ContactList";

export default function ContactsPage() {
    const [contacts, setContacts] = useState<any[]>([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const res = await fetch("/api/contacts");
        if (res.ok) setContacts(await res.json());
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-brand-forest-900 uppercase">Contact Messages</h1>
            </div>

            <ContactList contacts={contacts} onUpdate={fetchContacts} />
        </div>
    );
}
