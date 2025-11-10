import { useMutation, useQuery } from "@tanstack/react-query";
import { authAPI } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: ({ email, password }) => authAPI.login(email, password),
		onSuccess: (response) => {
			localStorage.setItem("token", response.data.accessToken);

			navigate("/dashboard");
		},
	});
};

export const useCurrentUser = () => {
	return useQuery({
		queryKey: ["currentUser"],
		queryFn: authAPI.getProfile,
		retry: false,
	});
};

export const useLogout = () => {
	const navigate = useNavigate();

	return () => {
		localStorage.removeItem("token");
		navigate("/");
	};
};
