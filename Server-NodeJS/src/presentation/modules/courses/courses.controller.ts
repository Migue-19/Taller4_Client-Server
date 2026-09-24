import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { CoursesService } from "./courses.service";

/**
 * Controlador de cursos.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con cursos,
 * delegando la lógica de negocio al `CoursesService`.
 */
export class CoursesController {

  /**
   * Servicio de cursos.
   */
  private readonly coursesService = new CoursesService();

  /**
   * Maneja la petición HTTP para obtener un listado de cursos.
   *
   * @remarks
   * El número de cursos a generar se obtiene desde los
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
   * GET /api/courses/10
   * ```
   */
  getAllCourses = (req: Request, res: Response): void => {
    const { countCourses } = req.params;

    setTimeout(() => {
      this.coursesService
      .getAllCourses(Number(countCourses))
      .then((courses) => res.status(200).json(courses))
      .catch((error) => HandleError.error(error, res));
    }, 3000);
  };
}
