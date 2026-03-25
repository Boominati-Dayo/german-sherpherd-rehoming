import mongoose, { Schema, Document, Model } from "mongoose";

export interface INannyImage extends Document {
    image: string;
    featured: boolean;
    createdAt: Date;
}

const NannyImageSchema: Schema = new Schema(
    {
        image: { type: String, required: true },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const NannyImage: Model<INannyImage> =
    mongoose.models.NannyImage || mongoose.model<INannyImage>("NannyImage", NannyImageSchema);

export default NannyImage;
