import { useQuery } from "@tanstack/react-query";
import { transactionAPI } from "../api/transaction";

export const useTransaction = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: transactionAPI.getAll,
  });
};

export const useTransactionWithLimit = (limit = 10) => {
  return useQuery({
    queryKey: ["transactions", "limit", limit],
    queryFn: () => transactionAPI.getLimit(limit),
  });
};
