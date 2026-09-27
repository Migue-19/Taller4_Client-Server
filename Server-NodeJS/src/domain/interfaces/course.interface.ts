/**
 * Interfaz que representa un curso del sistema.
 *
 * Contiene la información básica que el servidor genera y envía al cliente
 * para mostrarla en una tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada curso debe tener un `id` único y un valor válido en el campo
 * `modality` (modalidad).
 *
 * @example
 * ```ts
 * const course: Course = {
 *   id: 1,
 *   name: 'Arquitectura de Software',
 *   teacher: 'Laura Martínez',
 *   credits: 3,
 *   modality: 'Presencial',
 * };
 * ```
 */
export interface Course {
  /** Identificador único del curso */
  id: number;

  /** Nombre de la asignatura */
  name: string;

  /** Nombre completo del docente que dicta el curso */
  teacher: string;

  /** Número de créditos académicos (de 1 a 4) */
  credits: number;

  /** Modalidad en la que se dicta el curso */
  modality: CourseModality;
}

/**
 * Tipo de modalidad de un curso.
 *
 * @remarks
 * Este tipo restringe el campo `modality` a los valores predefinidos:
 * - 'Presencial'
 * - 'Virtual'
 * - 'Hibrido'
 *
 * @example
 * ```ts
 * const modality: CourseModality = 'Presencial';
 * ```
 */
export type CourseModality = 'Presencial' | 'Virtual' | 'Hibrido';
