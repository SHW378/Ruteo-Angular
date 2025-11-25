import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMovimiento } from './registro-movimiento';

describe('RegistroMovimiento', () => {
  let component: RegistroMovimiento;
  let fixture: ComponentFixture<RegistroMovimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMovimiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMovimiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
