<template>
  <div class="p-6">
    <div
      class="flex justify-between items-center mb-5 bg-white p-3 rounded-lg shadow-sm"
    >
      <h1 class="text-xl font-semibold text-gray-800">Data Transaksi</h1>
      <Button variant="danger" @click="logout"> Logout </Button>
    </div>
    <div
      class="flex flex-wrap items-end justify-between gap-4 mb-5 bg-white p-3 rounded-lg shadow-sm"
    >
      <div class="flex flex-wrap gap-3 items-end">
        <div class="w-[180px]">
          <Input type="date" v-model="fromDate" label="Dari Tanggal" />
        </div>

        <div class="w-[180px]">
          <Input type="date" v-model="toDate" label="Sampai Tanggal" />
        </div>
        <div class="flex gap-2">
          <Button
            variant="primary"
            :disabled="fromDate > toDate"
            @click="fetchData"
          >
            Filter
          </Button>

          <Button
            variant="secondary"
            :disabled="!fromDate && !toDate"
            @click="resetFilter"
          >
            Reset
          </Button>
        </div>
      </div>
      <Button to="/transactions/create" variant="success">
        + Tambah Transaksi
      </Button>
    </div>
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-700">
          <tr>
            <th class="p-3 text-left font-medium">No</th>
            <th class="p-3 text-left font-medium">Kode</th>
            <th class="p-3 text-left font-medium">Tanggal</th>
            <th class="p-3 text-left font-medium">Produk</th>
            <th class="p-3 text-left font-medium">Qty</th>
            <th class="p-3 text-left font-medium">Total</th>
            <th class="p-3 text-left font-medium">Pembayaran</th>
            <th class="p-3 text-center font-medium">Aksi</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="(item, index) in transactions"
            :key="item.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="p-3">{{ index + 1 }}</td>
            <td class="p-3">{{ item.kode }}</td>
            <td class="p-3">
              {{ item.tanggal_transaksi?.split("T")[0] }}
            </td>
            <td class="p-3">
              {{ PRODUCT_LABELS[item.tipe_produk] || item.tipe_produk }}
            </td>
            <td class="p-3">{{ item.jumlah }}</td>
            <td class="p-3">{{ item.total_harga }}</td>
            <td class="p-3">
              {{ PAYMENT_LABELS[item.tipe_pembayaran] || item.tipe_pembayaran }}
            </td>

            <td class="p-3">
              <div class="flex gap-2 justify-center">
                <Button :to="`/transactions/${item.id}/edit`" variant="primary">
                  Edit
                </Button>

                <Button variant="danger" @click="hapus(item.id)">
                  Hapus
                </Button>
              </div>
            </td>
          </tr>

          <tr v-if="transactions.length === 0">
            <td colspan="8" class="text-center p-6 text-gray-500">
              Data tidak tersedia
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axios";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import { PAYMENT_LABELS, PRODUCT_LABELS } from "../constants";
import type {Transaction} from "../types/transaction.ts";

const router = useRouter();
const transactions = ref<Transaction[]>([]);
const fromDate = ref("");
const toDate = ref("");

const fetchData = async () => {
  if (fromDate.value && toDate.value) {
    if (fromDate.value > toDate.value) {
      alert("Start date tidak boleh lebih besar dari End date");
      return;
    }
  }
  const params: Record<string, string> = {};
  if (fromDate.value) params.start_date = fromDate.value;
  if (toDate.value) params.end_date = toDate.value;
  router.push({
    path: "/transactions",
    query: Object.keys(params).length ? params : undefined,
  });
  const response = await api.get("/transaksi/", { params });
  transactions.value = response.data.data;
};

const resetFilter = async () => {
  fromDate.value = "";
  toDate.value = "";

  router.push({
    path: "/transactions",
  });

  await fetchData();
};

const hapus = async (id: number) => {
  const yakin = confirm("Apakah anda yakin ingin menghapus data ini?");
  if (!yakin) return;

  await api.delete(`/transaksi/${id}/`);

  transactions.value = transactions.value.filter((item) => item.id !== id);
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  router.push("/login");
};

onMounted(() => {
  fetchData();
});
</script>
