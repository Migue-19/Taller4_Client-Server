import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/courses.interface';

/**
 * Servicio encargado de la gestión de cursos.
 *
 * Proporciona métodos para obtener información de cursos
 * desde la API REST.
 *
 * @example
 * ```ts
 * constructor(private coursesService: CoursesService) {}
 *
 * this.coursesService.getAllCourses(10).subscribe(courses => {
 *   console.log(courses);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de cursos desde el backend.
   *
   * @param countCourses Número de cursos a obtener.
   * @returns Observable que emite un array de cursos.
   *
   * @example
   * ```ts
   * this.coursesService.getAllCourses(5).subscribe(courses => {
   *   console.log(courses);
   * });
   * ```
   */
  getAllCourses(countCourses: number): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`api/courses/${countCourses}`);
  }
}
