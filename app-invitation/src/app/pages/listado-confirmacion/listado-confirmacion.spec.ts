import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoConfirmacion } from './listado-confirmacion';

describe('ListadoConfirmacion', () => {
  let component: ListadoConfirmacion;
  let fixture: ComponentFixture<ListadoConfirmacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoConfirmacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoConfirmacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
