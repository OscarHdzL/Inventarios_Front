import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocumentoArticuloComponent } from './modal-documento-articulo.component';

describe('ModalDocumentoArticuloComponent', () => {
  let component: ModalDocumentoArticuloComponent;
  let fixture: ComponentFixture<ModalDocumentoArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDocumentoArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDocumentoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
