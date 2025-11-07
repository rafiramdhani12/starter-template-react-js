import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Routes
import itemRouter from "./routes/item.route.js";
import transactionRouter from "./routes/transaction.route.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"; // ⭐ Tambah auth route

// Middlewares

import { requestLogger } from "./middlewares/logger.middleware.js";

// Load environment variables
dotenv.config();

const app = express();

// ==========================================
// 1. SECURITY MIDDLEWARES (paling atas!)
// ==========================================

// Helmet - Set security headers
app.use(helmet());

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate Limiting - Prevent brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // max 100 requests per windowMs
  message: "Terlalu banyak request, coba lagi nanti",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Rate limit khusus untuk login (lebih ketat)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // max 5 login attempts per 15 menit
  message: "Terlalu banyak percobaan login, coba lagi dalam 15 menit",
});

// ==========================================
// 2. BODY PARSERS
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 3. LOGGING (optional tapi recommended)
// ==========================================
app.use(requestLogger); // Buat file ini nanti

// ==========================================
// 4. ROUTES
// ==========================================

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
app.use("/api/items", itemRouter);
app.use("/api/transactions", transactionRouter);

// ==========================================
// 5. ERROR HANDLING (paling bawah!)
// ==========================================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// ==========================================
// 6. START SERVER
// ==========================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
