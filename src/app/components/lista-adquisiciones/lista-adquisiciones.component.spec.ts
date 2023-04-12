import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdquisicionesComponent } from './lista-adquisiciones.component';

describe('ListaAdquisicionesComponent', () => {
  let component: ListaAdquisicionesComponent;
  let fixture: ComponentFixture<ListaAdquisicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAdquisicionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAdquisicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
