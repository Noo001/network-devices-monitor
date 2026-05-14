<template>
  <div class="w-full font-nunito text-sm rounded-lg">
    <table class="min-w-full border-collapse">
      <thead>
      <tr class="border-b" style="border-bottom: 1px solid #E1E5EA59">
        <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
          Тип
        </th>
        <th @click="sortBy('name')" class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-50">
          Имя
          <span class="ml-1">{{ getSortIcon('name') }}</span>
        </th>
        <th @click="sortBy('ip')" class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-50">
          IP-адрес
          <span class="ml-1">{{ getSortIcon('ip') }}</span>
        </th>
        <th @click="sortBy('status')" class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-50">
          Статус
          <span class="ml-1">{{ getSortIcon('status') }}</span>
        </th>
        <th @click="sortBy('lastSeen')" class="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-50">
          Последняя активность
          <span class="ml-1">{{ getSortIcon('lastSeen') }}</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="device in store.paginatedDevices"
          :key="device.id"
          class="border-b hover:bg-[#F4F7FF] cursor-pointer"
          style="border-bottom: 1px solid #E1E5EA59"
          @click="$emit('view-details', device)"
      >
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
      </tr>
      </tbody>
    </table>
    <!-- Пагинация -->
    <div class="flex items-center justify-between mt-4 px-4 py-3 bg-white rounded-lg shadow">
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-600">Строк на странице:</span>
        <select
            :value="store.itemsPerPage"
            @change="store.setItemsPerPage(Number(($event.target as HTMLSelectElement).value))"
            class="px-2 py-1 border border-gray-300 rounded-lg text-sm"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <button
            @click="store.setCurrentPage(store.currentPage - 1)"
            :disabled="store.currentPage === 1"
            class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.75 10.5L5.25 7L8.75 3.5" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="flex gap-1">
          <button
              v-for="page in visiblePages"
              :key="page"
              @click="store.setCurrentPage(Number(page))"
              :class="[
          'w-8 h-8 rounded-lg text-sm font-medium',
          store.currentPage === page
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-50'
        ]"
          >
            {{ page }}
          </button>
        </div>

        <button
            @click="store.setCurrentPage(store.currentPage + 1)"
            :disabled="store.currentPage === store.totalPages"
            class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.25 10.5L8.75 7L5.25 3.5" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeviceStore } from '@/stores/device.store';
import { ref, computed } from 'vue';
import type { Device, DeviceType, DeviceStatus } from '@/types/device.types';

const store = useDeviceStore();
const sortField = ref<keyof Device>('name');
const sortOrder = ref<'asc' | 'desc'>('asc');

defineEmits<{
  (e: 'view-details', device: Device): void;
}>();

function sortBy(field: keyof Device) {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }
  store.setSort(sortField.value, sortOrder.value);
}

function getSortIcon(field: keyof Device): string {
  if (sortField.value !== field) return '↑↓';
  return sortOrder.value === 'asc' ? '↑' : '↓';
}

function getTypeLabel(type: DeviceType): string {
  const labels = {
    switch: 'Коммутатор',
    olt: 'OLT',
    ont: 'ONT',
  };
  return labels[type];
}

function getStatusLabel(status: DeviceStatus): string {
  const labels = {
    online: 'Онлайн',
    offline: 'Оффлайн',
    error: 'Ошибка',
  };
  return labels[status];
}

function getStatusClass(status: DeviceStatus): string {
  const classes = {
    online: 'px-2 py-1 text-xs rounded bg-green-100 text-green-800',
    offline: 'px-2 py-1 text-xs rounded bg-gray-100 text-gray-800',
    error: 'px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800',
  };
  return classes[status];
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString('ru-RU');
}


const visiblePages = computed<(number | string)[]>(() => {
  const total = Number(store.totalPages);
  const current = Number(store.currentPage);
  const delta = 2;
  const range: number[] = [];

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }

  const result: (number | string)[] = [1];
  if (range[0] > 2) result.push('...');
  result.push(...range);
  if (range[range.length - 1] < total - 1) result.push('...');
  if (total > 1) result.push(total);

  return result;
});
</script>
