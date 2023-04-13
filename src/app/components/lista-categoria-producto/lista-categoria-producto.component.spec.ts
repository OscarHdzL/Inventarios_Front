import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCategoriaProductoComponent } from './lista-categoria-producto.component';

describe('ListaCategoriaProductoComponent', () => {
  let component: ListaCategoriaProductoComponent;
  let fixture: ComponentFixture<ListaCategoriaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCategoriaProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCategoriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
