import db from "../config/database.js";

class ItemService {
  // ===== READ OPERATIONS =====
  static getAllBarang = async () => {
    const [rows] = await db.query(
      "SELECT * FROM barang ORDER BY create_time DESC"
    );
    return rows;
  };

  static limitBarang = async (limit) => {
    const [rows] = await db.query(
      "SELECT * FROM barang ORDER BY create_time DESC LIMIT :limit",
      { limit: parseInt(limit) }
    );
    return rows;
  };

  // * filtering

  static getBarangById = async (id) => {
    const [rows] = await db.query("SELECT * FROM barang WHERE id = :id", {
      id,
    });
    return rows[0];
  };

  static getBarangByKode = async (kode_barang) => {
    const [rows] = await db.query(
      "SELECT * FROM barang WHERE kode_barang = :kode_barang",
      { kode_barang }
    );
    return rows[0];
  };

  static getBarangByKategori = async (kategori) => {
    const [rows] = await db.query(
      "SELECT * FROM barang WHERE kategori = :kategori",
      { kategori }
    );
    return rows;
  };

  static getBarangByLokasi = async (lokasi) => {
    const [rows] = await db.query(
      "SELECT * FROM barang WHERE lokasi = :lokasi",
      {
        lokasi,
      }
    );
    return rows;
  };

  static getDistinctLokasi = async () => {
    const [rows] = await db.query(
      "SELECT DISTINCT lokasi FROM barang WHERE lokasi IS NOT NULL AND lokasi != ''"
    );
    return rows;
  };

  // * search

  static searchBarang = async (keyword) => {
    const searchTerm = "%" + keyword + "%";
    const [rows] = await db.query(
      "SELECT * FROM barang WHERE nama_barang LIKE :keyword OR kode_barang LIKE :keyword OR kategori LIKE :keyword OR kondisi LIKE :keyword OR lokasi LIKE :keyword ORDER BY create_time DESC",
      {
        keyword: searchTerm,
      }
    );
    return rows;
  };

  // ===== COUNT OPERATIONS =====

  static countBarang = async () => {
    const [rows] = await db.query("SELECT COUNT(*) as total FROM barang");
    return rows[0].total;
  };

  static countBarangBaik = async () => {
    const [rows] = await db.query(
      "SELECT COUNT(*) as total FROM barang WHERE kondisi = 'baik'"
    );
    return rows[0].total;
  };

  static countBarangRusak = async () => {
    const [rows] = await db.query(
      "SELECT COUNT(*) as total FROM barang WHERE kondisi = 'rusak'"
    );
    return rows[0].total;
  };

  static countBarangHilang = async () => {
    const [rows] = await db.query(
      "SELECT COUNT(*) as total FROM barang WHERE kondisi = 'hilang'"
    );
    return rows[0].total;
  };

  static countLokasi = async () => {
    const [rows] = await db.query(
      "SELECT COUNT(DISTINCT lokasi) as total FROM barang WHERE lokasi IS NOT NULL AND lokasi != ''"
    );
    return rows[0].total;
  };

  static countByKategori = async () => {
    const [rows] = await db.query(
      "SELECT kategori, COUNT(*) as total FROM barang GROUP BY kategori"
    );
    return rows;
  };

  static countByLokasi = async () => {
    const [rows] = await db.query(
      "SELECT lokasi, COUNT(*) as total FROM barang GROUP BY lokasi"
    );
    return rows;
  };

  // ===== CREATE =====
  static createBarang = async (
    kode_barang,
    nama_barang,
    kategori,
    jumlah,
    kondisi,
    lokasi,
    updated_by
  ) => {
    try {
      const existing = await getBarangByKode(kode_barang);
      if (existing) {
        throw new Error("Kode barang sudah ada!");
      }

      const [result] = await db.query(
        `INSERT INTO barang (kode_barang, nama_barang, kategori, jumlah, kondisi, lokasi, updated_by)
       VALUES (:kode_barang, :nama_barang, :kategori, :jumlah, :kondisi, :lokasi, :updated_by)`,
        {
          kode_barang,
          nama_barang,
          kategori,
          jumlah,
          kondisi,
          lokasi,
          updated_by,
        }
      );

      return {
        id: result.insertId,
        kode_barang,
        nama_barang,
        kategori,
        jumlah,
        kondisi,
        lokasi,
        updated_by,
      };
    } catch (error) {
      console.error("Error creating barang:", error.message);
      throw error;
    }
  };

  // ===== UPDATE =====
  static updateBarang = async (
    id,
    kode_barang,
    nama_barang,
    kategori,
    jumlah,
    kondisi,
    lokasi,
    updated_by
  ) => {
    try {
      const [check] = await db.query(
        "SELECT id FROM barang WHERE kode_barang = :kode_barang AND id != :id",
        { kode_barang, id }
      );

      if (check.length > 0) {
        throw new Error("Kode barang sudah digunakan barang lain!");
      }

      const [result] = await db.query(
        `UPDATE barang
       SET kode_barang = :kode_barang,
           nama_barang = :nama_barang,
           kategori = :kategori,
           jumlah = :jumlah,
           kondisi = :kondisi,
           lokasi = :lokasi,
           updated_by = :updated_by
       WHERE id = :id`,
        {
          id,
          kode_barang,
          nama_barang,
          kategori,
          jumlah,
          kondisi,
          lokasi,
          updated_by,
        }
      );

      return result;
    } catch (error) {
      console.error("Error updating barang:", error.message);
      throw error;
    }
  };

  // ===== DELETE =====
  static deleteBarang = async (id) => {
    try {
      const [result] = await db.execute("DELETE FROM barang WHERE id = :id", {
        id,
      });
      return result;
    } catch (error) {
      console.log("Error deleting barang:", error.message);
      throw error;
    }
  };
}

export default ItemService;
