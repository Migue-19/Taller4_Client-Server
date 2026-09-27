import { Router } from "express";
import { OrdersController } from "./orders.controller";

/**
 * Rutas del módulo de pedidos.
 *
 * @remarks
 * Define los endpoints HTTP del módulo y su documentación Swagger
 * (OpenAPI) mediante comentarios `@openapi`, que son leídos por
 * `swagger-jsdoc` desde `config/swagger.ts`.
 */
export class OrdersRoutes {

  /**
   * Devuelve el router del módulo de pedidos.
   *
   * @returns Router de Express con las rutas de pedidos
   */
  static get routes(): Router {
    const router = Router();
    const controller = new OrdersController();

    /**
     * @openapi
     * /api/orders/{countOrders}:
     *   get:
     *     summary: Obtener listado de pedidos
     *     description: Retorna una lista de pedidos generados dinámicamente con faker según la cantidad solicitada.
     *     tags:
     *       - Orders
     *     parameters:
     *       - in: path
     *         name: countOrders
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 100
     *           example: 10
     *         description: Cantidad de pedidos a generar (entero entre 1 y 100)
     *     responses:
     *       200:
     *         description: Lista de pedidos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Order'
     *       400:
     *         description: Parámetro inválido, la cantidad debe ser un entero entre 1 y 100
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get("/:countOrders", controller.getAllOrders);

    return router;
  }
}
