import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSoftwareComponent } from './modal-software.component';

describe('ModalSoftwareComponent', () => {
  let component: ModalSoftwareComponent;
  let fixture: ComponentFixture<ModalSoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSoftwareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
