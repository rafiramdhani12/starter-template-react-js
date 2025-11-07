// src/hooks/useItems.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/items";

const itemAPI = {
  getAll: async () => {
    const res = await axios.get(BASE_URL);
    return res.data.data;
  },

  getLimit: async (limit = 10) => {
    const res = await axios.get(`${BASE_URL}/limit/${limit}`);
    return res.data.data;
  },

  getStats: async () => {
    const [total, good, damaged, missing, locations] = await Promise.all([
      axios.get(`${BASE_URL}/total-items`),
      axios.get(`${BASE_URL}/good-items`),
      axios.get(`${BASE_URL}/damaged-items`),
      axios.get(`${BASE_URL}/missing-items`),
      axios.get(`${BASE_URL}/location-items`),
    ]);

    return {
      totalItems: total.data.data,
      goodItems: good.data.data,
      damagedItems: damaged.data.data,
      missingItems: missing.data.data,
      locations: locations.data.data,
    };
  },

  getById: async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data.data;
  },

  create: async (data) => {
    const res = await axios.post(BASE_URL, data);
    return res.data.data;
  },

  update: async ({ id, data }) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${BASE_URL}/delete-item/${id}`);
    return res.data.data;
  },
};

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: itemAPI.getAll,
  });
};

export const useItemsWithLimit = (limit = 10) => {
  return useQuery({
    queryKey: ["items", "limit", limit],
    queryFn: () => itemAPI.getLimit(limit),
  });
};

export const useItemStats = () => {
  return useQuery({
    queryKey: ["item-stats"],
    queryFn: itemAPI.getStats,
  });
};

export const useItemById = (id) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => itemAPI.getById(id),
    enabled: !!id,
  });
};

export const useAddItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item-stats"] });
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item-stats"] });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: itemAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item-stats"] });
    },
  });
};
