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
        const body = await request.json();
        const { message } = body;
        
        const app = await Application.findById(id);
        if (!app) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

        app.status = "rejected";
        await app.save();

        await sendMail({
            to: app.email,
            subject: `Update on Your Application - ${app.puppyName || "German Shepherd"} | German Shepherd Rehoming Center`,
            text: `Dear ${app.applicantName},\n\nThank you for your interest in adopting from German Shepherd Rehoming Center. After careful consideration, we're unable to move forward with your application at this time.\n\nWe wish you the best in your search for the perfect companion.\n\nWarm regards,\nGerman Shepherd Rehoming Center`,
            html: getEmailTemplate("application_rejected", {
                name: app.applicantName,
                puppyName: app.puppyName,
                message: message || "We appreciate your interest in our German Shepherds and wish you the best in finding your perfect companion."
            })
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Rejection error:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to reject" }, { status: 500 });
    }
}
