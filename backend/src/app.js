import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',        // add origin of your frontend application here
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Server running Perfectly");
});

// performing routing
import userRouter from "./routes/user.routes.js";

app.use("/api", userRouter);

export default app;