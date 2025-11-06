import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComponentes } from './listado-componentes';

describe('ListadoComponentes', () => {
  let component: ListadoComponentes;
  let fixture: ComponentFixture<ListadoComponentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoComponentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoComponentes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
