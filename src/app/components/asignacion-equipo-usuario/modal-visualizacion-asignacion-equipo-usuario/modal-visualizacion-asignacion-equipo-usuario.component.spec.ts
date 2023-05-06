import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizacionAsignacionEquipoUsuarioComponent } from './modal-visualizacion-asignacion-equipo-usuario.component';

describe('ModalVisualizacionAsignacionEquipoUsuarioComponent', () => {
  let component: ModalVisualizacionAsignacionEquipoUsuarioComponent;
  let fixture: ComponentFixture<ModalVisualizacionAsignacionEquipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisualizacionAsignacionEquipoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVisualizacionAsignacionEquipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
