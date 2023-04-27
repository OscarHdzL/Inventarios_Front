import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlanoComponent } from './modal-plano.component';

describe('ModalPlanoComponent', () => {
  let component: ModalPlanoComponent;
  let fixture: ComponentFixture<ModalPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPlanoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
