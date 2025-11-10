import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ title, onCancel, initialData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    kode_barang: initialData?.kode_barang || "",
    nama_barang: initialData?.nama_barang || "",
    kategori: initialData?.kategori || "",
    jumlah: initialData?.jumlah || 0,
    kondisi: initialData?.kondisi || "Baik",
    lokasi: initialData?.lokasi || "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit;
  };

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          {title}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* kode_barang */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Kode Barang
            </label>
            <input
              name="kode_barang"
              value={formData.kode_barang}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded "
              required
            />
          </div>

          {/* nama_barang */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nama Barang
            </label>
            <input
              name="nama_barang"
              value={formData.nama_barang}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* kategori */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Kategori
            </label>
            <input
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* jumlah */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Jumlah
            </label>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              min="0"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* kondisi */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Kondisi
            </label>
            <select
              name="kondisi"
              value={formData.kondisi}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Baik">Baik</option>
              <option value="Rusak">Rusak</option>
              <option value="Hilang">Hilang</option>
            </select>
          </div>

          {/* lokasi */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Lokasi
            </label>
            <input
              name="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* tombol */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate(onCancel)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
