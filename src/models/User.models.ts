import mongoose, { Schema, Document } from 'mongoose';
import { ILostOrFoundItem, LostOrFoundItemSchema } from './LostOrFound.models';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    AdmissionNumber: string;
    Hostel: string;
    LostOrFound: ILostOrFoundItem[];

}

const hostelList = [
    "Aquamarine",
    "Sapphire",
    "Amber",
    "Topaz",
    "Diamond",
    "Jasper",
    "Ruby & Rosaline",
    "Emerald",
    "Opal",
    "International"
];

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    AdmissionNumber: { type: String, required: true, unique: true },
    Hostel: { type: String, required: true, enum: hostelList },
    LostOrFound: { type: [LostOrFoundItemSchema], default: [] }
});

const UserModel = mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>('User', UserSchema);


export default UserModel;