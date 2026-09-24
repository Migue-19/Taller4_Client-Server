import { Course } from "../interfaces/courses.interface";

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
