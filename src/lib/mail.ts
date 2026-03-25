import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

interface MailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
    replyTo?: string;
}

export async function sendMail({ to, subject, text, html, replyTo }: MailOptions) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        throw new Error("SMTP credentials not configured");
    }

    try {
        const info = await transporter.sendMail({
            from: `"Rebecca Herman" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
            replyTo: replyTo || process.env.SMTP_USER,
        });
        console.log("Email sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

export function getEmailTemplate(type: "application_submitted" | "application_approved" | "application_rejected" | "contact_submitted" | "admin_reply", data: {
    name?: string;
    puppyName?: string;
    message?: string;
    subject?: string;
}) {
    const brandColor = "#c45210";
    const brandColorLight = "#fde4d0";
    const logoText = "Rebecca Herman's Fostering";
    const logoSubtext = "by Rebecca Herman";
    const logoUrl = "https://rebecca-herman-fostering.vercel.app/assets/RebeccaHermanFosteringLogo.png";

    let headerContent = "";
    let mainContent = "";
    let footerContent = "";

    switch (type) {
        case "application_submitted":
            headerContent = `
                <div style="background: linear-gradient(135deg, ${brandColor} 0%, #a8460d 100%); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="${logoText}" style="height: 60px; margin-bottom: 15px;" />
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">Application Received</h1>
                    <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">${logoText}</p>
                </div>
            `;
            break;

        case "application_approved":
            headerContent = `
                <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="${logoText}" style="height: 60px; margin-bottom: 15px;" />
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">Application Approved! 🎉</h1>
                    <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">${logoText}</p>
                </div>
            `;
            break;

        case "application_rejected":
            headerContent = `
                <div style="background: linear-gradient(135deg, #666 0%, #444 100%); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="${logoText}" style="height: 60px; margin-bottom: 15px;" />
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">Application Update</h1>
                    <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">${logoText}</p>
                </div>
            `;
            break;

        case "contact_submitted":
            headerContent = `
                <div style="background: linear-gradient(135deg, ${brandColor} 0%, #a8460d 100%); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="${logoText}" style="height: 60px; margin-bottom: 15px;" />
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">Message Received</h1>
                    <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">${logoText}</p>
                </div>
            `;
            break;

        case "admin_reply":
            headerContent = `
                <div style="background: linear-gradient(135deg, ${brandColor} 0%, #a8460d 100%); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="${logoText}" style="height: 60px; margin-bottom: 15px;" />
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">New Message</h1>
                    <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">${logoText}</p>
                </div>
            `;
            break;
    }

    footerContent = `
        <div style="background: #f5f5f5; padding: 30px; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: #999;">
                © ${new Date().getFullYear()} ${logoText}. All rights reserved.<br/>
                <span style="color: ${brandColor};">Made with love for Cavaliers</span>
            </p>
        </div>
    `;

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f5; padding: 20px;">
                <tr>
                    <td align="center" style="padding: 20px 0;">
                        <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                            <tr>
                                ${headerContent}
                            </tr>
                            <tr>
                                <td style="padding: 40px;">
                                    ${mainContent}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    ${footerContent}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

    return html;
}
