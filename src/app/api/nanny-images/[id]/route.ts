import dbConnect from "@/lib/db";
import NannyImage from "@/models/NannyImage";
import { NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, { params }: RouteParams) {
    await dbConnect();
    const { id } = await params;
    try {
        await NannyImage.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    await dbConnect();
    const { id } = await params;
    try {
        const body = await request.json();
        const { featured } = body;
        
        const image = await NannyImage.findByIdAndUpdate(
            id,
            { featured },
            { new: true }
        );
        
        return NextResponse.json(image);
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
