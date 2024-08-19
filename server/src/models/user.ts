import { Schema, model } from 'mongoose';

interface IUser {
    full_name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const UserAuth = model<IUser>('user', userSchema);
