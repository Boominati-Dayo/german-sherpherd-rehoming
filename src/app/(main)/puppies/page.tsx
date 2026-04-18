import dbConnect from "@/lib/db";
import { Metadata } from "next";
import Puppy from "@/models/Puppy";
import { PuppiesContainer } from "@/components/PuppiesContainer";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Available German Shepherd Puppies for Adoption",
    description: "Browse available German Shepherd puppies for adoption. Meet our loving, healthy German Shepherd puppies looking for their forever families. Apply today!",
});

export const revalidate = 0;

export default async function PuppiesPage() {
    await dbConnect();
    const availableDocs = await Puppy.find({ status: "available" }).sort({ createdAt: -1 }).lean();
    const adoptedDocs = await Puppy.find({ status: "adopted" }).sort({ createdAt: -1 }).lean();

    const availablePuppies = JSON.parse(JSON.stringify(availableDocs)).map((p: any) => ({
        id: p._id.toString(),
        name: p.name,
        breed: p.breed,
        gender: p.gender || "Unknown",
        age: p.age,
        image: p.image,
        status: p.status,
        fee: p.fee || "Contact us",
        description: p.description,
    }));

    const adoptedPuppies = JSON.parse(JSON.stringify(adoptedDocs)).map((p: any) => ({
        id: p._id.toString(),
        name: p.name,
        breed: p.breed,
        gender: p.gender || "Unknown",
        age: p.age,
        image: p.image,
        status: p.status,
        fee: p.fee || "Contact us",
        description: p.description,
    }));

    return <PuppiesContainer initialPuppies={availablePuppies} adoptedPuppies={adoptedPuppies} />;
}
