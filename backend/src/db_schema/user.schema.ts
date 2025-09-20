import mongoose, {
    Document,
    Schema
} from "mongoose";


export interface IUser extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
    profile_pic: string;
}

const userSchema: Schema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_pic: { type: String, default: '' },
}, {
    timestamps: true
})

export const User:mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);