import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoadImageComponent } from './modal-load-image.component';

describe('ModalLoadImageComponent', () => {
  let component: ModalLoadImageComponent;
  let fixture: ComponentFixture<ModalLoadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLoadImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLoadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
