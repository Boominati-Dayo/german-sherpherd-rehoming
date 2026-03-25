import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";
import { sendMail, getEmailTemplate } from "@/lib/mail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { name, email, message, phone, subject } = await request.json();

        const contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message,
        });

        const adminEmail = process.env.ADMIN_EMAIL || "vanslili265@gmail.com";

        await sendMail({
            to: adminEmail,
            subject: `New Contact Form Message: ${subject || "General Inquiry"}`,
            replyTo: email,
            text: `
                New Contact Form Submission:
                
                Name: ${name}
                Email: ${email}
                Phone: ${phone || "N/A"}
                Subject: ${subject || "N/A"}
                
                Message:
                ${message}
            `,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #c45210;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || "N/A"}</p>
                    <p><strong>Subject:</strong> ${subject || "N/A"}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
                </div>
            `,
        });

        await sendMail({
            to: email,
            subject: `Thank You for Reaching Out | Rebecca Herman Fostering`,
            text: `Hi ${name},\n\nThank you for contacting Rebecca Herman's Fostering! Rebecca will get back to you within 24 hours.\n\nBest regards,\nRebecca Herman`,
            html: getEmailTemplate("contact_submitted", {
                name,
                message
            })
        });

        return NextResponse.json({ success: true, contact });
    } catch (error: any) {
        console.error("Email/Contact error:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to process request" }, { status: 500 });
    }
}
