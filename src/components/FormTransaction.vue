<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <Input
      type="datetime-local"
      v-model="form.tanggal_transaksi"
      label="Tanggal & Waktu"
    />

    <Select
      v-model="form.tipe_produk"
      label="Jenis Produk"
      :options="produkOptions"
    />

    <Input type="number" v-model="form.jumlah" label="Quantity" min="1" />

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-50 p-4 rounded-xl border">
        <p class="text-sm text-gray-500">Harga Satuan</p>
        <p class="font-semibold">Rp {{ hargaSatuan.toLocaleString() }}</p>
      </div>

      <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <p class="text-sm text-blue-600">Total</p>
        <p class="text-xl font-bold text-blue-700">
          Rp {{ totalHarga.toLocaleString() }}
        </p>
      </div>
    </div>

    <Select
      v-model="form.tipe_pembayaran"
      label="Tipe Pembayaran"
      :options="pembayaranOptions"
    />

    <div class="flex gap-3">
      <Button type="submit" variant="primary">
        {{ submitText }}
      </Button>

      <Button :to="cancelTo" variant="secondary"> Kembali </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
import Select from "./Select.vue";

type Form = {
  tanggal_transaksi: string;
  tipe_produk: string;
  jumlah: number;
  tipe_pembayaran: string;
};

const props = defineProps<{
  modelValue: Partial<Form>;
  submitText: string;
  cancelTo: string;
  mode: "create" | "edit";
}>();

const emit = defineEmits(["submit", "update:modelValue"]);

const form = reactive<Form>({
  tanggal_transaksi: "",
  tipe_produk: "",
  jumlah: 1,
  tipe_pembayaran: "",
});

watch(
  () => props.modelValue,
  (val) => {
    if (!val) return;

    Object.assign(form, {
      tanggal_transaksi: val.tanggal_transaksi ?? "",
      tipe_produk: val.tipe_produk ?? "",
      jumlah: val.jumlah ?? 1,
      tipe_pembayaran: val.tipe_pembayaran ?? "",
    });
  },
  { immediate: true },
);

watch(
  form,
  (val) => {
    emit("update:modelValue", { ...val });
  },
  { deep: true },
);

const hargaProduk: Record<string, number> = {
  oli: 20000,
  tambal_ban: 10000,
  asuransi: 15000,
};

const hargaSatuan = computed(() => {
  return hargaProduk[form.tipe_produk] || 0;
});

const totalHarga = computed(() => {
  return hargaSatuan.value * Number(form.jumlah || 0);
});

const produkOptions = [
  { label: "Oli", value: "oli" },
  { label: "Tambal Ban", value: "tambal_ban" },
  { label: "Asuransi", value: "asuransi" },
];

const pembayaranOptions = [
  { label: "Gopay", value: "gopay" },
  { label: "E-Money", value: "emoney" },
  { label: "ShopeePay", value: "shopee" },
  { label: "Cash", value: "cash" },
];

const handleSubmit = () => {
  emit("submit", { ...form });
};
</script>
