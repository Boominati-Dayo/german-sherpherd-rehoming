import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Puppy from "@/models/Puppy";

export async function GET() {
    await dbConnect();

    const initialPuppies = [
        {
            name: "Bruno",
            breed: "German Shepherd",
            age: "3 months",
            gender: "Male",
            image: "https://placehold.co/800x600/f8f9fa/333?text=Bruno",
            status: "available",
            fee: "AUD 2,500",
            description: "Bruno is a stunning German Shepherd puppy with an intelligent and loyal temperament. He is very playful, great with children and loves to learn new commands. He is up to date with shots and vaccines and comes with full vet records.",
            story: "These pups don’t come from breeders or rescue. We are an intermediary helping families interested in adopting or rehoming. The reason this puppy needs rehoming is because the owners have been battling unexpected circumstances, so rather than sending to a shelter they prefer to find a loving home directly."
        },
        {
            name: "Luna",
            breed: "German Shepherd",
            age: "4 months",
            gender: "Female",
            image: "https://placehold.co/800x600/f8f9fa/333?text=Luna",
            status: "available",
            fee: "AUD 2,800",
            description: "Luna is an affectionate and confident German Shepherd with a beautiful coat. She is gentle with kids and loves outdoor activities.",
            story: "Rehoming due to owner relocation."
        },
        {
            name: "Max",
            breed: "German Shepherd",
            age: "5 months",
            gender: "Male",
            image: "https://placehold.co/800x600/f8f9fa/333?text=Max",
            status: "available",
            fee: "AUD 2,200",
            description: "Max is energetic and loves to play fetch. He is quick to learn and eager to please his new family.",
            story: "Looking for a loving home."
        }
    ];

    try {
        await Puppy.deleteMany({});
        await Puppy.insertMany(initialPuppies);
        return NextResponse.json({ success: true, message: "Database seeded successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}