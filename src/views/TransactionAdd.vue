<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Tambah Transaksi</h1>

      <FormTransaction
        v-model="form"
        mode="create"
        submit-text="Simpan Transaksi"
        cancel-to="/transactions"
        @submit="simpan"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import FormTransaction from "../components/FormTransaction.vue";
import Swal from "sweetalert2";
import { createTransaction } from "../services/transactionService";

const router = useRouter();
const now = new Date();

const currentDateTime =
  now.getFullYear() +
  "-" +
  String(now.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(now.getDate()).padStart(2, "0") +
  "T" +
  String(now.getHours()).padStart(2, "0") +
  ":" +
  String(now.getMinutes()).padStart(2, "0");

const form = reactive({
  tanggal_transaksi: currentDateTime,
  tipe_produk: "",
  jumlah: 1,
  tipe_pembayaran: "",
});

const simpan = async (data: any) => {
  try {
    await createTransaction(data);

    await Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Transaksi berhasil dibuat.",
      confirmButtonColor: "#16a34a",
    });

    router.push("/transactions");
  } catch (error: any) {
    console.log(error?.response || error);

    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: "Transaksi gagal disimpan.",
      confirmButtonColor: "#dc2626",
    });
  }
};
</script>
