import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.error("Admin credentials not configured");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        if (email === adminEmail && password === adminPassword) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "An error occurred during login" }, { status: 500 });
    }
}
