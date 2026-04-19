import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
import { sendMail, getEmailTemplate } from "@/lib/mail";

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

        await sendMail({
            to: app.email,
            subject: `Update on Your Application - ${app.puppyName || "German Shepherd"} | German Shepherd Rehoming Center`,
            text: `Dear ${app.applicantName},\n\n${message}\n\nWarm regards,\nGerman Shepherd Rehoming Center`,
            html: getEmailTemplate("admin_reply", {
                name: app.applicantName,
                puppyName: app.puppyName,
                message: message
            })
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Reply error:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to send reply" }, { status: 500 });
    }
}
