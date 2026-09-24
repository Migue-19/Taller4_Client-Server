import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPage } from './orders.page';
import { provideHttpClient } from '@angular/common/http';
import { OrdersService } from '../../services/orders/orders.service';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { of, Subject, throwError } from 'rxjs';
import { ORDERS_MOCK } from '../../mocks/orders.mocks';
import { Order } from '../../interfaces/orders.interface';
import { By } from '@angular/platform-browser';

describe('OrdersPage', () => {
  let component: OrdersPage;
  let fixture: ComponentFixture<OrdersPage>;
  let ordersService: OrdersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersPage, OrdersTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPage);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar con el estado init y sin pedidos', () => {
    expect(component.state).toBe('init');
    expect(component.orders).toEqual([]);
  });

  it('debería llamar a getAllOrders al iniciar', () => {
    const spyGetAllOrders = jest.spyOn(ordersService, 'getAllOrders').mockReturnValue(of(ORDERS_MOCK));
    fixture.detectChanges();
    expect(spyGetAllOrders).toHaveBeenCalledWith(10);
  });

  it('debería asignar los pedidos recibidos del servicio', () => {
    jest.spyOn(ordersService, 'getAllOrders').mockReturnValue(of(ORDERS_MOCK));
    fixture.detectChanges();
    expect(component.orders).toEqual(ORDERS_MOCK);
  });

  it('debería pasar los pedidos al componente orders-table', () => {
    jest.spyOn(ordersService, 'getAllOrders').mockReturnValue(of(ORDERS_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(OrdersTableComponent))
      .componentInstance;
    expect(tableComponent.orders).toEqual(ORDERS_MOCK);
  });

  it('debería mostrar la alerta de carga mientras espera la respuesta y luego la tabla', () => {
    const response$ = new Subject<Order[]>();
    jest.spyOn(ordersService, 'getAllOrders').mockReturnValue(response$.asObservable());

    fixture.detectChanges();

    expect(component.state).toBe('loading');
    const loadingAlert = fixture.debugElement.query(By.directive(AlertComponent));
    expect(loadingAlert).toBeTruthy();
    expect(loadingAlert.componentInstance.alertState).toBe('loading');
    expect(fixture.debugElement.query(By.directive(OrdersTableComponent))).toBeNull();

    response$.next(ORDERS_MOCK);
    response$.complete();
    fixture.detectChanges();

    expect(component.state).toBe('success');
    expect(fixture.debugElement.query(By.directive(AlertComponent))).toBeNull();
    expect(fixture.debugElement.query(By.directive(OrdersTableComponent))).toBeTruthy();
  });

  it('debería manejar el error cuando falla getAllOrders', () => {
    component.orders = [];
    const errorResponse = new Error('Error al cargar pedidos');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(ordersService, 'getAllOrders').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(ordersService.getAllOrders).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.orders.length).toBe(0);
    expect(component.state).toBe('error');
  });

  it('debería mostrar la alerta de error cuando falla la carga', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(ordersService, 'getAllOrders').mockReturnValue(throwError(() => new Error('fallo')));

    fixture.detectChanges();

    const errorAlert = fixture.debugElement.query(By.directive(AlertComponent));
    expect(errorAlert).toBeTruthy();
    expect(errorAlert.componentInstance.alertState).toBe('error');
    expect(fixture.debugElement.query(By.directive(OrdersTableComponent))).toBeNull();
  });
});
