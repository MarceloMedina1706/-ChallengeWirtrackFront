import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosTipoVehiculoComponent } from './datos-tipo-vehiculo.component';

describe('DatosTipoVehiculoComponent', () => {
  let component: DatosTipoVehiculoComponent;
  let fixture: ComponentFixture<DatosTipoVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosTipoVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosTipoVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
