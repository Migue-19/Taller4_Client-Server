import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Book } from '../../interfaces/books.interface';
import { BOOKS_MOCK } from '../../mocks/books.mocks';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes
    httpMock.verify();
  });

  describe('Creación del servicio', () => {

    it('debería crearse correctamente', () => {
      expect(service).toBeTruthy();
    });

  });

  describe('getAllBooks', () => {

    it('debería realizar una petición GET y retornar una lista de libros', () => {
      const countBooks = 5;
      const mockBooks: Book[] = BOOKS_MOCK;

      service.getAllBooks(countBooks).subscribe((books) => {
        expect(books).toEqual(mockBooks);
        expect(books.length).toBe(mockBooks.length);
      });

      const req = httpMock.expectOne(`api/books/${countBooks}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockBooks);
    });

    it('debería propagar un error si la petición HTTP falla', () => {
      const countBooks = 3;
      let statusRecibido = 0;

      service.getAllBooks(countBooks).subscribe({
        next: () => {
          throw new Error('No debería emitir datos cuando ocurre un error');
        },
        error: (error) => {
          statusRecibido = error.status;
        },
      });

      const req = httpMock.expectOne(`api/books/${countBooks}`);

      req.flush(
        { message: 'Error interno del servidor' },
        { status: 500, statusText: 'Internal Server Error' }
      );

      expect(statusRecibido).toBe(500);
    });

  });

});
