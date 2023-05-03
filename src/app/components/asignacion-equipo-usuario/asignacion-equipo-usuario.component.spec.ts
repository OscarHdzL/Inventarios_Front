import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionEquipoUsuarioComponent } from './asignacion-equipo-usuario.component';

describe('AsignacionEquipoUsuarioComponent', () => {
  let component: AsignacionEquipoUsuarioComponent;
  let fixture: ComponentFixture<AsignacionEquipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionEquipoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionEquipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
