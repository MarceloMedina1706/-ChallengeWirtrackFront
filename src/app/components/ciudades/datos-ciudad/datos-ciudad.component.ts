import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CiudadDTO } from 'src/app/DTOs/CiudadDTO';

@Component({
  selector: 'app-datos-ciudad',
  templateUrl: './datos-ciudad.component.html',
  styleUrls: ['./datos-ciudad.component.css']
})
export class DatosCiudadComponent implements OnInit {

  constructor() { }

  spinner = false;

  private _ciudad: CiudadDTO;
  public get ciudad() {
    return this._ciudad;
  }
  @Input() public set ciudad(value: CiudadDTO) {
    this._ciudad = value;
  }

  ngOnInit(): void {
  }


  @Output() cancelarEvent = new EventEmitter();
  cancelar(): void {
    this.cancelarEvent.emit();
  };

  @Output() eliminarEvent = new EventEmitter<number>();
  eliminarCiudad(): void {
    this.spinner = true;

    this.eliminarEvent.emit(this._ciudad.idCiudad);
  };

}
