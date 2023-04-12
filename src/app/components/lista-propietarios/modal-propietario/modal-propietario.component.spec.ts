import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPropietarioComponent } from './modal-propietario.component';

describe('ModalPropietarioComponent', () => {
  let component: ModalPropietarioComponent;
  let fixture: ComponentFixture<ModalPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPropietarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
