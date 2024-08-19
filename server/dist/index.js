"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const product_1 = require("./routes/product");
const user_1 = require("./routes/user");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (request, response) => {
    response.send("Welcome to ecommerce application");
});
app.use("/api", product_1.productRouter);
app.use("/api", user_1.userRouter);
app.listen(port, async () => {
    try {
        await db_1.connection;
        console.log('server is running on port 8080');
    }
    catch (error) {
        console.log('error: ', error);
    }
});
