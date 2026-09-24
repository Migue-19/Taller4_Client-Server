import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPage } from './books.page';
import { provideHttpClient } from '@angular/common/http';
import { BooksService } from '../../services/books/books.service';
import { BooksTableComponent } from '../../components/books-table/books-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { of, Subject, throwError } from 'rxjs';
import { BOOKS_MOCK } from '../../mocks/books.mocks';
import { Book } from '../../interfaces/books.interface';
import { By } from '@angular/platform-browser';

describe('BooksPage', () => {
  let component: BooksPage;
  let fixture: ComponentFixture<BooksPage>;
  let booksService: BooksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPage, BooksTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksPage);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar con el estado init y sin libros', () => {
    expect(component.state).toBe('init');
    expect(component.books).toEqual([]);
  });

  it('debería llamar a getAllBooks al iniciar', () => {
    const spyGetAllBooks = jest.spyOn(booksService, 'getAllBooks').mockReturnValue(of(BOOKS_MOCK));
    fixture.detectChanges();
    expect(spyGetAllBooks).toHaveBeenCalledWith(10);
  });

  it('debería asignar los libros recibidos del servicio', () => {
    jest.spyOn(booksService, 'getAllBooks').mockReturnValue(of(BOOKS_MOCK));
    fixture.detectChanges();
    expect(component.books).toEqual(BOOKS_MOCK);
  });

  it('debería pasar los libros al componente books-table', () => {
    jest.spyOn(booksService, 'getAllBooks').mockReturnValue(of(BOOKS_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(BooksTableComponent))
      .componentInstance;
    expect(tableComponent.books).toEqual(BOOKS_MOCK);
  });

  it('debería mostrar la alerta de carga mientras espera la respuesta y luego la tabla', () => {
    const response$ = new Subject<Book[]>();
    jest.spyOn(booksService, 'getAllBooks').mockReturnValue(response$.asObservable());

    fixture.detectChanges();

    expect(component.state).toBe('loading');
    const loadingAlert = fixture.debugElement.query(By.directive(AlertComponent));
    expect(loadingAlert).toBeTruthy();
    expect(loadingAlert.componentInstance.alertState).toBe('loading');
    expect(fixture.debugElement.query(By.directive(BooksTableComponent))).toBeNull();

    response$.next(BOOKS_MOCK);
    response$.complete();
    fixture.detectChanges();

    expect(component.state).toBe('success');
    expect(fixture.debugElement.query(By.directive(AlertComponent))).toBeNull();
    expect(fixture.debugElement.query(By.directive(BooksTableComponent))).toBeTruthy();
  });

  it('debería manejar el error cuando falla getAllBooks', () => {
    component.books = [];
    const errorResponse = new Error('Error al cargar libros');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(booksService, 'getAllBooks').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(booksService.getAllBooks).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.books.length).toBe(0);
    expect(component.state).toBe('error');
  });

  it('debería mostrar la alerta de error cuando falla la carga', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(booksService, 'getAllBooks').mockReturnValue(throwError(() => new Error('fallo')));

    fixture.detectChanges();

    const errorAlert = fixture.debugElement.query(By.directive(AlertComponent));
    expect(errorAlert).toBeTruthy();
    expect(errorAlert.componentInstance.alertState).toBe('error');
    expect(fixture.debugElement.query(By.directive(BooksTableComponent))).toBeNull();
  });
});
