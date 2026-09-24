/**
 * Interfaz que representa un libro.
 *
 * Contiene la información básica necesaria para mostrar un libro
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada libro debe tener un `id` único y un valor válido en el campo
 * `genre` (género). Coincide con el modelo que envía el
 * servidor en `GET /api/books/:countBooks`.
 *
 * @example
 * ```ts
 * const book: Book = {
 *   id: 1,
 *   title: 'Don Quijote de la Mancha',
 *   author: 'Miguel de Cervantes',
 *   genre: 'Historia',
 *   year: 1605,
 *   pages: 863,
 * };
 * ```
 */
export interface Book {
    /** Identificador único del libro */
    id: number;

    /** Título del libro */
    title: string;

    /** Nombre del autor del libro */
    author: string;

    /** Género literario del libro */
    genre: BookGenre;

    /** Año de publicación del libro */
    year: number;

    /** Cantidad de páginas del libro */
    pages: number;
}

/**
 * Tipo de género de un libro.
 *
 * @remarks
 * Este tipo restringe el campo `genre` a los valores predefinidos:
 * - 'Ciencia Ficcion'
 * - 'Fantasia'
 * - 'Historia'
 * - 'Tecnologia'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const genre: BookGenre = 'Ciencia Ficcion';
 * ```
 */
export type BookGenre = 'Ciencia Ficcion' | 'Fantasia' | 'Historia' | 'Tecnologia';
