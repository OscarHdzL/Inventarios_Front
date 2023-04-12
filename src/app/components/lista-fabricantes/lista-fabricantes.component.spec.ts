import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFabricantesComponent } from './lista-fabricantes.component';

describe('ListaFabricantesComponent', () => {
  let component: ListaFabricantesComponent;
  let fixture: ComponentFixture<ListaFabricantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFabricantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFabricantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
