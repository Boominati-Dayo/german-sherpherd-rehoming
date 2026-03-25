import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import { NextResponse } from "next/server";
import { sendMail, getEmailTemplate } from "@/lib/mail";

export async function GET() {
    await dbConnect();
    try {
        const applications = await Application.find({}).sort({ createdAt: -1 });
        return NextResponse.json(applications);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const contentType = request.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            return NextResponse.json({ success: false, error: "Invalid content type" }, { status: 400 });
        }
        
        const body = await request.json();
        
        // Extract answers from body (new questionnaire format)
        const answers: Record<string, any> = {};
        const questionFields = [
            "homeLifestyle", "canineExperience", "currentPets", "currentPetsDetails",
            "hoursAlone", "careArrangement", "livingEnvironment", "livingEnvironmentOther",
            "outdoorSpace", "outdoorSpaceDetails", "readinessScore", "readinessExplanation",
            "veterinarian", "vetDetails", "agreement"
        ];
        
        questionFields.forEach(field => {
            if (body[field]) {
                answers[field] = body[field];
            }
        });

        const applicationData = {
            puppyName: body.puppyName || "General Inquiry",
            puppyId: body.puppyId,
            applicantName: body.applicantName,
            email: body.email,
            phone: body.phone,
            location: body.location,
            answers,
            status: "new"
        };

        const application = await Application.create(applicationData);

        // Send confirmation email to applicant
        try {
            await sendMail({
                to: application.email,
                subject: `Application Submitted - ${application.puppyName} | Rebecca Herman`,
                text: `Thank you for your application! Rebecca will review it within 24-48 hours.`,
                html: getEmailTemplate("application_submitted", {
                    name: application.applicantName,
                    puppyName: application.puppyName
                })
            });
        } catch (emailError) {
            console.error("Failed to send applicant confirmation email:", emailError);
        }

        // Send notification to admin
        const adminEmail = process.env.ADMIN_EMAIL || "vanslili265@gmail.com";
        let answersHtml = "";
        Object.entries(answers).forEach(([key, value]) => {
            if (value) {
                answersHtml += `<p style="margin: 10px 0; padding: 10px; background: #f9fafb; border-radius: 6px;"><strong>${key}:</strong> ${value}</p>`;
            }
        });

        try {
            await sendMail({
                to: adminEmail,
                subject: `New Adoption Application - ${application.applicantName} for ${application.puppyName}`,
                text: `New application received from ${application.applicantName}. Check admin dashboard for details.`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                        <h2 style="color: #c45210;">New Adoption Application</h2>
                        <div style="background: #fff7ed; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #c45210;">
                            <h3 style="margin-top: 0;">Applicant Details</h3>
                            <p><strong>Name:</strong> ${application.applicantName}</p>
                            <p><strong>Email:</strong> ${application.email}</p>
                            <p><strong>Phone:</strong> ${application.phone}</p>
                            <p><strong>Location:</strong> ${application.location}</p>
                            <p><strong>Puppy:</strong> ${application.puppyName}</p>
                        </div>
                        <h3>Application Answers</h3>
                        ${answersHtml}
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
                        <a href="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/admin/applications" style="background: #c45210; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">View in Admin Dashboard</a>
                    </div>
                `
            });
        } catch (emailError) {
            console.error("Failed to send admin notification email:", emailError);
        }

        return NextResponse.json(application, { status: 201 });
    } catch (error: any) {
        console.error("Application submission error:", error);
        return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 400 });
    }
}
