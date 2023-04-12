import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCaracteristicaProductoComponent } from './modal-caracteristica-producto.component';

describe('ModalCaracteristicaProductoComponent', () => {
  let component: ModalCaracteristicaProductoComponent;
  let fixture: ComponentFixture<ModalCaracteristicaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCaracteristicaProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCaracteristicaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
