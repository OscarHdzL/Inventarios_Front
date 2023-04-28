import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUbicacionesComponent } from './modal-ubicaciones.component';

describe('ModalUbicacionesComponent', () => {
  let component: ModalUbicacionesComponent;
  let fixture: ComponentFixture<ModalUbicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUbicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
