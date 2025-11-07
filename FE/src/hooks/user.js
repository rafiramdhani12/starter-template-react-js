import api from "./axios.js";

export const userAPI = {
  getAll: async () => {
    const res = await api.get("/users");
    return res.data.data;
  },
  getById: async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data.data;
  },
  create: async (data) => {
    const res = await api.post("/users", data);
    return res.data.data;
  },
  update: async ({ id, data }) => {
    const res = await api.put(`/users/${id}`, data);
    return res.data.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data.data;
  },
};
