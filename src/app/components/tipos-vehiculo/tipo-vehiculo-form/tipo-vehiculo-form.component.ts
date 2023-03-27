import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoVehiculoDTO } from 'src/app/DTOs/TipoVehiculoDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-vehiculo-form',
  templateUrl: './tipo-vehiculo-form.component.html',
  styleUrls: ['./tipo-vehiculo-form.component.css']
})
export class TipoVehiculoFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  public form: FormGroup;
  public spinner: boolean = false;
  editar: boolean = false;

  ngOnInit(): void {
  }

  private _tipoVehiculo: TipoVehiculoDTO;
  public get tipoVehiculo() {
    return this._tipoVehiculo;
  }
  @Input() public set tipoVehiculo(value: TipoVehiculoDTO) {
    this._tipoVehiculo = value;
    const readonly = value.idTipoVehiculo != 0;

    const id = value?.idTipoVehiculo == 0 ? '' : value?.idTipoVehiculo;
    this.editar = value?.idTipoVehiculo == 0;

    this.form = this.fb.group({
      idTipoVehiculo: [{ value: id, disabled: readonly }, Validators.compose([Validators.min(0)])],
      descripcion: [value?.descripcion ?? '', Validators.compose([Validators.required, Validators.minLength(3)])],
    },
    { validator: []});
  }


  @Output() agregarEvent = new EventEmitter<TipoVehiculoDTO>();
  onSave(): void{


    if(this.form.controls['descripcion']?.status.toString() === "INVALID"){
      Swal.fire({icon: "warning", text: "Ingrese una descripción válida."});
      return;
    }

    const id = +(this.form.get('idTipoVehiculo')?.value);
    const descripcion = this.form.get('descripcion')?.value ?? '';

    const tv = new TipoVehiculoDTO(id, descripcion);
    this.spinner = true;
    this.agregarEvent.emit(tv);
  }

  @Output() cancelarEvent = new EventEmitter();  
  cancelar(): void{
    this.cancelarEvent.emit();
  }

}
