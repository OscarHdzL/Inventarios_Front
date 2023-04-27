import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPlanoComponent } from './crear-plano.component';

describe('CrearPlanoComponent', () => {
  let component: CrearPlanoComponent;
  let fixture: ComponentFixture<CrearPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPlanoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
