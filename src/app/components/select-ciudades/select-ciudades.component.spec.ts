import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCiudadesComponent } from './select-ciudades.component';

describe('SelectCiudadesComponent', () => {
  let component: SelectCiudadesComponent;
  let fixture: ComponentFixture<SelectCiudadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCiudadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
