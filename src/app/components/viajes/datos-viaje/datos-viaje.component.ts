import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViajeDTO } from 'src/app/DTOs/ViajeDTO';

@Component({
  selector: 'app-datos-viaje',
  templateUrl: './datos-viaje.component.html',
  styleUrls: ['./datos-viaje.component.css']
})
export class DatosViajeComponent implements OnInit {

  constructor() { }

  spinner: boolean = false;

  private _viaje: ViajeDTO;
  public get viaje() {
    return this._viaje;
  }
  @Input() public set viaje(value: ViajeDTO) {
    this._viaje = value;
  }


  ngOnInit(): void {
  }



  @Output() cancelarEvent = new EventEmitter();
  cancelar(): void {
    this.cancelarEvent.emit();
  };

  @Output() eliminarEvent = new EventEmitter();
  eliminarViaje(): void {
    this.spinner = true;
    this.eliminarEvent.emit();
  };

  formatDate(fecha: Date): string{
    return fecha.toString().split("T")[0];
  }

}
