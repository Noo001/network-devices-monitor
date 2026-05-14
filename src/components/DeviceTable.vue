<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
      <tr class="bg-gray-50 border-b">
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Тип
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Имя
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          IP-адрес
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Статус
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Последнее появление
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Действия
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="device in store.paginatedDevices" :key="device.id" class="border-b hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap">
          {{ getTypeLabel(device.type) }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          {{ device.name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          {{ device.ip }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span :class="getStatusClass(device.status)">
              {{ getStatusLabel(device.status) }}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          {{ formatDate(device.lastSeen) }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <button
              @click="$emit('view-details', device)"
              class="text-blue-600 hover:text-blue-800"
          >
            Подробнее
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useDeviceStore } from '@/stores/device.store';
import type { Device, DeviceType, DeviceStatus } from '@/types/device.types';

const store = useDeviceStore();

defineEmits<{
  (e: 'view-details', device: Device): void;
}>();

function getTypeLabel(type: DeviceType): string {
  const labels = {
    switch: 'Коммутатор',
    olt: 'OLT',
    ont: 'ONT',
  };
  return labels[type];
}

function getTypeClass(type: DeviceType): string {
  const classes = {
    switch: 'px-2 py-1 text-xs rounded bg-blue-100 text-blue-800',
    olt: 'px-2 py-1 text-xs rounded bg-purple-100 text-purple-800',
    ont: 'px-2 py-1 text-xs rounded bg-green-100 text-green-800',
  };
  return classes[type];
}

function getStatusLabel(status: DeviceStatus): string {
  const labels = {
    online: 'Онлайн',
    offline: 'Оффлайн',
    warning: 'Предупреждение',
  };
  return labels[status];
}

function getStatusClass(status: DeviceStatus): string {
  const classes = {
    online: 'px-2 py-1 text-xs rounded bg-green-100 text-green-800',
    offline: 'px-2 py-1 text-xs rounded bg-gray-100 text-gray-800',
    warning: 'px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800',
  };
  return classes[status];
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString('ru-RU');
}
</script>
