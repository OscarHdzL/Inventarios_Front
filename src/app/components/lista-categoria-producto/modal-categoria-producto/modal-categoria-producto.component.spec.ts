import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoriaProductoComponent } from './modal-categoria-producto.component';

describe('ModalCategoriaProductoComponent', () => {
  let component: ModalCategoriaProductoComponent;
  let fixture: ComponentFixture<ModalCategoriaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCategoriaProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCategoriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
