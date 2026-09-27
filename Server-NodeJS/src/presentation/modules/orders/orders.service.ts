import { faker } from '@faker-js/faker';
import { CustomError } from '../../../domain/erros/custom.error';
import { Order, OrderStatus } from '../../../domain/interfaces/order.interface';

/**
 * Servicio encargado de la generación y gestión de pedidos.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar pedidos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class OrdersService {

  /**
   * Estados disponibles para los pedidos.
   *
   * @remarks
   * Se utiliza para asignar aleatoriamente un estado
   * a cada pedido generado.
   */
  private statuses: OrderStatus[] = [
    'Pendiente',
    'Enviado',
    'Entregado',
    'Cancelado',
  ];

  /**
   * Obtiene un listado de pedidos generados dinámicamente.
   *
   * @remarks
   * Valida que la cantidad solicitada sea un número entero entre 1 y 100.
   * Si no lo es, lanza un `CustomError` con código 400 que será procesado
   * por `HandleError` en el controlador.
   *
   * @param countOrders Cantidad de pedidos a generar
   * @returns Promesa que resuelve un arreglo de pedidos
   * @throws {CustomError} 400 si la cantidad no es un entero entre 1 y 100
   *
   * @example
   * ```ts
   * const orders = await ordersService.getAllOrders(10);
   * ```
   */
  public async getAllOrders(countOrders: number): Promise<Order[]> {
    if (!Number.isInteger(countOrders) || countOrders < 1 || countOrders > 100) {
      throw CustomError.badRequest('countOrders debe ser un entero entre 1 y 100');
    }

    const orders: Promise<Order>[] = [];

    for (let i = 1; i <= countOrders; i++) {
      orders.push(this.generateOrder(i));
    }

    return Promise.all(orders);
  }

  /**
   * Genera un pedido ficticio.
   *
   * @param id Identificador único del pedido
   * @returns Promesa que resuelve un pedido generado
   */
  private generateOrder(id: number): Promise<Order> {
    return Promise.resolve({
      id,
      customer: faker.person.fullName(),
      total: Number(
        faker.commerce.price({ min: 10, max: 500, dec: 2 })
      ),
      status: faker.helpers.arrayElement(this.statuses),
      date: faker.date.recent({ days: 30 }).toISOString(),
    });
  }
}
