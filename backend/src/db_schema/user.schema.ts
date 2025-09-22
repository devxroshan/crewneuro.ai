import mongoose, {
    Document,
    Schema
} from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    profile_pic: string;
    is_verified: boolean;
}

const userSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_pic: { type: String, default: '' },
    is_verified: { type: Boolean, default: false },
}, {
    timestamps: true
})

export const User:mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);