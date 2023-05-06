import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignacionInventarioClienteComponent } from './modal-asignacion-inventario-cliente.component';

describe('ModalAsignacionInventarioClienteComponent', () => {
  let component: ModalAsignacionInventarioClienteComponent;
  let fixture: ComponentFixture<ModalAsignacionInventarioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAsignacionInventarioClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAsignacionInventarioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
