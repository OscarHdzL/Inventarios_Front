import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContenedorImagenesAsignacionEquipoComponent } from './modal-contenedor-imagenes-asignacion-equipo.component';

describe('ModalContenedorImagenesAsignacionEquipoComponent', () => {
  let component: ModalContenedorImagenesAsignacionEquipoComponent;
  let fixture: ComponentFixture<ModalContenedorImagenesAsignacionEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContenedorImagenesAsignacionEquipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContenedorImagenesAsignacionEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
