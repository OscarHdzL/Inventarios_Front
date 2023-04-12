import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProductoAdquisicionComponent } from './modal-producto-adquisicion.component';

describe('ModalProductoAdquisicionComponent', () => {
  let component: ModalProductoAdquisicionComponent;
  let fixture: ComponentFixture<ModalProductoAdquisicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProductoAdquisicionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProductoAdquisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
