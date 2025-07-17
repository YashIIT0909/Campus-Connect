import mongoose, { Schema, Document } from "mongoose";

export interface ILostOrFoundItem extends Document {
    title: string;
    description: string;
    imageUrl: string[];
    category: string;
    location: string;
    date: Date;
    time: string;
    Item: "Lost" | "Found";
    userId: mongoose.Schema.Types.ObjectId;
}

export const LostOrFoundItemSchema: Schema<ILostOrFoundItem> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: [String], default: [], required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    Item: { type: String, enum: ["Lost", "Found"], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const LostOrFoundItemModel = mongoose.models.LostOrFoundItem as mongoose.Model<ILostOrFoundItem> || mongoose.model<ILostOrFoundItem>("LostOrFoundItem", LostOrFoundItemSchema);

export default LostOrFoundItemModel;
