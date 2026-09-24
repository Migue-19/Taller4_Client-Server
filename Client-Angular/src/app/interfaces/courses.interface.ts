/**
 * Interfaz que representa un curso.
 *
 * Contiene la información básica necesaria para mostrar un curso
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada curso debe tener un `id` único y un valor válido en el campo
 * `modality` (modalidad). Coincide con el modelo que envía el
 * servidor en `GET /api/courses/:countCourses`.
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
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const modality: CourseModality = 'Presencial';
 * ```
 */
export type CourseModality = 'Presencial' | 'Virtual' | 'Hibrido';
