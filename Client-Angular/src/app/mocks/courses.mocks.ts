import { Course } from "../interfaces/courses.interface";

/**
 * Datos de prueba de cursos.
 *
 * @remarks
 * Se utiliza en las pruebas unitarias para simular la respuesta
 * del backend en `GET /api/courses/:countCourses`.
 */
export const COURSES_MOCK: Course[] = [
    {
        id: 1,
        name: 'Arquitectura de Software',
        teacher: 'Laura Martínez',
        credits: 3,
        modality: 'Presencial',
    },
    {
        id: 2,
        name: 'Bases de Datos',
        teacher: 'Andrés Torres',
        credits: 4,
        modality: 'Virtual',
    }
];
