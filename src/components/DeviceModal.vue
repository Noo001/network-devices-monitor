<template>
  <div
      v-if="visible"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click="handleOverlayClick"
  >
    <div
        class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4"
        @click.stop
    >
      <div class="flex justify-between items-center px-6 pt-6 pb-2">
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

      <div class="px-6 py-4" v-if="device">
        <div class="grid grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <label class="text-sm text-gray-500">Тип</label>
            <div v-if="!isEditing" class="text-gray-900">{{ getTypeLabel(device.type) }}</div>
            <select v-else v-model="editedDevice.type" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="switch">Коммутатор</option>
              <option value="olt">OLT</option>
              <option value="ont">ONT</option>
            </select>
          </div>

          <div>
            <label class="text-sm text-gray-500">Имя</label>
            <div v-if="!isEditing" class="text-gray-900">{{ device.name }}</div>
            <input v-else v-model="editedDevice.name" class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label class="text-sm text-gray-500">IP-адрес</label>
            <div v-if="!isEditing" class="text-gray-900">{{ device.ip }}</div>
            <input v-else v-model="editedDevice.ip" class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label class="text-sm text-gray-500">Статус</label>
            <div v-if="!isEditing" class="text-gray-900">{{ getStatusLabel(device.status) }}</div>
            <select v-else v-model="editedDevice.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="online">Онлайн</option>
              <option value="offline">Оффлайн</option>
              <option value="warning">Предупреждение</option>
            </select>
          </div>

          <div>
            <label class="text-sm text-gray-500">Модель</label>
            <div v-if="!isEditing" class="text-gray-900">{{ device.model }}</div>
            <input v-else v-model="editedDevice.model" class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label class="text-sm text-gray-500">Прошивка</label>
            <div v-if="!isEditing" class="text-gray-900">{{ device.firmware }}</div>
            <input v-else v-model="editedDevice.firmware" class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label class="text-sm text-gray-500">Последнее появление</label>
            <div class="text-gray-900">{{ formatDate(device.lastSeen) }}</div>
          </div>

          <div>
            <label class="text-sm text-gray-500">Uptime</label>
            <div class="text-gray-900">{{ formatUptime(device.uptime) }}</div>
          </div>
        </div>
      </div>

      <div class="px-6 pb-6 pt-2">
        <button
            v-if="!isEditing"
            @click="startEditing"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Редактировать
        </button>

        <div v-else class="flex gap-4">
          <button
              @click="cancelEditing"
              class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Отмена
          </button>
          <button
              @click="saveChanges"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Device, DeviceType, DeviceStatus } from '@/types/device.types';

const props = defineProps<{
  visible: boolean;
  device: Device | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'save', device: Device): void;
}>();

const isEditing = ref(false);
const editedDevice = ref<Partial<Device>>({});

function startEditing() {
  if (props.device) {
    editedDevice.value = { ...props.device };
    isEditing.value = true;
  }
}

function cancelEditing() {
  isEditing.value = false;
  editedDevice.value = {};
}

function saveChanges() {
  if (props.device && editedDevice.value) {
    emit('save', { ...props.device, ...editedDevice.value });
    isEditing.value = false;
    close();
  }
}

function close() {
  isEditing.value = false;
  emit('update:visible', false);
}

function handleOverlayClick() {
  close();
}

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
