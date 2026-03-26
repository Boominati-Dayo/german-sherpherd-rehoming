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
    whyRehoming: string;
    whatDogNeeds: string;
    currentWeight: string;
    expectedWeight: string;
    height: string;
    sizeCategory: string;
    personalityTraits: string[];
    goodWith: string[];
    specialNeeds: string;
    location: string;
    slug: string;
    createdAt: Date;
}

const PuppySchema: Schema = new Schema(
    {
        name: { type: String, default: "" },
        breed: { type: String, default: "" },
        age: { type: String, default: "" },
        gender: { type: String, enum: ["Male", "Female", ""], default: "" },
        image: { type: String, default: "" },
        images: { type: [String], default: [] },
        status: {
            type: String,
            enum: ["available", "adopted", "pending", ""],
            default: "available",
        },
        featured: { type: Boolean, default: false },
        fee: { type: String, default: "" },
        nannyFee: { type: String, default: "" },
        description: { type: String, default: "" },
        whyRehoming: { type: String, default: "" },
        whatDogNeeds: { type: String, default: "" },
        currentWeight: { type: String, default: "" },
        expectedWeight: { type: String, default: "" },
        height: { type: String, default: "" },
        sizeCategory: { type: String, enum: ["Small", "Medium", "Large", ""], default: "" },
        personalityTraits: { type: [String], default: [] },
        goodWith: { type: [String], default: [] },
        specialNeeds: { type: String, default: "" },
        location: { type: String, default: "" },
        slug: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

// Prevent overwriting model if already compiled
const Puppy: Model<IPuppy> =
    mongoose.models.Puppy || mongoose.model<IPuppy>("Puppy", PuppySchema);

export default Puppy;
