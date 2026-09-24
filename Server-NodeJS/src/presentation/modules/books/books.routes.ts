import { Router } from "express";
import { BooksController } from "./books.controller";

/**
 * Rutas del módulo de libros.
 *
 * @remarks
 * Define los endpoints HTTP del módulo y su documentación Swagger
 * (OpenAPI) mediante comentarios `@openapi`, que son leídos por
 * `swagger-jsdoc` desde `config/swagger.ts`.
 */
export class BooksRoutes {

  /**
   * Devuelve el router del módulo de libros.
   *
   * @returns Router de Express con las rutas de libros
   */
  static get routes(): Router {
    const router = Router();
    const controller = new BooksController();

    /**
     * @openapi
     * /api/books/{countBooks}:
     *   get:
     *     summary: Obtener listado de libros
     *     description: Retorna una lista de libros generados dinámicamente con faker según la cantidad solicitada.
     *     tags:
     *       - Books
     *     parameters:
     *       - in: path
     *         name: countBooks
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 100
     *           example: 10
     *         description: Cantidad de libros a generar (entero entre 1 y 100)
     *     responses:
     *       200:
     *         description: Lista de libros generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Book'
     *       400:
     *         description: Parámetro inválido, la cantidad debe ser un entero entre 1 y 100
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get("/:countBooks", controller.getAllBooks);

    return router;
  }
}
