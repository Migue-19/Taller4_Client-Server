import { faker } from '@faker-js/faker';
import { CustomError } from '../../../domain/erros/custom.error';
import { Book, BookGenre } from '../../../domain/interfaces/book.interface';

/**
 * Servicio encargado de la generación y gestión de libros.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar libros
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class BooksService {

  /**
   * Géneros literarios disponibles para los libros.
   *
   * @remarks
   * Se utiliza para asignar aleatoriamente un género
   * a cada libro generado.
   */
  private genres: BookGenre[] = [
    'Ciencia Ficcion',
    'Fantasia',
    'Historia',
    'Tecnologia',
  ];

  /**
   * Obtiene un listado de libros generados dinámicamente.
   *
   * @remarks
   * Valida que la cantidad solicitada sea un número entero entre 1 y 100.
   * Si no lo es, lanza un `CustomError` con código 400 que será procesado
   * por `HandleError` en el controlador.
   *
   * @param countBooks Cantidad de libros a generar
   * @returns Promesa que resuelve un arreglo de libros
   * @throws {CustomError} 400 si la cantidad no es un entero entre 1 y 100
   *
   * @example
   * ```ts
   * const books = await booksService.getAllBooks(10);
   * ```
   */
  public async getAllBooks(countBooks: number): Promise<Book[]> {
    if (!Number.isInteger(countBooks) || countBooks < 1 || countBooks > 100) {
      throw CustomError.badRequest('countBooks debe ser un entero entre 1 y 100');
    }

    const books: Promise<Book>[] = [];

    for (let i = 1; i <= countBooks; i++) {
      books.push(this.generateBook(i));
    }

    return Promise.all(books);
  }

  /**
   * Genera un libro ficticio.
   *
   * @param id Identificador único del libro
   * @returns Promesa que resuelve un libro generado
   */
  private generateBook(id: number): Promise<Book> {
    return Promise.resolve({
      id,
      title: faker.book.title(),
      author: faker.book.author(),
      genre: faker.helpers.arrayElement(this.genres),
      year: faker.number.int({ min: 1950, max: 2025 }),
      pages: faker.number.int({ min: 80, max: 900 }),
    });
  }
}
