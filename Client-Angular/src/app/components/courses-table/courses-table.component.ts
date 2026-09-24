import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { CourseModality, Course } from '../../interfaces/courses.interface';

/**
 * Componente de tabla de cursos.
 *
 * Se utiliza para mostrar un listado de cursos en una tabla,
 * mostrando su información principal y un badge visual que indica
 * el campo `modality` (modalidad) de cada curso.
 *
 * @remarks
 * Este componente recibe los cursos desde un componente padre
 * a través del Input `courses` y utiliza el mapeo `modalityMap`
 * para asignar colores a los badges según el valor del campo.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-courses-table [courses]="coursesList"></app-courses-table>
 * ```
 */
@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  imports: [BadgeAtom],
})
export class CoursesTableComponent {
  /**
   * Listado de cursos que se mostrarán en la tabla.
   * @type {Course[]}
   * @remarks
   * Este Input permite pasar un array de cursos desde un componente padre,
   * generalmente `CoursesPage`. Cada curso debe cumplir la interfaz `Course`.
   */
  @Input() courses: Course[] = [];
  /**
   * Mapeo de modalidad a tipos de Badge.
   * @type {Record<CourseModality, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada valor:
   * - 'Presencial' → 'success' (verde)
   * - 'Virtual' → 'primary' (azul)
   * - 'Hibrido' → 'warning' (amarillo)
   *
   * Esto permite que en la tabla cada curso tenga un badge visual que indique su modalidad
   * de forma clara para el usuario.
   */
  modalityMap: Record<CourseModality, BadgeType> = {
    'Presencial': 'success',
    'Virtual': 'primary',
    'Hibrido': 'warning',
  }
}
