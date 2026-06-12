<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Tambah Transaksi</h1>

    <form @submit.prevent="simpan">
      <div class="mb-4">
        <label class="block mb-2"> Tanggal & Waktu Transaksi </label>

        <input
          type="datetime-local"
          v-model="form.tanggal_transaksi"
          class="border p-2 w-full"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block mb-2"> Jenis Produk </label>

        <select v-model="form.tipe_produk" class="border p-2 w-full">
          <option value="">Pilih Produk</option>
          <option value="oli">Oli (harga: 20000)</option>
          <option value="tambal_ban">Tambal Ban (harga: 10000)</option>
          <option value="asuransi">Asuransi (harga: 15000)</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block mb-2"> Quantitas </label>

        <input
          type="number"
          min="1"
          v-model="form.jumlah"
          class="border p-2 w-full"
        />
      </div>
      <div class="mb-4">
        <label class="block mb-2"> Harga Satuan </label>
        <input
          type="text"
          :value="hargaSatuan"
          readonly
          class="border p-2 w-full bg-gray-100"
        />
      </div>
      <div class="mb-4">
        <label class="block mb-2"> Total Harga </label>

        <input
          type="text"
          :value="totalHarga"
          readonly
          class="border p-2 w-full bg-gray-100"
        />
      </div>

      <div class="mb-6">
        <label class="block mb-2"> Tipe Pembayaran </label>

        <select v-model="form.tipe_pembayaran" class="border p-2 w-full">
          <option value="">Pilih Pembayaran</option>

          <option value="gopay">Gopay</option>

          <option value="emoney">E-Money</option>

          <option value="shopee">Shopee</option>

          <option value="cash">Cash</option>
        </select>
      </div>

      <div class="flex gap-3">
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
          Simpan
        </button>

        <router-link
          to="/transactions"
          class="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Kembali
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axios";

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

const hargaProduk: Record<string, number> = {
  oli: 20000,
  tambal_ban: 10000,
  asuransi: 15000,
};

const hargaSatuan = computed(() => {
  return hargaProduk[form.tipe_produk] || 0;
});

const totalHarga = computed(() => {
  return hargaSatuan.value * form.jumlah;
});

const simpan = async () => {
  try {
    const response = await api.post("/transaksi/", {
      tanggal_transaksi: form.tanggal_transaksi,
      tipe_produk: form.tipe_produk,
      jumlah: form.jumlah,
      tipe_pembayaran: form.tipe_pembayaran,
    });

    console.log(response.data);

    alert("Transaksi berhasil dibuat");
    router.push("/transactions");
  } catch (error: any) {
    console.log(error.response);
    console.log(error.response?.data);
    console.log(error.response?.status);

    alert("Gagal menyimpan transaksi");
  }
};
</script>
