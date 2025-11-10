import db from "../config/database.js";

class TransactionService {
  static getAllTransactions = async () => {
    const [rows] = await db.query(
      "SELECT t.*, b.nama_barang, b.kategori, b.lokasi, u.username FROM transaksi t LEFT JOIN barang b ON t.kode_barang = b.kode_barang LEFT JOIN users u ON t.user_id = u.id ORDER BY t.create_time DESC"
    );
    return rows;
  };

  static getTransactionWithLimit = async (limit) => {
    const [rows] = await db.query(
      "SELECT * FROM transaksi ORDER BY create_time DESC LIMIT :limit",
      { limit: parseInt(limit) }
    );
    return rows;
  };

  static getTransactionById = async (id) => {
    const [rows] = await db.query("SELECT * FROM transaksi WHERE id = :id", {
      id,
    });
    return rows[0];
  };

  static createTransaction = async (data) => {
    const [result] = await db.query(
      "INSERT INTO transaksi (id_transaksi, kode_barang, id_user, tgl_kembali, tgl_pinjam, status) VALUES (:id_transaksi, :kode_barang, :id_user, :tgl_kembali, :tgl_pinjam, :status)",
      data
    );
    return result;
  };

  static updateTransaction = async (id, data) => {
    const [result] = await db.query(
      "UPDATE transaksi SET id_transaksi = :id_transaksi, kode_barang = :kode_barang, id_user = :id_user, tgl_kembali = :tgl_kembali, tgl_pinjam = :tgl_pinjam, status = :status WHERE id = :id",
      { ...data, id }
    );
    return result;
  };

  static deleteTransaction = async (id) => {
    const [result] = await db.query("DELETE FROM transaksi WHERE id = :id", {
      id,
    });
    return result;
  };
}

export default TransactionService;
