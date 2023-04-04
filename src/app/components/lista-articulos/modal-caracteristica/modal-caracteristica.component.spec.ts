import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCaracteristicaComponent } from './modal-caracteristica.component';

describe('ModalCaracteristicaComponent', () => {
  let component: ModalCaracteristicaComponent;
  let fixture: ComponentFixture<ModalCaracteristicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCaracteristicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCaracteristicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
