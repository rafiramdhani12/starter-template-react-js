import authService from "../services/auth.service.js";
import db from "../config/database.js";

class AuthController {
  // Register user baru
  async register(req, res, next) {
    try {
      const { name, username, email, password, role = "user" } = req.body;

      // 1. Validasi input
      if (!name || !username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Nama, email, dan password harus diisi",
        });
      }

      // 2. Cek email sudah ada atau belum
      const [existingUser] = await db.query(
        "SELECT id FROM users WHERE email = :email",
        { email }
      );

      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Email sudah terdaftar",
        });
      }

      // 3. Hash password
      const hashedPassword = await authService.hashPassword(password);

      // 4. Insert ke database
      const [result] = await db.query(
        "INSERT INTO users (name, username ,email, password, role) VALUES (:name, :username ,:email, :password, :role)",
        { name, username, email, password: hashedPassword, role }
      );

      // 5. Generate token pair
      const user = {
        id: result.insertId,
        name,
        username,
        email,
        role,
      };

      const { accessToken, refreshToken } = authService.generateTokenPair(user);

      // 6. Response
      res.status(201).json({
        success: true,
        message: "Register berhasil",
        data: {
          accessToken,
          refreshToken,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      console.log("📧 Login attempt:", email); // ⭐ Debug

      // 1. Validasi input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email dan password harus diisi",
        });
      }

      // 2. Cari user berdasarkan email
      console.log("🔍 Executing query..."); // ⭐ Debug

      const [users] = await db.query(
        "SELECT id, name, username, email, password, role FROM users WHERE email = :email",
        { email }
      );

      console.log("✅ Query result:", users.length, "users found"); // ⭐ Debug

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Email atau password salah",
        });
      }

      const user = users[0];

      // 3. Cek password
      const isPasswordValid = await authService.comparePassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Email atau password salah",
        });
      }

      // 4. Generate token pair
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const { accessToken, refreshToken } =
        authService.generateTokenPair(userData);

      // 5. Response (JANGAN kirim password!)
      res.json({
        success: true,
        message: "Login berhasil",
        data: {
          accessToken,
          refreshToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      console.error("❌ Login Error Details:"); // ⭐ Debug
      console.error("Message:", error.message);
      console.error("Code:", error.code);
      console.error("SQL:", error.sql);
      console.error("Full error:", error);
      next(error);
    }
  }

  // Refresh Token
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token harus diisi",
        });
      }

      // Verify refresh token
      const decoded = authService.verifyRefreshToken(refreshToken);

      // ⭐ Fetch fresh user data dari database (untuk dapat info terbaru)
      const [users] = await db.query(
        "SELECT id, name, email, role FROM users WHERE id = :id",
        { id: decoded.id }
      );

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          message: "User tidak ditemukan",
        });
      }

      const userData = users[0];

      // Generate new token pair
      const { accessToken, refreshToken: newRefreshToken } =
        authService.generateTokenPair(userData);

      res.json({
        success: true,
        message: "Token berhasil di-refresh",
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message || "Refresh token tidak valid atau expired",
      });
    }
  }

  // Logout
  async logout(req, res, next) {
    try {
      // ⭐ TODO: Implement token blacklist di production
      // Untuk sekarang, client tinggal hapus token dari storage

      res.json({
        success: true,
        message: "Logout berhasil. Token telah dihapus dari client",
      });
    } catch (error) {
      next(error);
    }
  }

  // Get current user info
  async me(req, res, next) {
    try {
      // req.user sudah ada dari middleware authenticate
      const [users] = await db.query(
        "SELECT id, name, email, role FROM users WHERE id = :id",
        { id: req.user.id }
      );

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        });
      }

      res.json({
        success: true,
        data: users[0],
      });
    } catch (error) {
      next(error);
    }
  }

  // ⭐ BONUS: Change password
  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Password lama dan baru harus diisi",
        });
      }

      // Validasi password baru
      try {
        authService.validatePasswordStrength(newPassword);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      // Get user data
      const [users] = await db.query(
        "SELECT password FROM users WHERE id = :id",
        { id: userId }
      );

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        });
      }

      // Verify old password
      const isOldPasswordValid = await authService.comparePassword(
        oldPassword,
        users[0].password
      );

      if (!isOldPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Password lama salah",
        });
      }

      // Hash new password
      const hashedNewPassword = await authService.hashPassword(newPassword);

      // Update password
      await db.query("UPDATE users SET password = :password WHERE id = :id", {
        password: hashedNewPassword,
        id: userId,
      });

      res.json({
        success: true,
        message: "Password berhasil diubah",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
