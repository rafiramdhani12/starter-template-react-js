import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  // ==========================================
  // TOKEN MANAGEMENT
  // ==========================================

  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role, // ⭐ Tambahkan role untuk authorization
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );
  }

  generateRefreshToken(user) {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error("Token tidak valid atau expired");
    }
  }

  // ⭐ TAMBAHKAN method ini (yang hilang!)
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error("Refresh token tidak valid atau expired");
    }
  }

  generateTokenPair(user) {
    return {
      accessToken: this.generateToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  // ==========================================
  // PASSWORD MANAGEMENT
  // ==========================================

  async hashPassword(password) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || 10);
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

export default new AuthService();
