import { CurrencyPipe, DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ORDERS_MOCK } from '../../mocks/orders.mocks';
import { OrdersTableComponent } from './orders-table.component';

describe('OrdersTableComponent', () => {
  let component: OrdersTableComponent;
  let fixture: ComponentFixture<OrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersTableComponent);
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

  it('debería iniciar sin filas cuando no se reciben pedidos', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });

  it('debería renderizar una fila por cada pedido', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.orders.length);
  });

  it('debería mostrar los datos del pedido en cada columna', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const item = component.orders[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(item.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(item.customer);
      expect(columns[2].nativeElement.textContent.trim()).toBe(new CurrencyPipe('en-US').transform(item.total));
      expect(columns[3].nativeElement.textContent.trim()).toBe(new DatePipe('en-US').transform(item.date, 'dd/MM/yyyy'));
    });
  });

  it('debería mostrar el badge con el valor de estado de cada pedido', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const item = component.orders[index];

      expect(columns[4].nativeElement.textContent.trim()).toBe(item.status);
    });
  });

  it('debería mostrar el total con formato de moneda y la fecha con formato dd/MM/yyyy', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();

    const firstRow = fixture.debugElement.query(By.css('tbody tr'));
    const columns = firstRow.queryAll(By.css('th, td'));
    const item = component.orders[0];

    expect(columns[2].nativeElement.textContent.trim()).toContain('$');
    expect(columns[2].nativeElement.textContent.trim()).toBe(new CurrencyPipe('en-US').transform(item.total));
    expect(columns[3].nativeElement.textContent.trim()).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it('debería mapear cada valor de estado a su BadgeType correcto', () => {
    expect(component.statusMap['Pendiente']).toBe('warning');
    expect(component.statusMap['Enviado']).toBe('primary');
    expect(component.statusMap['Entregado']).toBe('success');
    expect(component.statusMap['Cancelado']).toBe('danger');
  });

});
