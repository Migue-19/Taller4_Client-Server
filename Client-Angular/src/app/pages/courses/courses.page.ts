import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../components/alert/alert.component';
import { CoursesTableComponent } from '../../components/courses-table/courses-table.component';
import { Course } from '../../interfaces/courses.interface';
import { State } from '../../interfaces/state.interface';
import { CoursesService } from '../../services/courses/courses.service';

/**
 * Componente contenedor de cursos.
 *
 * Se utiliza para gestionar y mostrar un listado de cursos
 * utilizando el componente `CoursesTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `CoursesService`
 * para obtener los cursos y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  imports: [CoursesTableComponent, AlertComponent],
})
export class CoursesPage {
  /**
   * Listado de cursos obtenidos desde el servicio.
   * @type {Course[]}
   */
  courses: Course[] = [];
  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener cursos.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private coursesService = inject(CoursesService);

  /**
   * Inicializa el componente y carga los cursos.
   * @remarks
   * Se suscribe al método `getAllCourses()` del servicio y
   * asigna los datos recibidos a la propiedad `courses`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.coursesService.getAllCourses(10).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }
}
