import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionInventarioClienteComponent } from './asignacion-inventario-cliente.component';

describe('AsignacionInventarioClienteComponent', () => {
  let component: AsignacionInventarioClienteComponent;
  let fixture: ComponentFixture<AsignacionInventarioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionInventarioClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionInventarioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
