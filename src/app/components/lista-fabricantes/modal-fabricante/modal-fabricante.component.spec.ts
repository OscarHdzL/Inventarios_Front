import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFabricanteComponent } from './modal-fabricante.component';

describe('ModalFabricanteComponent', () => {
  let component: ModalFabricanteComponent;
  let fixture: ComponentFixture<ModalFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFabricanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
