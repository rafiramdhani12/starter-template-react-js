import React from "react";
import Table from "../../components/Table";
import { useDeleteItem, useItems } from "../../hooks/useItems";
import { NavLink, useNavigate } from "react-router-dom";

const ItemsPage = () => {
  const { data: items = [] } = useItems();
  const navigate = useNavigate();
  const deleteMutation = useDeleteItem();

  const columns = [
    { header: "kode_barang", accessor: "kode_barang" },
    { header: "nama_barang", accessor: "nama_barang" },
    { header: "kategori", accessor: "kategori" },
    { header: "jumlah", accessor: "jumlah" },
    { header: "kondisi", accessor: "kondisi" },
    { header: "lokasi", accessor: "lokasi" },
  ];

  const actions = [
    {
      label: "Edit",
      onClick: (item) => {
        navigate(`/items/edit/${item.id}`);
      },
    },
    {
      label: "Hapus",
      onClick: (item) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
          deleteMutation.mutate(item.id, {
            onSuccess: () => {
              alert("Barang berhasil dihapus");
            },
            onError: (error) => {
              alert("gagal hapus" + error.message);
            },
          });
        }
      },
    },
  ];

  return (
    <>
      <div className="btn btn-success mx-5 my-5 text-white">
        <NavLink to={"/item/add"}>tambah barang</NavLink>
      </div>
      <Table
        title={"Daftar Barang"}
        bg_color={"blue"}
        columns={columns}
        data={items}
        actions={actions}
        emptyMessage="Tidak ada barang."
      />
    </>
  );
};

export default ItemsPage;
