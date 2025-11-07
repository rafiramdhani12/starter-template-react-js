import db from "../config/database.js";

class UserService {
  // ✅ Ambil semua user
  async getAllUsers() {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  }

  // ✅ Ambil user berdasarkan ID
  async getUserById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = :id", { id });
    return rows[0];
  }

  // ✅ Ambil user berdasarkan username
  async getUserByUsername(username) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = :username",
      { username }
    );
    return rows[0];
  }

  // ✅ Tambah user baru
  async createUser({ nama, username, password, role }) {
    const [result] = await db.query(
      `INSERT INTO users (nama, username, password, role)
       VALUES (:nama, :username, :password, :role)`,
      { nama, username, password, role }
    );

    return {
      id: result.insertId,
      nama,
      username,
      role,
    };
  }

  // ✅ Update user
  async updateUser({ id, nama, username, password, role }) {
    const [result] = await db.query(
      `UPDATE users 
       SET nama = :nama, username = :username, password = :password, role = :role
       WHERE id = :id`,
      { id, nama, username, password, role }
    );
    return result;
  }

  // ✅ Hapus user
  async deleteUser(id) {
    const [result] = await db.query("DELETE FROM users WHERE id = :id", { id });
    return result;
  }
}

const userService = new UserService();
export default userService;
