import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConeccionDirectorioClienteComponent } from './modal-coneccion-directorio-cliente.component';

describe('ModalConeccionDirectorioClienteComponent', () => {
  let component: ModalConeccionDirectorioClienteComponent;
  let fixture: ComponentFixture<ModalConeccionDirectorioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConeccionDirectorioClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConeccionDirectorioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
