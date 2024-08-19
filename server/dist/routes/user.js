"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/users", async (request, response) => {
    try {
        const users = await user_1.UserAuth.find();
        response.status(200).json(users);
    }
    catch (error) {
        console.log('error: ', error);
        response.status(500).json({ message: 'Error fetching products', error });
    }
});
exports.userRouter.post("/register", async (request, response) => {
    const { full_name, email, password } = request.body;
    try {
        const existingUser = await user_1.UserAuth.findOne({ email });
        if (existingUser) {
            return response
                .status(200)
                .json({ message: "You're email address already exists, please login" });
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const user = new user_1.UserAuth({
            full_name,
            email,
            password: hashPassword,
        });
        await user.save();
        response
            .status(201)
            .json({ message: `${full_name}, your registration successful, please login` });
    }
    catch (error) {
        response.status(500).json({ message: "Internal Server Error " });
    }
});
exports.userRouter.post("/login", async (request, response) => {
    const { email, password } = request.body;
    try {
        const user = await user_1.UserAuth.findOne({ email });
        if (!user) {
            return response.status(200).json({ message: "Invalid email address" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user?.password);
        if (!isMatch) {
            return response.status(200).json({ message: "Incorrect password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 5,
        });
        response.cookie("token", token, { httpOnly: true, maxAge: 300000 });
        response.status(200).json({ message: `Welcome ${user?.full_name}!` });
    }
    catch (error) {
        response.status(500).json({ message: "Internal Server Error " });
    }
});
