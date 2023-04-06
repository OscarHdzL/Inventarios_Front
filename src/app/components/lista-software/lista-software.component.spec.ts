import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSoftwareComponent } from './lista-software.component';

describe('ListaSoftwareComponent', () => {
  let component: ListaSoftwareComponent;
  let fixture: ComponentFixture<ListaSoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSoftwareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
