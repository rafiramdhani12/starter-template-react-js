import api from "./axios";

export const transactionAPI = {
  getAll: async () => {
    const res = await api.get("/transactions");
    return res.data.data;
  },

  getLimit: async (limit) => {
    const res = await api.get(`/transactions/limit/${limit}`);
    return res.data.data;
  },
};
