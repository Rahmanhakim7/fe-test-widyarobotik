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
import FormTransaction from "../components/FormTransaction.vue";
import Swal from "sweetalert2";
import {
  getTransactionDetail,
  updateTransaction,
} from "../services/transactionService";

const route = useRoute();
const router = useRouter();
const id = String(route.params.id);
const ready = ref(false);

const form = reactive({
  tanggal_transaksi: "",
  tipe_produk: "",
  jumlah: 1,
  tipe_pembayaran: "",
});

const getDetail = async () => {
  try {
    const res = await getTransactionDetail(id);
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

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal mengambil data transaksi.",
    });
  }
};

const updateData = async (data: any) => {
  try {
    await updateTransaction(id, data);
    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data transaksi berhasil diperbarui.",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push("/transactions");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Data transaksi gagal diperbarui.",
    });
  }
};

onMounted(() => {
  getDetail();
});
</script>
