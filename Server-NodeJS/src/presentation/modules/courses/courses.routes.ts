import { Router } from "express";
import { CoursesController } from "./courses.controller";

/**
 * Rutas del módulo de cursos.
 *
 * @remarks
 * Define los endpoints HTTP del módulo y su documentación Swagger
 * (OpenAPI) mediante comentarios `@openapi`, que son leídos por
 * `swagger-jsdoc` desde `config/swagger.ts`.
 */
export class CoursesRoutes {

  /**
   * Devuelve el router del módulo de cursos.
   *
   * @returns Router de Express con las rutas de cursos
   */
  static get routes(): Router {
    const router = Router();
    const controller = new CoursesController();

    /**
     * @openapi
     * /api/courses/{countCourses}:
     *   get:
     *     summary: Obtener listado de cursos
     *     description: Retorna una lista de cursos generados dinámicamente con faker según la cantidad solicitada.
     *     tags:
     *       - Courses
     *     parameters:
     *       - in: path
     *         name: countCourses
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 100
     *           example: 10
     *         description: Cantidad de cursos a generar (entero entre 1 y 100)
     *     responses:
     *       200:
     *         description: Lista de cursos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Course'
     *       400:
     *         description: Parámetro inválido, la cantidad debe ser un entero entre 1 y 100
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get("/:countCourses", controller.getAllCourses);

    return router;
  }
}
