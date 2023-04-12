import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdquisicionComponent } from './modal-adquisicion.component';

describe('ModalAdquisicionComponent', () => {
  let component: ModalAdquisicionComponent;
  let fixture: ComponentFixture<ModalAdquisicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdquisicionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdquisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
