<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold text-red-500">
          Сетевые устройства
        </h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 px-4">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
