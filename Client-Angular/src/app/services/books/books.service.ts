import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../interfaces/books.interface';

/**
 * Servicio encargado de la gestión de libros.
 *
 * Proporciona métodos para obtener información de libros
 * desde la API REST.
 *
 * @example
 * ```ts
 * constructor(private booksService: BooksService) {}
 *
 * this.booksService.getAllBooks(10).subscribe(books => {
 *   console.log(books);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class BooksService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de libros desde el backend.
   *
   * @param countBooks Número de libros a obtener.
   * @returns Observable que emite un array de libros.
   *
   * @example
   * ```ts
   * this.booksService.getAllBooks(5).subscribe(books => {
   *   console.log(books);
   * });
   * ```
   */
  getAllBooks(countBooks: number): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`api/books/${countBooks}`);
  }
}
