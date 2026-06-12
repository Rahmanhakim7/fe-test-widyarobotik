<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-2xl font-bold mb-6">Edit Transaksi</h1>
      <FormTransaction
        v-if="ready"
        v-model="form"
        mode="edit"
        submit-text="Update Transaksi"
        cancel-to="/transactions"
        @submit="updateData"
      />

      <div v-else class="text-center text-gray-500">Loading data...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api/axios";

import FormTransaction from "../components/FormTransaction.vue";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const ready = ref(false);

const form = reactive({
  tanggal_transaksi: "",
  tipe_produk: "",
  jumlah: 1,
  tipe_pembayaran: "",
});

const getDetail = async () => {
  try {
    const res = await api.get(`/transaksi/${id}/`);
    const data = res.data.data;

    Object.assign(form, {
      tanggal_transaksi: data.tanggal_transaksi?.slice(0, 16),
      tipe_produk: data.tipe_produk,
      jumlah: data.jumlah,
      tipe_pembayaran: data.tipe_pembayaran,
    });

    ready.value = true;
  } catch (error) {
    console.log(error);
    alert("Gagal mengambil data");
  }
};

const updateData = async (data: any) => {
  try {
    await api.put(`/transaksi/${id}/`, data);

    alert("Berhasil update");
    router.push("/transactions");
  } catch (error) {
    alert("Gagal update");
  }
};

onMounted(() => {
  getDetail();
});
</script>
