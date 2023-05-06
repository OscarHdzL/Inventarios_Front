import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizacionAsignacionInventarioEmpleadoComponent } from './modal-visualizacion-asignacion-inventario-empleado.component';

describe('ModalVisualizacionAsignacionInventarioEmpleadoComponent', () => {
  let component: ModalVisualizacionAsignacionInventarioEmpleadoComponent;
  let fixture: ComponentFixture<ModalVisualizacionAsignacionInventarioEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisualizacionAsignacionInventarioEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVisualizacionAsignacionInventarioEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
