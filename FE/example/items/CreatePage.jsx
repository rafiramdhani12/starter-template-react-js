import React from "react";
import Form from "../../components/Form";
import { useAddItem } from "../../hooks/useItems";

const CreatePage = () => {
  const addMutation = useAddItem();

  const handleSubmit = (formData) => {
    const dataToSend = {
      ...formData,
      updatd_by: "Admin",
    };

    addMutation.mutate(dataToSend, {
      onSuccess: () => {
        alert("✅ Data berhasil ditambahkan!");
      },
      onError: () => {
        alert("❌ Terjadi kesalahan saat menambahkan data.");
      },
    });
  };

  return (
    <Form
      title="Tambah Barang"
      onCancel={"/dashboard/items-page"}
      onSubmit={handleSubmit}
    />
  );
};

export default CreatePage;
