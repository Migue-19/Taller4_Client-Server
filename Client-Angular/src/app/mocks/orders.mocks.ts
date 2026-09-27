import { Order } from "../interfaces/orders.interface";

/**
 * Datos de prueba de pedidos.
 *
 * @remarks
 * Se utiliza en las pruebas unitarias para simular la respuesta
 * del backend en `GET /api/orders/:countOrders`.
 */
export const ORDERS_MOCK: Order[] = [
    {
        id: 1,
        customer: 'María López',
        total: 149.99,
        status: 'Pendiente',
        date: '2026-03-15T10:30:00.000Z',
    },
    {
        id: 2,
        customer: 'Pedro Ruiz',
        total: 89.5,
        status: 'Entregado',
        date: '2026-03-10T15:45:00.000Z',
    }
];
