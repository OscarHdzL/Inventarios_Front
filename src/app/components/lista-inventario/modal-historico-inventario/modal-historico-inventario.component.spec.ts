import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoricoInventarioComponent } from './modal-historico-inventario.component';

describe('ModalHistoricoInventarioComponent', () => {
  let component: ModalHistoricoInventarioComponent;
  let fixture: ComponentFixture<ModalHistoricoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistoricoInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHistoricoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
