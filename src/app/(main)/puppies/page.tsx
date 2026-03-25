import dbConnect from "@/lib/db";
import { Metadata } from "next";
import Puppy from "@/models/Puppy";
import { PuppiesContainer } from "@/components/PuppiesContainer";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Available Cavalier King Charles Spaniel Puppies for Adoption",
    description: "Browse available Cavalier King Charles Spaniel puppies for adoption. Meet our loving, healthy Cavalier puppies looking for their forever families. Apply today!",
});

export const revalidate = 0;

export default async function PuppiesPage() {
    await dbConnect();
    const puppiesDocs = await Puppy.find({ status: "available" }).sort({ createdAt: -1 }).lean();

    const puppies = JSON.parse(JSON.stringify(puppiesDocs)).map((p: any) => ({
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

    return <PuppiesContainer initialPuppies={puppies} />;
}
