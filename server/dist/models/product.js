"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
exports.Product = (0, mongoose_1.model)('dres', productSchema);
