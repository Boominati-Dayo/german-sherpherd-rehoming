import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
    puppyName: string;
    puppyId: string;
    applicantName: string;
    email: string;
    phone: string;
    location: string;
    answers: Record<string, any>;
    status: "new" | "reviewed" | "approved" | "rejected";
    adminNotes: string;
    createdAt: Date;
}

const ApplicationSchema: Schema = new Schema(
    {
        puppyName: { type: String, default: "General Inquiry" },
        puppyId: { type: String },
        applicantName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        location: { type: String, required: true },
        answers: { type: Schema.Types.Mixed, default: {} },
        status: {
            type: String,
            enum: ["new", "reviewed", "approved", "rejected"],
            default: "new",
        },
        adminNotes: { type: String, default: "" },
    },
    { timestamps: true }
);

const Application: Model<IApplication> =
    mongoose.models.Application ||
    mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;
