import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VehiculoDTO } from 'src/app/DTOs/VehiculoDTO';

@Component({
  selector: 'app-datos-vehiculo',
  templateUrl: './datos-vehiculo.component.html',
  styleUrls: ['./datos-vehiculo.component.css']
})
export class DatosVehiculoComponent implements OnInit {

  constructor() { }

  spinner: boolean = false;

  private _vehiculo: VehiculoDTO;
  public get vehiculo() {
    return this._vehiculo;
  }
  @Input() public set vehiculo(value: VehiculoDTO) {
    this._vehiculo = value;
  }


  ngOnInit(): void {
  }



  @Output() cancelarEvent = new EventEmitter();
  cancelar(): void {
    this.cancelarEvent.emit();
  };

  @Output() eliminarEvent = new EventEmitter<number>();
  eliminarVehiculo(): void {
    this.spinner = true;

    this.eliminarEvent.emit(this.vehiculo.idVehiculo);
  };

}
