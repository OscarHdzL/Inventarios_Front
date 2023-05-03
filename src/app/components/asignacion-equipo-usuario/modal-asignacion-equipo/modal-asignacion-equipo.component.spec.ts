import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignacionEquipoComponent } from './modal-asignacion-equipo.component';

describe('ModalAsignacionEquipoComponent', () => {
  let component: ModalAsignacionEquipoComponent;
  let fixture: ComponentFixture<ModalAsignacionEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAsignacionEquipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAsignacionEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
