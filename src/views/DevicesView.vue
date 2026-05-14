<template>
  <div class="pt-5 px-5">
    <div class="bg-white rounded-xl shadow mb-5 p-3">
      <div class="flex items-center gap-4">
        <div class="flex-1 relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 17.5L13.7616 13.755M15.8333 8.74999C15.8333 10.6286 15.087 12.4303 13.7586 13.7587C12.4303 15.087 10.6286 15.8333 8.74996 15.8333C6.87134 15.8333 5.06967 15.087 3.74129 13.7587C2.4129 12.4303 1.66663 10.6286 1.66663 8.74999C1.66663 6.87137 2.4129 5.0697 3.74129 3.74132C5.06967 2.41293 6.87134 1.66666 8.74996 1.66666C10.6286 1.66666 12.4303 2.41293 13.7586 3.74132C15.087 5.0697 15.8333 6.87137 15.8333 8.74999Z" stroke="#6B727E" stroke-width="1.66667" stroke-linecap="round"/>
            </svg>
          </div>
          <input
              type="text"
              placeholder="Введите имя"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div class="relative">
          <button
              @click="isTypeMenuOpen = !isTypeMenuOpen"
              class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.33309 11.3333C5.33304 11.4572 5.3675 11.5787 5.43262 11.6841C5.49774 11.7895 5.59094 11.8746 5.70176 11.93L7.03509 12.5967C7.13676 12.6475 7.24972 12.6714 7.36326 12.6663C7.47679 12.6612 7.58712 12.6271 7.68378 12.5673C7.78044 12.5075 7.8602 12.424 7.91551 12.3247C7.97081 12.2254 7.99981 12.1137 7.99976 12V7.33333C7.99991 7.00292 8.12274 6.68433 8.34443 6.43933L13.1598 1.11333C13.2461 1.01771 13.3028 0.899122 13.3232 0.771922C13.3435 0.644723 13.3265 0.514355 13.2744 0.396583C13.2222 0.278812 13.137 0.178682 13.0291 0.108301C12.9212 0.0379205 12.7952 0.000303823 12.6664 0H0.666426C0.537498 4.65483e-05 0.411349 0.0374771 0.303259 0.107758C0.19517 0.178038 0.109779 0.278153 0.0574294 0.395975C0.00507957 0.513798 -0.0119828 0.644272 0.00830942 0.771594C0.0286016 0.898916 0.0853774 1.01762 0.17176 1.11333L4.98843 6.43933C5.21012 6.68433 5.33294 7.00292 5.33309 7.33333V11.3333Z" fill="#6B727E"/>
            </svg>
            <span>Тип устройства</span>
          </button>

          <div v-if="isTypeMenuOpen" class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div
                @click="selectType('')"
                class="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              Все типы
            </div>
            <div
                @click="selectType('switch')"
                class="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              Коммутатор
            </div>
            <div
                @click="selectType('olt')"
                class="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              OLT
            </div>
            <div
                @click="selectType('ont')"
                class="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              ONT
            </div>
          </div>
        </div>

        <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.46333 0.122333C1.95667 0.0553333 2.666 0 3.66667 0C4.66733 0 5.37667 0.0553333 5.87 0.122333C6.7 0.235667 7.23167 0.896333 7.28167 1.683C7.31033 2.132 7.33333 2.77067 7.33333 3.66667C7.33333 4.56267 7.31033 5.20133 7.28167 5.65033C7.23167 6.437 6.7 7.09767 5.86967 7.211C5.37667 7.278 4.66767 7.33333 3.66667 7.33333C2.66567 7.33333 1.95667 7.278 1.46333 7.211C0.633333 7.09767 0.102 6.43667 0.052 5.65C0.023 5.20133 0 4.56267 0 3.66667C0 2.77067 0.023 2.132 0.0516667 1.683C0.101667 0.896333 0.633333 0.235667 1.46333 0.122333ZM1.46333 15.5443C1.95667 15.6113 2.66567 15.6667 3.66667 15.6667C4.66767 15.6667 5.37667 15.6113 5.87 15.5443C6.7 15.431 7.23167 14.7703 7.28167 13.9837C7.31033 13.5347 7.33333 12.896 7.33333 12C7.33333 11.104 7.31033 10.4653 7.28167 10.0163C7.23167 9.22967 6.7 8.569 5.86967 8.45567C5.37667 8.38867 4.66767 8.33333 3.66667 8.33333C2.66567 8.33333 1.95667 8.38867 1.46333 8.45567C0.633333 8.569 0.102 9.23 0.052 10.0167C0.023 10.4653 0 11.104 0 12C0 12.896 0.023 13.5347 0.0516667 13.9837C0.101667 14.7703 0.633333 15.431 1.46333 15.5443ZM15.6667 12C15.6667 13.001 15.6113 13.71 15.5443 14.2033C15.431 15.0333 14.7703 15.565 13.9837 15.615C13.5347 15.6437 12.896 15.6667 12 15.6667C11.104 15.6667 10.4653 15.6437 10.0163 15.615C9.22967 15.565 8.569 15.033 8.45567 14.203C8.38867 13.71 8.33333 13.001 8.33333 12C8.33333 10.999 8.38867 10.29 8.45567 9.79667C8.569 8.96667 9.22967 8.435 10.0163 8.385C10.4653 8.35633 11.104 8.33333 12 8.33333C12.896 8.33333 13.5347 8.35633 13.9837 8.385C14.7703 8.435 15.431 8.96667 15.5443 9.797C15.6113 10.29 15.6667 10.999 15.6667 12ZM11.269 0.461333C11.585 -0.116333 12.415 -0.116333 12.731 0.461333L13.395 1.67533C13.5327 1.92705 13.7396 2.13401 13.9913 2.27167L15.2053 2.93567C15.783 3.25167 15.783 4.08167 15.2053 4.39767L13.9913 5.06167C13.7396 5.19932 13.5327 5.40628 13.395 5.658L12.731 6.872C12.415 7.44967 11.585 7.44967 11.269 6.872L10.605 5.658C10.4673 5.40628 10.2604 5.19932 10.0087 5.06167L8.79467 4.39767C8.217 4.08167 8.217 3.25167 8.79467 2.93567L10.0087 2.27167C10.2604 2.13401 10.4673 1.92705 10.605 1.67533L11.269 0.461333Z" fill="white"/>
          </svg>
          <span>Сгенерировать много строк</span>
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg overflow-hidden">
      <DeviceTable @view-details="handleViewDetails" />
    </div>

    <DeviceModal
        v-model:visible="modalVisible"
        :device="selectedDevice"
        @save="handleSaveDevice"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import DeviceTable from '@/components/DeviceTable.vue';
import DeviceModal from '@/components/DeviceModal.vue';
import type {Device, DeviceType} from '@/types/device.types';
import { useDeviceStore } from '@/stores/device.store';

const modalVisible = ref(false);
const selectedDevice = ref<Device | null>(null);
const store = useDeviceStore();

const isTypeMenuOpen = ref(false);

function selectType(type: DeviceType | '') {
  store.setSelectedType(type);
  isTypeMenuOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    isTypeMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleViewDetails(device: Device) {
  selectedDevice.value = device;
  modalVisible.value = true;
}

function handleSaveDevice(updatedDevice: Device) {
  store.updateDevice(updatedDevice);
}
</script>
