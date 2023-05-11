import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorFormComponent } from './contenedor-form.component';

describe('ContenedorFormComponent', () => {
  let component: ContenedorFormComponent;
  let fixture: ComponentFixture<ContenedorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
