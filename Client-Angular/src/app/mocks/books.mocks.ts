import { Book } from "../interfaces/books.interface";

/**
 * Datos de prueba de libros.
 *
 * @remarks
 * Se utiliza en las pruebas unitarias para simular la respuesta
 * del backend en `GET /api/books/:countBooks`.
 */
export const BOOKS_MOCK: Book[] = [
    {
        id: 1,
        title: 'Don Quijote de la Mancha',
        author: 'Miguel de Cervantes',
        genre: 'Historia',
        year: 1605,
        pages: 863,
    },
    {
        id: 2,
        title: 'Fundación',
        author: 'Isaac Asimov',
        genre: 'Ciencia Ficcion',
        year: 1951,
        pages: 255,
    }
];
