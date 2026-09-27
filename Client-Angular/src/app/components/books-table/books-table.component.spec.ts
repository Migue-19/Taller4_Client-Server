import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BOOKS_MOCK } from '../../mocks/books.mocks';
import { BooksTableComponent } from './books-table.component';

describe('BooksTableComponent', () => {
  let component: BooksTableComponent;
  let fixture: ComponentFixture<BooksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('debería iniciar sin filas cuando no se reciben libros', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });

  it('debería renderizar una fila por cada libro', () => {
    component.books = BOOKS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.books.length);
  });

  it('debería mostrar los datos del libro en cada columna', () => {
    component.books = BOOKS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const item = component.books[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(item.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(item.title);
      expect(columns[2].nativeElement.textContent.trim()).toBe(item.author);
      expect(columns[3].nativeElement.textContent.trim()).toBe(String(item.year));
      expect(columns[4].nativeElement.textContent.trim()).toBe(String(item.pages));
    });
  });

  it('debería mostrar el badge con el valor de género de cada libro', () => {
    component.books = BOOKS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const item = component.books[index];

      expect(columns[5].nativeElement.textContent.trim()).toBe(item.genre);
    });
  });

  it('debería mapear cada valor de género a su BadgeType correcto', () => {
    expect(component.genreMap['Ciencia Ficcion']).toBe('info');
    expect(component.genreMap['Fantasia']).toBe('secondary');
    expect(component.genreMap['Historia']).toBe('warning');
    expect(component.genreMap['Tecnologia']).toBe('primary');
  });

});
