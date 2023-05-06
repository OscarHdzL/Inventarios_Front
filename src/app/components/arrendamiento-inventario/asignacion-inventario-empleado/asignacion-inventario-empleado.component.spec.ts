import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionInventarioEmpleadoComponent } from './asignacion-inventario-empleado.component';

describe('AsignacionInventarioEmpleadoComponent', () => {
  let component: AsignacionInventarioEmpleadoComponent;
  let fixture: ComponentFixture<AsignacionInventarioEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionInventarioEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionInventarioEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
