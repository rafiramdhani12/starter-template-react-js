import api from "./axios.js";

export const authAPI = {
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },

  register: async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get("/auth/me");
    return res.data.data;
  },
};
