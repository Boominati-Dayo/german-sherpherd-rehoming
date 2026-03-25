import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    return new Promise<NextResponse>((resolve) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "rebecca-herman-fostering/puppies",
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    resolve(NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 }));
                } else {
                    resolve(NextResponse.json({ success: true, url: result?.secure_url }));
                }
            }
        ).end(buffer);
    });
}
