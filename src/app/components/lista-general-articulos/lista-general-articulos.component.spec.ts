import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGeneralArticulosComponent } from './lista-general-articulos.component';

describe('ListaGeneralArticulosComponent', () => {
  let component: ListaGeneralArticulosComponent;
  let fixture: ComponentFixture<ListaGeneralArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGeneralArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaGeneralArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
