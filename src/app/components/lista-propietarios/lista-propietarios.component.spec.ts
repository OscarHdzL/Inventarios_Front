import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPropietariosComponent } from './lista-propietarios.component';

describe('ListaPropietariosComponent', () => {
  let component: ListaPropietariosComponent;
  let fixture: ComponentFixture<ListaPropietariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPropietariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
