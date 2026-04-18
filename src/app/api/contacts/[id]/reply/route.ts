import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";
import { sendMail, getEmailTemplate } from "@/lib/mail";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    const { id } = await params;
    try {
        const { message } = await request.json();
        const contact = await Contact.findById(id);

        if (!contact) {
            return NextResponse.json({ error: "Contact not found" }, { status: 404 });
        }

        await sendMail({
            to: contact.email,
            subject: `Re: ${contact.subject || "Your inquiry"} - German Shepherd Rehoming Center`,
            text: message,
            html: getEmailTemplate("admin_reply", {
                name: contact.name,
                message: message
            })
        });

        contact.status = "replied";
        await contact.save();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Reply error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
