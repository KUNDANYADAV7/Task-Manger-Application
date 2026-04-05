import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import custom modules
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Enable CORS for frontend (allow credentials like cookies)
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// API Routes
app.use("/api/auth", authRoutes);   // Authentication routes (login, register, etc.)
app.use("/api/tasks", taskRoutes);  // Task-related routes

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);