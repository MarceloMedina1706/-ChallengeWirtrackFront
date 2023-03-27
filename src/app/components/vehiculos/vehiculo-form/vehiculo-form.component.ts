import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoDTO } from 'src/app/DTOs/VehiculoDTO';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo-form',
  templateUrl: './vehiculo-form.component.html',
  styleUrls: ['./vehiculo-form.component.css']
})
export class VehiculoFormComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  public vehiculoForm: FormGroup;
  @Input() public spinner: boolean = false;
  editar: boolean = false;
  selectValue: number;
  


  ngOnInit(): void {

  }

  
  private _vehiculo: VehiculoDTO;
  public get vehiculo() {
    return this._vehiculo;
  }
  @Input() public set vehiculo(value: VehiculoDTO) {
    this._vehiculo = value;
    this.vehiculoForm = this.fb.group({
      idVehiculo: [this._vehiculo?.idVehiculo ?? 0, Validators.compose([Validators.min(0)])],
      idTipoVehiculo: [this._vehiculo?.idTipoVehiculo ?? '', Validators.compose([Validators.required, Validators.minLength(3)])],
      patente: [this._vehiculo?.patente ?? '', Validators.compose([Validators.required, Validators.minLength(3)])],
      marca: [this._vehiculo?.marca ?? '', Validators.compose([Validators.required, Validators.minLength(3)])],
      modelo: [this._vehiculo?.modelo ?? '', Validators.compose([Validators.required, Validators.minLength(3)])],
    },
    { validator: []});

    this.editar = true;
    this.selectValue = this._vehiculo!.idTipoVehiculo;
  }

  

  @Output() agregarEvent = new EventEmitter<VehiculoDTO>();
  onSave(): void {

    if(this.vehiculoForm.controls['marca']?.status.toString() === "INVALID"){
      Swal.fire({icon: "warning", text: "Ingrese una marca válida."});
      return;
    }

    if(this.vehiculoForm.controls['modelo']?.status.toString() === "INVALID"){
      Swal.fire({icon: "warning", text: "Ingrese un modelo válido."});
      return;
    }

    if(this.vehiculoForm.controls['patente']?.status.toString() === "INVALID"){
      Swal.fire({icon: "warning", text: "Ingrese una patente válida."});
      return;
    }


    const id = this.vehiculoForm.get('idVehiculo')?.value;
    const idTipoVehiculo = this.vehiculoForm.get('idTipoVehiculo')?.value ?? '';
    const patente = this.vehiculoForm.get('patente')?.value ?? '';
    const marca = this.vehiculoForm.get('marca')?.value ?? '';
    const modelo = this.vehiculoForm.get('modelo')?.value ?? '';

    const vehiculo = new VehiculoDTO(id, idTipoVehiculo, "", marca, modelo, patente);
    //this.spinner = true;
    this.agregarEvent.emit(vehiculo);
  };

  @Output() cancelarEvent = new EventEmitter();
  cancelar(): void {
    this.cancelarEvent.emit();
  };

  selectTipoVehiculo($event): void{
    this.vehiculoForm.get("idTipoVehiculo").setValue($event);
  }

  setSpinner(value: boolean){
    this.spinner = value;
  }


}
