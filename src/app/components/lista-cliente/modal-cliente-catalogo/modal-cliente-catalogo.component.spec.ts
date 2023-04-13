import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClienteCatalogoComponent } from './modal-cliente-catalogo.component';

describe('ModalClienteCatalogoComponent', () => {
  let component: ModalClienteCatalogoComponent;
  let fixture: ComponentFixture<ModalClienteCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClienteCatalogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalClienteCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
