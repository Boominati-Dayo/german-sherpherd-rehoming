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
    const logoUrl = "https://rebecca-herman-fostering.vercel.app/RebeccaHermanFosteringLogo.png";

    let headerContent = "";
    let mainContent = "";

    switch (type) {
        case "application_submitted":
            headerContent = `
                <div style="background: linear-gradient(135deg, ${brandColor} 0%, #a8460d 100%); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="${logoText}" width="200" height="60" style="height: 60px; width: auto; margin-bottom: 15px;" />
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">Application Received</h1>
                    <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">${logoText}</p>
                </div>
            `;
            mainContent = `
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi${data.name ? ` ${data.name}` : ""},</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Thank you for your interest in <strong>${data.puppyName || "a Cavalier"}</strong>!</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Your application has been successfully submitted. Rebecca will personally review your application and get back to you within <strong>24-48 hours</strong>.</p>
                <div style="background: ${brandColorLight}; padding: 20px; border-radius: 12px; margin: 30px 0;">
                    <p style="margin: 0; font-size: 14px; color: #666;">While you wait, feel free to:</p>
                    <ul style="margin: 10px 0 0 0; padding-left: 20px; font-size: 14px; color: #666;">
                        <li>Prepare your home for your new furry family member</li>
                        <li>Research Cavalier King Charles Spaniel care</li>
                        <li>Gather any additional documents that may be needed</li>
                    </ul>
                </div>
            `;
            break;

        case "application_approved":
            headerContent = `
                <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="${logoText}" width="200" height="60" style="height: 60px; width: auto; margin-bottom: 15px;" />
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">Application Approved! 🎉</h1>
                    <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">${logoText}</p>
                </div>
            `;
            mainContent = `
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi${data.name ? ` ${data.name}` : ""},</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Great news! Your application to adopt <strong>${data.puppyName || "a Cavalier"}</strong> has been <strong style="color: #22c55e;">APPROVED</strong>!</p>
                ${data.message ? `<div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22c55e;"><p style="margin: 0; font-size: 15px; color: #333;">${data.message}</p></div>` : ""}
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Please reply to this email to discuss the next steps, including adoption fees and pickup/shipping arrangements.</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 0;">We look forward to welcoming your new furry family member!</p>
            `;
            break;

        case "application_rejected":
            headerContent = `
                <div style="background: linear-gradient(135deg, #666 0%, #444 100%); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="${logoText}" width="200" height="60" style="height: 60px; width: auto; margin-bottom: 15px;" />
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">Application Update</h1>
                    <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">${logoText}</p>
                </div>
            `;
            mainContent = `
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi${data.name ? ` ${data.name}` : ""},</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Thank you for your interest in adopting from ${logoText}.</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">After careful consideration, we're unable to move forward with your application at this time.</p>
                ${data.message ? `<div style="background: #fafafa; padding: 20px; border-radius: 12px; margin: 20px 0;"><p style="margin: 0; font-size: 15px; color: #666;">${data.message}</p></div>` : ""}
                <p style="font-size: 16px; color: #333; margin-bottom: 0;">We wish you the best in your search for the perfect companion.</p>
            `;
            break;

        case "contact_submitted":
            headerContent = `
                <div style="background: linear-gradient(135deg, ${brandColor} 0%, #a8460d 100%); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="${logoText}" width="200" height="60" style="height: 60px; width: auto; margin-bottom: 15px;" />
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">Message Received</h1>
                    <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">${logoText}</p>
                </div>
            `;
            mainContent = `
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi${data.name ? ` ${data.name}` : ""},</p>
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Thank you for reaching out! Rebecca will get back to you within <strong>24 hours</strong>.</p>
                <div style="background: ${brandColorLight}; padding: 20px; border-radius: 12px; margin: 30px 0;">
                    <p style="margin: 0; font-size: 14px; color: #666; font-style: italic;">"${data.message?.substring(0, 150) || "Thank you for your message..."}"</p>
                </div>
            `;
            break;

        case "admin_reply":
            headerContent = `
                <div style="background: linear-gradient(135deg, ${brandColor} 0%, #a8460d 100%); padding: 30px 40px; text-align: center;">
                    <img src="${logoUrl}" alt="${logoText}" width="200" height="60" style="height: 60px; width: auto; margin-bottom: 15px;" />
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">New Message</h1>
                    <p style="color: white; opacity: 0.9; margin: 10px 0 0 0;">${logoText}</p>
                </div>
            `;
            mainContent = `
                <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi${data.name ? ` ${data.name}` : ""},</p>
                ${data.puppyName ? `<div style="background: ${brandColorLight}; padding: 12px 20px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 13px; color: ${brandColor}; font-weight: 600;">Regarding: ${data.puppyName}</p>
                </div>` : ""}
                <div style="background: #f8f8f8; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 4px solid ${brandColor};">
                    <p style="margin: 0; font-size: 15px; color: #333; line-height: 1.6;">${data.message}</p>
                </div>
                <p style="font-size: 14px; color: #999; margin-bottom: 0;">Best regards,<br/>Rebecca Herman<br/>${logoText}</p>
            `;
            break;
    }

    const footerContent = `
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
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #ffffff;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff;">
                <tr>
                    <td align="center">
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
