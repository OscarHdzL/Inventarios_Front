import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGraficasArticuloComponent } from './modal-graficas-articulo.component';

describe('ModalGraficasArticuloComponent', () => {
  let component: ModalGraficasArticuloComponent;
  let fixture: ComponentFixture<ModalGraficasArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGraficasArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGraficasArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
