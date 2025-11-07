/* eslint-disable no-unused-vars */
import React from "react";
import { useItemsWithLimit, useItemStats } from "../hooks/useItems";
import Table from "../components/Table";
import { useTransaction } from "../hooks/useTransaction";

const Dashboard = () => {
  // ✅ Pakai hooks baru
  const { data: itemsWithLimit = [], isLoading: loadingItems } =
    useItemsWithLimit(10);
  const { data: stats, isLoading: loadingStats } = useItemStats();

  const { data: transactions = [] } = useTransaction();

  const {
    totalItems = 0,
    goodItems = 0,
    damagedItems = 0,
    missingItems = 0,
    locations = 0,
  } = stats || {};

  if (loadingStats) {
    return <div className="p-6">Loading...</div>;
  }

  const transactionColumns = [
    {
      header: "kode_barang",
      accessor: "kode_barang",
    },
    {
      header: "nama_barang",
      accessor: "nama_barang",
    },
    {
      header: "status",
      accessor: "status",
    },
    {
      header: "jumlah",
      accessor: "jumlah",
    },
    {
      header: "keterangan",
      accessor: "keterangan",
    },
    {
      header: "penanggung jawab",
      accessor: "username",
    },
    {
      header: "waktu",
      accessor: "create_time",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          className={`card bg-blue-600 text-white rounded-xl p-5 shadow-md text-center`}
        >
          <h2 className="text-xl font-semibold">total barang</h2>
          <p className="text-4xl font-bold mt-2">{totalItems || 0}</p>
        </div>
        <div
          className={`card bg-green-600 text-white rounded-xl p-5 shadow-md text-center`}
        >
          <h2 className="text-xl font-semibold">total barang baik</h2>
          <p className="text-4xl font-bold mt-2">{goodItems || 0}</p>
        </div>
        <div
          className={`card bg-red-600 text-white rounded-xl p-5 shadow-md text-center`}
        >
          <h2 className="text-xl font-semibold">total barang rusak</h2>
          <p className="text-4xl font-bold mt-2">{damagedItems || 0}</p>
        </div>
        <div
          className={`card bg-black text-white rounded-xl p-5 shadow-md text-center`}
        >
          <h2 className="text-xl font-semibold">total barang hilang</h2>
          <p className="text-4xl font-bold mt-2">{missingItems || 0}</p>
        </div>
        <div
          className={`card bg-sky-600 text-white rounded-xl p-5 shadow-md text-center`}
        >
          <h2 className="text-xl font-semibold">total lokasi</h2>
          <p className="text-4xl font-bold mt-2">{locations || 0}</p>
        </div>
      </div>

      {/* === TABEL BARANG TERBARU === */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden ">
        <div className="bg-blue-600 text-white px-6 py-3 text-lg font-semibold">
          Barang Terbaru
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-t">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 font-semibold">Kode</th>
                <th className="py-3 px-4 font-semibold">Nama Barang</th>
                <th className="py-3 px-4 font-semibold">Kategori</th>
                <th className="py-3 px-4 font-semibold">Jumlah</th>
                <th className="py-3 px-4 font-semibold">Kondisi</th>
                <th className="py-3 px-4 font-semibold">Lokasi</th>
              </tr>
            </thead>
            <tbody>
              {itemsWithLimit && itemsWithLimit.length > 0 ? (
                itemsWithLimit.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{item.kode_barang}</td>
                    <td className="py-3 px-4">{item.nama_barang}</td>
                    <td className="py-3 px-4">{item.kategori}</td>
                    <td className="py-3 px-4">{item.jumlah}</td>
                    <td className="py-3 px-4 capitalize">{item.kondisi}</td>
                    <td className="py-3 px-4">{item.lokasi}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Tidak ada data barang.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Table
        title={"transaksi terbaru"}
        bg_color="green"
        columns={transactionColumns}
        data={transactions}
        emptyMessage="Tidak ada data transaksi."
      />
    </div>
  );
};

export default Dashboard;
