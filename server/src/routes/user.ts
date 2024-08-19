import express from "express";
import { UserAuth } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userRouter = express.Router();

userRouter.get("/users", async (request, response) => {
    try {
        const users = await UserAuth.find();
        response.status(200).json(users);
    } catch (error) {
        console.log('error: ', error);
        response.status(500).json({ message: 'Error fetching products', error });
    }
});

userRouter.post("/register", async (request, response) => {
    const { full_name, email, password } = request.body;

    try {
        const existingUser = await UserAuth.findOne({ email });
        if (existingUser) {
            return response
                .status(200)
                .json({ message: "You're email address already exists, please login" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new UserAuth({
            full_name,
            email,
            password: hashPassword,
        });

        await user.save();

        response
            .status(201)
            .json({ message: `${full_name}, your registration successful, please login` });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error " });
    }
});

userRouter.post("/login", async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await UserAuth.findOne({ email });

        if (!user) {
            return response.status(200).json({ message: "Invalid email address" });
        }

        const isMatch = await bcrypt.compare(password, user?.password);

        if (!isMatch) {
            return response.status(200).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
            expiresIn: 60 * 5,
        });

        response.cookie("token", token, { httpOnly: true, maxAge: 300000 });
        response.status(200).json({ message: `Welcome ${user?.full_name}!` });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error " });
    }
});
