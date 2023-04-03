import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBaseComponent } from './lista-base.component';

describe('ListaBaseComponent', () => {
  let component: ListaBaseComponent;
  let fixture: ComponentFixture<ListaBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
