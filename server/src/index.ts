import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connection } from "./config/db";
import { productRouter } from "./routes/product";
import { userRouter } from "./routes/user";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    response.send("Welcome to ecommerce application");
});

app.use("/api", productRouter);
app.use("/api", userRouter);

app.listen(port, async () => {
    try {
        await connection;
        console.log('server is running on port 8080');
    } catch (error) {
        console.log('error: ', error);
    }
});
