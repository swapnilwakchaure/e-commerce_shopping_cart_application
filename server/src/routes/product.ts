import express from "express";
import { Product } from "../models/product";

export const productRouter = express.Router();

productRouter.get('/products', async (request, response) => {
    try {
        const products = await Product.find();
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ message: 'Error fetching products', error });
    }
});

