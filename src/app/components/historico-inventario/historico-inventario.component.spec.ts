import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoInventarioComponent } from './historico-inventario.component';

describe('HistoricoInventarioComponent', () => {
  let component: HistoricoInventarioComponent;
  let fixture: ComponentFixture<HistoricoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
