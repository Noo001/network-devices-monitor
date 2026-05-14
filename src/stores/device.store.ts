import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {Device, DeviceStatus, DeviceType} from '@/types/device.types';
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

        if (selectedType.value) {
            result = result.filter(device => device.type === selectedType.value);
        }

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

    let intervalId: ReturnType<typeof setInterval> | null = null;

    function startRealtimeUpdates() {
        if (intervalId) clearInterval(intervalId);

        intervalId = setInterval(() => {
            devices.value = devices.value.map(device => {
                const random = Math.random();
                if (random < 0.3) {
                    const statuses: DeviceStatus[] = ['online', 'offline', 'error'];
                    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                    return { ...device, status: newStatus, lastSeen: new Date() };
                }
                return device;
            });
        }, 5000);
    }

    function stopRealtimeUpdates() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    startRealtimeUpdates();

    function generateManyRows() {
        loading.value = true;

        setTimeout(() => {
            const types: DeviceType[] = ['switch', 'olt', 'ont'];
            const statuses: DeviceStatus[] = ['online', 'offline', 'error'];

            const newDevices: Device[] = [];
            for (let i = 0; i < 100000; i++) {
                newDevices.push({
                    id: `generated-${i}`,
                    type: types[Math.floor(Math.random() * types.length)],
                    name: `Device ${i}`,
                    ip: `192.168.${Math.floor(i / 256)}.${i % 256}`,
                    status: statuses[Math.floor(Math.random() * statuses.length)],
                    lastSeen: new Date(),
                    model: `Model ${Math.floor(Math.random() * 100)}`,
                    firmware: `v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
                    uptime: Math.floor(Math.random() * 864000),
                });
            }

            devices.value = newDevices;
            loading.value = false;
            currentPage.value = 1;
        }, 100);
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

        startRealtimeUpdates,
        stopRealtimeUpdates,
        generateManyRows,
    };
});
