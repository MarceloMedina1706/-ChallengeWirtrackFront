import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVehiculoFormComponent } from './tipo-vehiculo-form.component';

describe('TipoVehiculoFormComponent', () => {
  let component: TipoVehiculoFormComponent;
  let fixture: ComponentFixture<TipoVehiculoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoVehiculoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVehiculoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
