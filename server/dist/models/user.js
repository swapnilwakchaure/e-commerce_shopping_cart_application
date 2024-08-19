"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuth = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
exports.UserAuth = (0, mongoose_1.model)('user', userSchema);
