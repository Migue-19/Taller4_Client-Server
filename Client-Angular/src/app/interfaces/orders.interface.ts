/**
 * Interfaz que representa un pedido.
 *
 * Contiene la información básica necesaria para mostrar un pedido
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada pedido debe tener un `id` único y un valor válido en el campo
 * `status` (estado). Coincide con el modelo que envía el
 * servidor en `GET /api/orders/:countOrders`.
 *
 * @example
 * ```ts
 * const order: Order = {
 *   id: 1,
 *   customer: 'María López',
 *   total: 149.99,
 *   status: 'Pendiente',
 *   date: '2026-03-15T10:30:00.000Z',
 * };
 * ```
 */
export interface Order {
    /** Identificador único del pedido */
    id: number;

    /** Nombre completo del cliente que realizó el pedido */
    customer: string;

    /** Valor total del pedido */
    total: number;

    /** Estado actual del pedido */
    status: OrderStatus;

    /** Fecha del pedido en formato ISO 8601 */
    date: string;
}

/**
 * Tipo de estado de un pedido.
 *
 * @remarks
 * Este tipo restringe el campo `status` a los valores predefinidos:
 * - 'Pendiente'
 * - 'Enviado'
 * - 'Entregado'
 * - 'Cancelado'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const status: OrderStatus = 'Pendiente';
 * ```
 */
export type OrderStatus = 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';
