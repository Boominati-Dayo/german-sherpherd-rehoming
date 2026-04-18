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
            "veterinarian", "vetDetails", "pickupOrShipping", "agreement",
            "nearestAirport", "deliveryOption", "arrivalAvailability"
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
            nearestAirport: body.nearestAirport || "",
            deliveryOption: body.deliveryOption || "",
            arrivalAvailability: body.arrivalAvailability || "",
            answers,
            status: "new"
        };

        const application = await Application.create(applicationData);

        // Send confirmation email to applicant
        try {
            await sendMail({
                to: application.email,
                subject: `Application Submitted - ${application.puppyName} | German Shepherd Rehoming Center`,
                text: `Thank you for your application! Our team will review it within 24-48 hours.`,
                html: getEmailTemplate("application_submitted", {
                    name: application.applicantName,
                    puppyName: application.puppyName
                })
            });
        } catch (emailError) {
            console.error("Failed to send applicant confirmation email:", emailError);
        }

        // Send notification to admin
        const adminEmail = process.env.ADMIN_EMAIL || "admin@gsrcenter.com";
        
        const labels: Record<string, string> = {
            homeLifestyle: "Home & Lifestyle",
            canineExperience: "Canine Experience",
            currentPets: "Current Pets",
            currentPetsDetails: "Current Pets Details",
            hoursAlone: "Hours Alone Per Day",
            careArrangement: "Care Arrangement",
            livingEnvironment: "Living Environment",
            livingEnvironmentOther: "Living Environment (Other)",
            outdoorSpace: "Outdoor Space",
            outdoorSpaceDetails: "Outdoor Space Details",
            readinessScore: "Readiness Score (1-100)",
            readinessExplanation: "Readiness Explanation",
            veterinarian: "Has Veterinarian",
            vetDetails: "Veterinarian Details",
            pickupOrShipping: "Pickup or Shipping",
            agreement: "Agreement",
            nearestAirport: "Nearest Major Airport",
            deliveryOption: "Preferred Delivery Option",
            arrivalAvailability: "Day of Arrival Availability"
        };
        
        let answersHtml = "";
        Object.entries(answers).forEach(([key, value]) => {
            if (value) {
                const label = labels[key] || key;
                answersHtml += `<p style="margin: 10px 0; padding: 10px; background: #f9fafb; border-radius: 6px;"><strong>${label}:</strong> ${value}</p>`;
            }
        });

        try {
            await sendMail({
                to: adminEmail,
                subject: `New Adoption Application - ${application.applicantName} for ${application.puppyName}`,
                text: `New application received from ${application.applicantName}. Check admin dashboard for details.`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                        <h2 style="color: #b87333;">New Adoption Application</h2>
                        <div style="background: #fef6eb; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #b87333;">
                            <h3 style="margin-top: 0;">Applicant Details</h3>
                            <p><strong>Name:</strong> ${application.applicantName}</p>
                            <p><strong>Email:</strong> ${application.email}</p>
                            <p><strong>Phone:</strong> ${application.phone}</p>
                            <p><strong>Address:</strong> ${application.location}</p>
                            <p><strong>Nearest Airport:</strong> ${application.nearestAirport || "N/A"}</p>
                            <p><strong>Delivery Option:</strong> ${application.deliveryOption || "N/A"}</p>
                            <p><strong>Day of Arrival Availability:</strong> ${application.arrivalAvailability || "N/A"}</p>
                            <p><strong>Puppy:</strong> ${application.puppyName}</p>
                        </div>
                        <h3>Application Answers</h3>
                        ${answersHtml}
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
                        <a href="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/admin/applications" style="background: #b87333; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">View in Admin Dashboard</a>
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
