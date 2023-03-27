import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoVehiculoDTO } from 'src/app/DTOs/TipoVehiculoDTO';

@Component({
  selector: 'app-datos-tipo-vehiculo',
  templateUrl: './datos-tipo-vehiculo.component.html',
  styleUrls: ['./datos-tipo-vehiculo.component.css']
})
export class DatosTipoVehiculoComponent implements OnInit {

  constructor() { }

  spinner = false;

  private _tipo: TipoVehiculoDTO;
  public get tipo() {
    return this._tipo;
  }
  @Input() public set tipo(value: TipoVehiculoDTO) {
    this._tipo = value;
  }

  ngOnInit(): void {
  }


  @Output() cancelarEvent = new EventEmitter();
  cancelar(): void {
    this.cancelarEvent.emit();
  };

  @Output() eliminarEvent = new EventEmitter<number>();
  eliminarTipo(): void {
    this.spinner = true;

    this.eliminarEvent.emit(this._tipo.idTipoVehiculo);
  };

}
