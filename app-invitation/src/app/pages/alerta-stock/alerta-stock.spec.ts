import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaStock } from './alerta-stock';

describe('AlertaStock', () => {
  let component: AlertaStock;
  let fixture: ComponentFixture<AlertaStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertaStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
