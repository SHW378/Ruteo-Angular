import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaStockComponent } from './alerta-stock';

describe('AlertaStockComponent', () => {
  let component: AlertaStockComponent;
  let fixture: ComponentFixture<AlertaStockComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertaStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
