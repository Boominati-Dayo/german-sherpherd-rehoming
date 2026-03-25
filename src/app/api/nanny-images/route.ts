import dbConnect from "@/lib/db";
import NannyImage from "@/models/NannyImage";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    try {
        const images = await NannyImage.find({}).sort({ createdAt: -1 });
        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch images" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { image, featured } = body;
        
        const nannyImage = await NannyImage.create({
            image,
            featured: featured || false,
        });

        return NextResponse.json(nannyImage, { status: 201 });
    } catch (error: any) {
        console.error("Error creating nanny image:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to create image" }, { status: 400 });
    }
}
