<template>
  <div class="min-h-screen font-nunito" style="background-color: #FAFBFF">
    <main>
      <div class="mx-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
