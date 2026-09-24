import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../components/alert/alert.component';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { Order } from '../../interfaces/orders.interface';
import { State } from '../../interfaces/state.interface';
import { OrdersService } from '../../services/orders/orders.service';

/**
 * Componente contenedor de pedidos.
 *
 * Se utiliza para gestionar y mostrar un listado de pedidos
 * utilizando el componente `OrdersTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `OrdersService`
 * para obtener los pedidos y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  imports: [OrdersTableComponent, AlertComponent],
})
export class OrdersPage {
  /**
   * Listado de pedidos obtenidos desde el servicio.
   * @type {Order[]}
   */
  orders: Order[] = [];
  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener pedidos.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private ordersService = inject(OrdersService);

  /**
   * Inicializa el componente y carga los pedidos.
   * @remarks
   * Se suscribe al método `getAllOrders()` del servicio y
   * asigna los datos recibidos a la propiedad `orders`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.ordersService.getAllOrders(10).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }
}
