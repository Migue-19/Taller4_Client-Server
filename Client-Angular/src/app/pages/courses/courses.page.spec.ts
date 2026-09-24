import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPage } from './courses.page';
import { provideHttpClient } from '@angular/common/http';
import { CoursesService } from '../../services/courses/courses.service';
import { CoursesTableComponent } from '../../components/courses-table/courses-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { of, Subject, throwError } from 'rxjs';
import { COURSES_MOCK } from '../../mocks/courses.mocks';
import { Course } from '../../interfaces/courses.interface';
import { By } from '@angular/platform-browser';

describe('CoursesPage', () => {
  let component: CoursesPage;
  let fixture: ComponentFixture<CoursesPage>;
  let coursesService: CoursesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesPage, CoursesTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesPage);
    component = fixture.componentInstance;
    coursesService = TestBed.inject(CoursesService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar con el estado init y sin cursos', () => {
    expect(component.state).toBe('init');
    expect(component.courses).toEqual([]);
  });

  it('debería llamar a getAllCourses al iniciar', () => {
    const spyGetAllCourses = jest.spyOn(coursesService, 'getAllCourses').mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    expect(spyGetAllCourses).toHaveBeenCalledWith(10);
  });

  it('debería asignar los cursos recibidos del servicio', () => {
    jest.spyOn(coursesService, 'getAllCourses').mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    expect(component.courses).toEqual(COURSES_MOCK);
  });

  it('debería pasar los cursos al componente courses-table', () => {
    jest.spyOn(coursesService, 'getAllCourses').mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(CoursesTableComponent))
      .componentInstance;
    expect(tableComponent.courses).toEqual(COURSES_MOCK);
  });

  it('debería mostrar la alerta de carga mientras espera la respuesta y luego la tabla', () => {
    const response$ = new Subject<Course[]>();
    jest.spyOn(coursesService, 'getAllCourses').mockReturnValue(response$.asObservable());

    fixture.detectChanges();

    expect(component.state).toBe('loading');
    const loadingAlert = fixture.debugElement.query(By.directive(AlertComponent));
    expect(loadingAlert).toBeTruthy();
    expect(loadingAlert.componentInstance.alertState).toBe('loading');
    expect(fixture.debugElement.query(By.directive(CoursesTableComponent))).toBeNull();

    response$.next(COURSES_MOCK);
    response$.complete();
    fixture.detectChanges();

    expect(component.state).toBe('success');
    expect(fixture.debugElement.query(By.directive(AlertComponent))).toBeNull();
    expect(fixture.debugElement.query(By.directive(CoursesTableComponent))).toBeTruthy();
  });

  it('debería manejar el error cuando falla getAllCourses', () => {
    component.courses = [];
    const errorResponse = new Error('Error al cargar cursos');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(coursesService, 'getAllCourses').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(coursesService.getAllCourses).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.courses.length).toBe(0);
    expect(component.state).toBe('error');
  });

  it('debería mostrar la alerta de error cuando falla la carga', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(coursesService, 'getAllCourses').mockReturnValue(throwError(() => new Error('fallo')));

    fixture.detectChanges();

    const errorAlert = fixture.debugElement.query(By.directive(AlertComponent));
    expect(errorAlert).toBeTruthy();
    expect(errorAlert.componentInstance.alertState).toBe('error');
    expect(fixture.debugElement.query(By.directive(CoursesTableComponent))).toBeNull();
  });
});
