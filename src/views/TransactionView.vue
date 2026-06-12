<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-5">
      <h1 class="text-2xl font-bold">Data Transaksi</h1>

      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>

    <div class="flex gap-3 mb-5">
      <input type="date" v-model="fromDate" class="border rounded p-2" />

      <input type="date" v-model="toDate" class="border rounded p-2" />

      <button
        @click="fetchData"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Filter
      </button>

      <router-link
        to="/transactions/create"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        + Tambah Transaksi
      </router-link>
    </div>

    <table class="w-full border-collapse border">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">No</th>
          <th class="border p-2">Kode</th>
          <th class="border p-2">Tanggal</th>
          <th class="border p-2">Produk</th>
          <th class="border p-2">Qty</th>
          <th class="border p-2">Total</th>
          <th class="border p-2">Pembayaran</th>
          <th class="border p-2">Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in transactions" :key="item.id">
          <td class="border p-2">
            {{ index + 1 }}
          </td>

          <td class="border p-2">
            {{ item.kode }}
          </td>

          <td class="border p-2">
            {{ item.tanggal_transaksi?.split("T")[0] }}
          </td>

          <td class="border p-2">
            {{ item.tipe_produk }}
          </td>

          <td class="border p-2">
            {{ item.jumlah }}
          </td>

          <td class="border p-2">
            {{ item.total_harga }}
          </td>

          <td class="border p-2">
            {{ item.tipe_pembayaran }}
          </td>

          <td class="border p-2">
            <div class="flex gap-2">
              <router-link
                :to="`/transactions/${item.id}/edit`"
                class="text-blue-500"
              >
                Edit
              </router-link>

              <button @click="hapus(item.id)" class="text-red-500">
                Hapus
              </button>
            </div>
          </td>
        </tr>

        <tr v-if="transactions.length === 0">
          <td colspan="8" class="text-center p-4">Data tidak tersedia</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axios";

const router = useRouter();

interface Transaction {
  id: number;
  kode: string;
  tanggal_transaksi: string;
  tipe_produk: string;
  jumlah: number;
  total_harga: string;
  tipe_pembayaran: string;
}
const transactions = ref<Transaction[]>([]);

const fromDate = ref("");
const toDate = ref("");

const fetchData = async () => {
  try {
    const response = await api.get("/transaksi/", {
      params: {
        start_date: fromDate.value || undefined,
        end_date: toDate.value || undefined,
      },
    });

    transactions.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const hapus = async (id: number) => {
  const yakin = confirm("Apakah anda yakin ingin menghapus data ini?");

  if (!yakin) return;

  try {
    await api.delete(`/transaksi/${id}/`);

    transactions.value = transactions.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error(error);
  }
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
