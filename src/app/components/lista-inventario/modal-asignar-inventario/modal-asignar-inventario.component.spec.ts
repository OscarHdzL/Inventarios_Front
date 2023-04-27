import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarInventarioComponent } from './modal-asignar-inventario.component';

describe('ModalAsignarInventarioComponent', () => {
  let component: ModalAsignarInventarioComponent;
  let fixture: ComponentFixture<ModalAsignarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAsignarInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAsignarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
