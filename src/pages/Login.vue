<script setup>
  import {ref} from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/user';

  const store = useUserStore();
  const router = useRouter();

  const email = ref('');
  const password = ref('');

  const handleLogin = () => {
    store.login(email.value, password.value);
  }
</script>
<template>
  <main class="container mx-auto mt-12 text-center">
    <div>
      <h2 class="text-3xl font-bold mb-4">Iniciar Sesión</h2>
      <div class="space-y-4">
        <div class="flex justify-center gap-x-2 items-center">
          <label for="email" class="font-bold uppercase text-sm">Email</label>
          <input type="email" v-model="email" id="email" class="p-1 border border-slate-400 rounded-md outline-none" />
        </div>
        <div class="flex justify-center gap-x-2 items-center">
          <label for="password" class="font-bold uppercase text-sm">Contraseña</label>
          <input type="password" v-model="password" id="password" class="p-1 border border-slate-400 rounded-md outline-none" />
        </div>
      </div>
      <div class="flex gap-x-2 justify-center mt-4">
        <button @click="handleLogin" class="py-2 px-4 bg-indigo-900 text-white rounded-xl uppercase text-sm">Ingresar</button>
      </div>
    </div>
  </main>
</template>
