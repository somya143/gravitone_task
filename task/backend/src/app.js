import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./utils/db.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
dbConnect();

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Role-Based Auth API 🚀");
});

export default app;
