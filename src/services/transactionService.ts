import api from "../api/axios";
import type { Transaction } from "../types/transaction";

interface TransactionParams {
  start_date?: string;
  end_date?: string;
}

export const getTransactions = (params?: TransactionParams) => {
  return api.get("/transaksi/", { params });
};

export const getTransactionDetail = (id: number | string) => {
  return api.get(`/transaksi/${id}/`);
};

export const createTransaction = (data: Transaction) => {
  return api.post("/transaksi/", data);
};

export const updateTransaction = (id: number | string, data: Transaction) => {
  return api.put(`/transaksi/${id}/`, data);
};

export const deleteTransaction = (id: number | string) => {
  return api.delete(`/transaksi/${id}/`);
};
