import dbConnect from "@/lib/db";
import Puppy from "@/models/Puppy";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    try {
        const puppies = await Puppy.find({}).sort({ createdAt: -1 });
        return NextResponse.json(puppies);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch puppies" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();

        // Generate slug if not provided
        if (!body.slug) {
            const namePart = body.name ? body.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") : "puppy";
            body.slug = namePart + "-" + Math.random().toString(36).substring(2, 7);
        }

        const puppy = await Puppy.create(body);
        return NextResponse.json(puppy, { status: 201 });
    } catch (error: any) {
        console.error("Failed to create puppy:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to create puppy" }, { status: 400 });
    }
}
