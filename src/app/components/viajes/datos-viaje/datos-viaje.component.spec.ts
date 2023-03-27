import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosViajeComponent } from './datos-viaje.component';

describe('DatosViajeComponent', () => {
  let component: DatosViajeComponent;
  let fixture: ComponentFixture<DatosViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosViajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
