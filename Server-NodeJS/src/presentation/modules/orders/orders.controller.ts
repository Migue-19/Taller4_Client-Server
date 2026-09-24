import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { OrdersService } from "./orders.service";

/**
 * Controlador de pedidos.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con pedidos,
 * delegando la lógica de negocio al `OrdersService`.
 */
export class OrdersController {

  /**
   * Servicio de pedidos.
   */
  private readonly ordersService = new OrdersService();

  /**
   * Maneja la petición HTTP para obtener un listado de pedidos.
   *
   * @remarks
   * El número de pedidos a generar se obtiene desde los
   * parámetros de la ruta. Se mantiene un retardo de 3 segundos que
   * simula la latencia de una consulta real, de modo que el cliente
   * pueda mostrar su estado de carga. Responde con código 200 cuando
   * la operación es exitosa y con el código del error cuando falla
   * (por ejemplo 400 si la cantidad no es válida).
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/orders/10
   * ```
   */
  getAllOrders = (req: Request, res: Response): void => {
    const { countOrders } = req.params;

    setTimeout(() => {
      this.ordersService
      .getAllOrders(Number(countOrders))
      .then((orders) => res.status(200).json(orders))
      .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}
