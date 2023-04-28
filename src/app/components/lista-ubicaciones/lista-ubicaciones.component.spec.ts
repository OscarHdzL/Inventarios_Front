import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUbicacionesComponent } from './lista-ubicaciones.component';

describe('ListaUbicacionesComponent', () => {
  let component: ListaUbicacionesComponent;
  let fixture: ComponentFixture<ListaUbicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaUbicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
