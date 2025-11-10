import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"; // ⭐ Tambah auth route

import { requestLogger } from "./middlewares/logger.middleware.js";

dotenv.config();

const app = express();
app.use(helmet());

const corsOptions = {
	origin: process.env.FRONTEND_URL || "http://localhost:5173",
	credentials: true,
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: "Terlalu banyak request, coba lagi nanti",
	standardHeaders: true,
	legacyHeaders: false,
});
app.use("/api", limiter);

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: "Terlalu banyak percobaan login, coba lagi dalam 15 menit",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

// Health check (untuk monitoring)
app.get("/", (req, res) => {
	res.json({
		success: true,
		message: "API is running",
		timestamp: new Date().toISOString(),
	});
});

// Auth routes (public - no JWT needed)
app.use("/api/auth", authLimiter, authRouter);

// API routes (protected - need JWT)
app.use("/api/users", userRouter);

app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: "Route not found",
	});
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "Something went wrong",
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
