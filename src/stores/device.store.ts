import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Device, DeviceType } from '@/types/device.types';
import { mockDevices } from '@/mocks/devices.mock';

export const useDeviceStore = defineStore('device', () => {
    const devices = ref<Device[]>([...mockDevices]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const selectedType = ref<DeviceType | ''>('');
    const searchQuery = ref<string>('');

    const currentPage = ref<number>(1);
    const itemsPerPage = ref<number>(10);

    const sortField = ref<keyof Device>('name');
    const sortOrder = ref<'asc' | 'desc'>('asc');

    const filteredDevices = computed(() => {
        let result = devices.value;

        // Фильтр по типу
        if (selectedType.value) {
            result = result.filter(device => device.type === selectedType.value);
        }

        // Поиск по имени или IP
        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase();
            result = result.filter(device =>
                device.name.toLowerCase().includes(query) ||
                device.ip.includes(query)
            );
        }

        return result;
    });

    const totalPages = computed(() => {
        return Math.ceil(filteredDevices.value.length / itemsPerPage.value);
    });

    const paginatedDevices = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return sortedDevices.value.slice(start, end);
    });

    function setSelectedType(type: DeviceType | '') {
        selectedType.value = type;
        currentPage.value = 1; // Сброс на первую страницу
    }

    function setSearchQuery(query: string) {
        searchQuery.value = query;
        currentPage.value = 1;
    }

    function setCurrentPage(page: number) {
        currentPage.value = page;
    }

    function updateDevice(device: Device) {
        const index = devices.value.findIndex(dev => dev.id === device.id);
        if(index > -1) {
            devices.value[index] = {...device};
        }
    }

    function setItemsPerPage(perPage: number) {
        itemsPerPage.value = perPage;
        currentPage.value = 1;
    }

    const sortedDevices = computed(() => {
        const result = [...filteredDevices.value];
        if (sortField.value) {
            result.sort((a, b) => {
                let aVal = a[sortField.value];
                let bVal = b[sortField.value];

                if (sortField.value === 'lastSeen') {
                    aVal = new Date(aVal).getTime();
                    bVal = new Date(bVal).getTime();
                }

                if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return result;
    });

    function setSort(field: keyof Device, order: 'asc' | 'desc') {
        sortField.value = field;
        sortOrder.value = order;
        currentPage.value = 1;
    }

    return {
        devices,
        loading,
        error,
        selectedType,
        searchQuery,
        currentPage,
        itemsPerPage,

        filteredDevices,
        totalPages,
        paginatedDevices,
        updateDevice,

        setSort,
        setSelectedType,
        setSearchQuery,
        setCurrentPage,
        setItemsPerPage,
    };
});
