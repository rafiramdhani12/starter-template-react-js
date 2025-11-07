import ItemService from "../services/item.service.js";

class ItemController {
  static getItems = async (req, res) => {
    try {
      const items = await ItemService.getAllBarang();
      res.status(200).json({
        status: "success",
        data: items,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  static getItemWithLimit = async (req, res) => {
    const { limit } = req.params;

    if (!limit || isNaN(limit) || limit <= 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid limit" });
    }

    try {
      const items = await ItemService.limitBarang(limit);
      res.status(200).json({
        status: "success",
        data: items,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "error", message: e.message });
    }
  };

  static getTotalItems = async (req, res) => {
    try {
      const total = await ItemService.countBarang();
      res.status(200).json({
        status: "success",
        data: total,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  static getTotalGoodItems = async (req, res) => {
    try {
      const total = await ItemService.countBarangBaik();
      res.status(200).json({
        status: "success",
        data: total,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  static getTotalDamagedItems = async (req, res) => {
    try {
      const total = await ItemService.countBarangRusak();
      res.status(200).json({
        status: "success",
        data: total,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  static getTotalMissingItems = async (req, res) => {
    try {
      const total = await ItemService.countBarangHilang();
      res.status(200).json({
        status: "success",
        data: total,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  static getTotalLocation = async (req, res) => {
    try {
      const total = await ItemService.countLokasi();
      res.status(200).json({
        status: "success",
        data: total,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  static getBarangByidController = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await ItemService.getBarangById(id);
      res.status(200).json({
        status: "success",
        data: item,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  static addItems = async (req, res) => {
    try {
      const {
        kode_barang,
        nama_barang,
        kategori,
        jumlah,
        kondisi,
        lokasi,
        updated_by,
      } = req.body;
      const newItem = await ItemService.createBarang(
        kode_barang,
        nama_barang,
        kategori,
        jumlah,
        kondisi,
        lokasi,
        updated_by
      );
      res.status(201).json({
        status: "success",
        data: newItem,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  static updateItem = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        kode_barang,
        nama_barang,
        kategori,
        jumlah,
        kondisi,
        lokasi,
        updated_by,
      } = req.body;
      const updatedItem = await ItemService.updateBarang(
        id,
        kode_barang,
        nama_barang,
        kategori,
        jumlah,
        kondisi,
        lokasi,
        updated_by
      );
      res.status(200).json({
        status: "success",
        data: updatedItem,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  static deleteItem = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await ItemService.deleteBarang(id);
      res.status(200).json({
        status: "success",
        data: deletedItem,
      });
    } catch (error) {
      // Cek jika ini error validasi kita
      if (
        error.message === "Tidak dapat menghapus barang, ada transaksi terkait!"
      ) {
        res.status(409).json({ status: "conflict", message: error.message }); // 409 Conflict
      } else {
        // Jika error lain, baru anggap 500
        res.status(500).json({ status: "error", message: error.message });
      }
    }
  };
}

export default ItemController;
