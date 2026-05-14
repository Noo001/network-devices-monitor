<template>
  <!-- фон -->
  <div
      v-if="visible"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click="handleOverlayClick"
  >
    <div
        class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
        @click.stop
    >
      <div class="flex justify-between items-center px-6 py-4 border-b">
        <h3 class="text-lg font-semibold text-gray-900">
          Детали устройства
        </h3>
        <button
            @click="close"
            class="text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>

      <!-- -------------- -->
      <div class="px-6 py-4" v-if="device">
        <div class="space-y-3">
          <div>
            <span class="text-sm text-gray-500">Тип:</span>
            <span class="ml-2 text-gray-900">{{ getTypeLabel(device.type) }}</span>
          </div>
          <div>
            <span class="text-sm text-gray-500">Имя:</span>
            <span class="ml-2 text-gray-900">{{ device.name }}</span>
          </div>
          <div>
            <span class="text-sm text-gray-500">IP-адрес:</span>
            <span class="ml-2 text-gray-900">{{ device.ip }}</span>
          </div>
          <div>
            <span class="text-sm text-gray-500">Статус:</span>
            <span :class="getStatusClass(device.status)" class="ml-2 px-2 py-0.5 text-xs rounded">
              {{ getStatusLabel(device.status) }}
            </span>
          </div>
          <div>
            <span class="text-sm text-gray-500">Последнее появление:</span>
            <span class="ml-2 text-gray-900">{{ formatDate(device.lastSeen) }}</span>
          </div>
          <div>
            <span class="text-sm text-gray-500">Модель:</span>
            <span class="ml-2 text-gray-900">{{ device.model }}</span>
          </div>
          <div>
            <span class="text-sm text-gray-500">Прошивка:</span>
            <span class="ml-2 text-gray-900">{{ device.firmware }}</span>
          </div>
          <div>
            <span class="text-sm text-gray-500">Uptime:</span>
            <span class="ml-2 text-gray-900">{{ formatUptime(device.uptime) }}</span>
          </div>
        </div>
      </div>
      <!-- -------------- -->
      <div class="px-6 py-4 border-t flex justify-end">
        <button
            @click="close"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import type { Device, DeviceType, DeviceStatus } from '@/types/device.types';

const props = defineProps<{
  visible: boolean;
  device: Device | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
}>();

function close() {
  emit('update:visible', false);
}

function handleOverlayClick() {
  close();
}

// Закрытие по Escape
watch(() => props.visible, (newVal) => {
  if (newVal) {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }
});

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
    warning: 'Предупреждение',
  };
  return labels[status];
}

function getStatusClass(status: DeviceStatus): string {
  const classes = {
    online: 'bg-green-100 text-green-800',
    offline: 'bg-gray-100 text-gray-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };
  return classes[status];
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString('ru-RU');
}

function formatUptime(seconds: number): string {
  if (seconds === 0) return 'Недоступно';

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts = [];
  if (days > 0) parts.push(`${days}д`);
  if (hours > 0) parts.push(`${hours}ч`);
  if (minutes > 0) parts.push(`${minutes}м`);

  return parts.join(' ') || '< 1м';
}
</script>
