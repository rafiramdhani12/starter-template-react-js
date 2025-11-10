import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userAPI } from "../api/user";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userAPI.getAll,
  });
};

export const useUserById = (id) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userAPI.getById(id),
    enabled: !!id, // Only run query kalo id ada
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => userAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
