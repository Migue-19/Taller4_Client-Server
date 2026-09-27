import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { COURSES_MOCK } from '../../mocks/courses.mocks';
import { CoursesTableComponent } from './courses-table.component';

describe('CoursesTableComponent', () => {
  let component: CoursesTableComponent;
  let fixture: ComponentFixture<CoursesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesTableComponent);
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

  it('debería iniciar sin filas cuando no se reciben cursos', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });

  it('debería renderizar una fila por cada curso', () => {
    component.courses = COURSES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.courses.length);
  });

  it('debería mostrar los datos del curso en cada columna', () => {
    component.courses = COURSES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const item = component.courses[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(item.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(item.name);
      expect(columns[2].nativeElement.textContent.trim()).toBe(item.teacher);
      expect(columns[3].nativeElement.textContent.trim()).toBe(String(item.credits));
    });
  });

  it('debería mostrar el badge con el valor de modalidad de cada curso', () => {
    component.courses = COURSES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const item = component.courses[index];

      expect(columns[4].nativeElement.textContent.trim()).toBe(item.modality);
    });
  });

  it('debería mapear cada valor de modalidad a su BadgeType correcto', () => {
    expect(component.modalityMap['Presencial']).toBe('success');
    expect(component.modalityMap['Virtual']).toBe('primary');
    expect(component.modalityMap['Hibrido']).toBe('warning');
  });

});
