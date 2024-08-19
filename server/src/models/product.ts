import { Schema, model } from 'mongoose';

interface IProduct {
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    name: string;
    brand: string;
    lowprice: number;
    highprice: number;
    rating: number;
    id: number;
}

const productSchema = new Schema<IProduct>({
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    img4: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    lowprice: { type: Number, required: true },
    highprice: { type: Number, required: true },
    rating: { type: Number, required: true },
    id: { type: Number, required: true, unique: true },
});

export const Product = model<IProduct>('dres', productSchema);

