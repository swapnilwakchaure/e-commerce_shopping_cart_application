"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
exports.productRouter = express_1.default.Router();
exports.productRouter.get('/products', async (request, response) => {
    try {
        const products = await product_1.Product.find();
        response.status(200).json(products);
    }
    catch (error) {
        response.status(500).json({ message: 'Error fetching products', error });
    }
});
