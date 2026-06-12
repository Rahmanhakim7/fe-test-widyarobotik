<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, isAuthenticated } from "../services/authService";
import { onMounted } from "vue";

const router = useRouter();

const username = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

onMounted(() => {
  if(isAuthenticated()) {
    router.push("/transactions");
  }
})

const handleLogin = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    await login({
      username: username.value.trim(),
      password: password.value,
    });

    router.push("/transactions");
  } catch (error) {
    errorMessage.value = "Username atau password salah";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-zinc-800">Login</h1>
        <p class="mt-2 text-zinc-500">Selamat datang di aplikasi transaksi</p>
      </div>

      <div
        v-if="errorMessage"
        class="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
      >
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="mb-2 block text-sm font-medium text-zinc-700">
            Username
          </label>

          <input
            v-model="username"
            type="text"
            placeholder="Masukkan username"
            class="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
            required
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-zinc-700">
            Password
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Masukkan password"
            class="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ loading ? "Loading..." : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>
