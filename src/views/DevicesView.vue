<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Сетевые устройства</h2>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <DeviceTable @view-details="handleViewDetails" />
    </div>

    <DeviceModal
        v-model:visible="modalVisible"
        :device="selectedDevice"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DeviceTable from '@/components/DeviceTable.vue';
import DeviceModal from '@/components/DeviceModal.vue';
import type { Device } from '@/types/device.types';

const modalVisible = ref(false);
const selectedDevice = ref<Device | null>(null);

function handleViewDetails(device: Device) {
  selectedDevice.value = device;
  modalVisible.value = true;
}
</script>
