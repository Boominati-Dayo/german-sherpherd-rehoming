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
        const app = await Application.findById(id);
        if (!app) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

        app.status = "approved";
        await app.save();

        await sendMail({
            to: app.email,
            subject: `Application Approved - ${app.puppyName || "Your German Shepherd"} | German Shepherd Rehoming Center`,
            text: `Dear ${app.applicantName},\n\nCongratulations! We have reviewed your application for ${app.puppyName || "a puppy"} and are thrilled to move forward. We believe you would provide a wonderful home.\n\nPlease reply to this email to discuss the next steps, including adoption fees and pickup/shipping arrangements.\n\nWarm regards,\nGerman Shepherd Rehoming Center`,
            html: getEmailTemplate("application_approved", {
                name: app.applicantName,
                puppyName: app.puppyName,
                message: "Please reply to this email to discuss the next steps, including adoption fees and pickup/shipping arrangements. We're so excited for you to meet your new family member!"
            })
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Approval error:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to approve" }, { status: 500 });
    }
}
