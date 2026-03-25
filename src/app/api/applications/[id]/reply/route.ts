import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
    await dbConnect();
    const { id } = await params;
    try {
        const { message } = await request.json();
        const app = await Application.findById(id);
        if (!app) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

        // Send Email using centralized utility
        await sendMail({
            to: app.email,
            subject: "Update regarding your application - Rebecca Herman Fostering",
            text: `Dear ${app.applicantName},\n\n${message}\n\nWarm regards,\nRebecca Herman`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #0d9488;">Update Regarding Your Application</h2>
                    <p>Dear ${app.applicantName},</p>
                    <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p>Warm regards,</p>
                    <p><strong>Rebecca Herman</strong><br>Rebecca Herman Fostering</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Reply error:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to send reply" }, { status: 500 });
    }
}
