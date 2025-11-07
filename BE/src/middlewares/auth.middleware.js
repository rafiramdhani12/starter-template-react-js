import jwt from "jsonwebtoken";
import authService from "../services/auth.service.js";

export const authenticate = (req, res, next) => {
  try {
    // Ambil token dari header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = authService.verifyToken(token);

    req.user = decoded; // Simpan user info di request
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Token tidak valid atau expired",
    });
  }
};

// Optional: Role-based access
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized: User belum login",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Akses ditolak",
      });
    }
    next();
  };
};
