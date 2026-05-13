<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Сетевые устройства</h2>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <DeviceTable @view-details="handleViewDetails" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DeviceTable from '@/components/DeviceTable.vue';
import type { Device } from '@/types/device.types';

function handleViewDetails(device: Device) {
  console.log('Просмотр деталей:', device);
}
</script>

