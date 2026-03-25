import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPuppy extends Document {
    name: string;
    breed: string;
    age: string;
    gender: "Male" | "Female";
    image: string;
    images: string[];
    status: "available" | "adopted" | "pending";
    featured: boolean;
    fee: string;
    nannyFee: string;
    description: string;
    story: string;
    slug: string;
    createdAt: Date;
}

const PuppySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        breed: { type: String, required: true },
        age: { type: String, required: true },
        gender: { type: String, enum: ["Male", "Female"], required: true },
        image: { type: String, required: true },
        images: { type: [String], default: [] },
        status: {
            type: String,
            enum: ["available", "adopted", "pending"],
            default: "available",
        },
        featured: { type: Boolean, default: false },
        fee: { type: String, required: true },
        nannyFee: { type: String, required: true },
        description: { type: String, required: true },
        story: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

// Prevent overwriting model if already compiled
const Puppy: Model<IPuppy> =
    mongoose.models.Puppy || mongoose.model<IPuppy>("Puppy", PuppySchema);

export default Puppy;
