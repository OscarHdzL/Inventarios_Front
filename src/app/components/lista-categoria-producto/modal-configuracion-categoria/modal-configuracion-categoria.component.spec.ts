import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfiguracionCategoriaComponent } from './modal-configuracion-categoria.component';

describe('ModalConfiguracionCategoriaComponent', () => {
  let component: ModalConfiguracionCategoriaComponent;
  let fixture: ComponentFixture<ModalConfiguracionCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfiguracionCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfiguracionCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
