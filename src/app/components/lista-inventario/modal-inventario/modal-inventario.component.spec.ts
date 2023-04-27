import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInventarioComponent } from './modal-inventario.component';

describe('ModalInventarioComponent', () => {
  let component: ModalInventarioComponent;
  let fixture: ComponentFixture<ModalInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
