export type DeviceStatus = 'online' | 'offline' | 'warning';

export type DeviceType = 'switch' | 'olt' | 'ont';

export interface Device {
    id: string
    type: DeviceType
    name: string
    ip: string
    status: DeviceStatus
    lastSeen: Date
    model: string
    firmware: string
    uptime: number
}
