import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Order } from '../../interfaces/orders.interface';
import { ORDERS_MOCK } from '../../mocks/orders.mocks';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(OrdersService);
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

  describe('getAllOrders', () => {

    it('debería realizar una petición GET y retornar una lista de pedidos', () => {
      const countOrders = 5;
      const mockOrders: Order[] = ORDERS_MOCK;

      service.getAllOrders(countOrders).subscribe((orders) => {
        expect(orders).toEqual(mockOrders);
        expect(orders.length).toBe(mockOrders.length);
      });

      const req = httpMock.expectOne(`api/orders/${countOrders}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockOrders);
    });

    it('debería propagar un error si la petición HTTP falla', () => {
      const countOrders = 3;
      let statusRecibido = 0;

      service.getAllOrders(countOrders).subscribe({
        next: () => {
          throw new Error('No debería emitir datos cuando ocurre un error');
        },
        error: (error) => {
          statusRecibido = error.status;
        },
      });

      const req = httpMock.expectOne(`api/orders/${countOrders}`);

      req.flush(
        { message: 'Error interno del servidor' },
        { status: 500, statusText: 'Internal Server Error' }
      );

      expect(statusRecibido).toBe(500);
    });

  });

});
