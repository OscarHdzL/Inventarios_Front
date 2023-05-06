import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInventarioRegistradosComponent } from './lista-inventario-registrados.component';

describe('ListaInventarioRegistradosComponent', () => {
  let component: ListaInventarioRegistradosComponent;
  let fixture: ComponentFixture<ListaInventarioRegistradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaInventarioRegistradosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaInventarioRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
