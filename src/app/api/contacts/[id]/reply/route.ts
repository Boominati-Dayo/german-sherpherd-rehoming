import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";
import { sendMail } from "@/lib/mail";

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
            subject: `Re: ${contact.subject || "Your inquiry"} - Rebecca Herman Fostering`,
            text: message,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #0d9488;">Reply to your inquiry</h2>
                    <p>Hi ${contact.name},</p>
                    <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">${message}</div>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 0.8em; color: #666;">Rebecca Herman Fostering<br>vanslili265@gmail.com</p>
                </div>
            `,
        });

        contact.status = "replied";
        await contact.save();

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Reply error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
