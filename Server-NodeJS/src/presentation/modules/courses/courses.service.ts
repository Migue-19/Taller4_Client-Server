import { faker } from '@faker-js/faker';
import { CustomError } from '../../../domain/erros/custom.error';
import { Course, CourseModality } from '../../../domain/interfaces/course.interface';

/**
 * Servicio encargado de la generación y gestión de cursos.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar cursos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class CoursesService {

  /**
   * Nombres de asignaturas disponibles para los cursos.
   *
   * @remarks
   * Se utiliza para asignar aleatoriamente el nombre
   * a cada curso generado.
   */
  private courseNames: string[] = [
    'Arquitectura de Software',
    'Bases de Datos',
    'Calculo Diferencial',
    'Fisica Mecanica',
    'Programacion Web',
    'Estructuras de Datos',
  ];

  /**
   * Modalidades disponibles para los cursos.
   *
   * @remarks
   * Se utiliza para asignar aleatoriamente una modalidad
   * a cada curso generado.
   */
  private modalities: CourseModality[] = [
    'Presencial',
    'Virtual',
    'Hibrido',
  ];

  /**
   * Obtiene un listado de cursos generados dinámicamente.
   *
   * @remarks
   * Valida que la cantidad solicitada sea un número entero entre 1 y 100.
   * Si no lo es, lanza un `CustomError` con código 400 que será procesado
   * por `HandleError` en el controlador.
   *
   * @param countCourses Cantidad de cursos a generar
   * @returns Promesa que resuelve un arreglo de cursos
   * @throws {CustomError} 400 si la cantidad no es un entero entre 1 y 100
   *
   * @example
   * ```ts
   * const courses = await coursesService.getAllCourses(10);
   * ```
   */
  public async getAllCourses(countCourses: number): Promise<Course[]> {
    if (!Number.isInteger(countCourses) || countCourses < 1 || countCourses > 100) {
      throw CustomError.badRequest('countCourses debe ser un entero entre 1 y 100');
    }

    const courses: Promise<Course>[] = [];

    for (let i = 1; i <= countCourses; i++) {
      courses.push(this.generateCourse(i));
    }

    return Promise.all(courses);
  }

  /**
   * Genera un curso ficticio.
   *
   * @param id Identificador único del curso
   * @returns Promesa que resuelve un curso generado
   */
  private generateCourse(id: number): Promise<Course> {
    return Promise.resolve({
      id,
      name: faker.helpers.arrayElement(this.courseNames),
      teacher: faker.person.fullName(),
      credits: faker.number.int({ min: 1, max: 4 }),
      modality: faker.helpers.arrayElement(this.modalities),
    });
  }
}
