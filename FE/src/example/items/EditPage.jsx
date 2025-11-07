import { useNavigate, useParams } from "react-router-dom";
import { useItemById, useUpdateItem } from "../../hooks/useItems";
import { useState, useEffect } from "react";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: item, isLoading, isError } = useItemById(id);
  const updateMutation = useUpdateItem();

  // State lokal untuk jumlah & error validasi
  const [jumlah, setJumlah] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setJumlah(item.jumlah);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Validasi jumlah (tidak boleh lebih kecil dari 0 dan tidak lebih dari jumlah di database)
    const jumlahInt = parseInt(data.jumlah, 10);
    if (isNaN(jumlahInt) || jumlahInt < 0) {
      setError("Jumlah tidak boleh negatif!");
      return;
    }
    if (jumlahInt > item.jumlah) {
      setError(`Jumlah tidak boleh lebih dari stok awal (${item.jumlah}).`);
      return;
    }

    setError("");

    updateMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          alert("✅ Data berhasil diupdate!");
          navigate("/dashboard/items-page");
        },
        onError: () => {
          alert("❌ Terjadi kesalahan saat update data.");
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <div className="animate-pulse">Loading data...</div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Gagal memuat data.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        ✏️ Edit Barang
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* kode_barang */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Kode Barang
          </label>
          <input
            name="kode_barang"
            defaultValue={item?.kode_barang}
            readOnly
            className="border border-gray-300 p-2 w-full rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* nama_barang */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Nama Barang
          </label>
          <input
            name="nama_barang"
            defaultValue={item?.nama_barang}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* kategori */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Kategori
          </label>
          <input
            name="kategori"
            defaultValue={item?.kategori}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* jumlah */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Jumlah (maks: {item?.jumlah})
          </label>
          <input
            type="number"
            name="jumlah"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* kondisi */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Kondisi
          </label>
          <select
            name="kondisi"
            defaultValue={item?.kondisi || "Baik"}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Baik">Baik</option>
            <option value="Rusak">Rusak</option>
            <option value="Hilang">Hilang</option>
          </select>
        </div>

        {/* lokasi */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Lokasi</label>
          <input
            name="lokasi"
            defaultValue={item?.lokasi}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* tombol */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/items-page")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={updateMutation.isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition disabled:opacity-60"
          >
            {updateMutation.isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
