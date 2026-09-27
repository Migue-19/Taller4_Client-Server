/**
 * Interfaz que representa un pedido del sistema.
 *
 * Contiene la información básica que el servidor genera y envía al cliente
 * para mostrarla en una tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada pedido debe tener un `id` único y un valor válido en el campo
 * `status` (estado).
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
 * @example
 * ```ts
 * const status: OrderStatus = 'Pendiente';
 * ```
 */
export type OrderStatus = 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';
