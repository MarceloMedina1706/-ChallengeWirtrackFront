import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadDTO } from 'src/app/DTOs/CiudadDTO';
import { VehiculoDTO } from 'src/app/DTOs/VehiculoDTO';
import { ViajeDTO } from 'src/app/DTOs/ViajeDTO';
import { CiudadService } from 'src/app/services/ciudad.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';
import { ModalSelectVehiculoComponent } from '../../modal/modal-select-vehiculo/modal-select-vehiculo.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-viaje-form',
  templateUrl: './viaje-form.component.html',
  styleUrls: ['./viaje-form.component.css']
})
export class ViajeFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private _vehiculoService: VehiculoService, private _ciudadService: CiudadService) {}




  ngOnInit(): void {
    this._vehiculoService.obtenerVehiculosNoAsginado().subscribe(data => {
      if(data.codigo === 1){
        this.vehiculos = data.data;
        this.modal.vehiculos = data.data;
        this.modal.vehiculosFilter = data.data;
      }else{
        Swal.fire({icon: "error", text: data.mensaje})
      }
    }, 
    err => {
      console.log(err);
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
    });

    this._ciudadService.obtenerCiudades().subscribe(data => {
      if(data.codigo === 1){
        this.ciudades = data.data;
      }else{
        Swal.fire({icon: "error", text: data.mensaje})
      }
    }, 
    err => {
      console.log(err);
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
    });

    
    this.minDate = this.getMinMaxDate(0);
    this.maxDate = this.getMinMaxDate(5);

  }


  @ViewChild("modal") modal: ModalSelectVehiculoComponent;
  public spinner: boolean = false;
  public disButton: boolean = false;
  public viajeForm: FormGroup;
  public vehiculos: VehiculoDTO[];
  public vehiculoSeleccionado: VehiculoDTO;
  public ciudades: CiudadDTO[] = []
  minDate: string;
  maxDate: string;
  defaultDate: string;


  

  private _viaje: ViajeDTO;
  public get viaje() {
    return this._viaje;
  }
  @Input() public set viaje(value: ViajeDTO) {
    this._viaje = value;
    const c1 = value.idCiudadDesde != 0 ? value.idCiudadDesde : ""
    const c2 = value.idCiudadHasta != 0 ? value.idCiudadHasta : ""
    let readOnly = false;
    if(value.idViaje !=  0){
      this.defaultDate = value.fechaSalida.toString().split("T")[0];
      this.disButton = true;
      readOnly = true;
      
    }else{
      this.disButton = false;
      this.defaultDate = this.getMinMaxDate(0);;
      
    }
    
    this.viajeForm = this.fb.group({
      idVehiculo: [0, Validators.compose([Validators.required, Validators.min(1)])],
      idCiudadDesde: [ { value: c1, disabled: readOnly }, Validators.compose([Validators.required, Validators.minLength(3)])],
      idCiudadHasta: [ { value: c2, disabled: readOnly }, Validators.compose([Validators.required, Validators.minLength(3)])],
      fechaSalida: [  this.defaultDate, Validators.compose([Validators.required, Validators.minLength(3)])],
    },
    { validator: []});

    this.vehiculoSeleccionado = value.vehiculo;

  }


  @Output() asignarViajeEvent = new EventEmitter<ViajeDTO>();
  onSave(): void {

    if(!this.vehiculoSeleccionado?.patente){
      Swal.fire({icon: "warning", text: "Debe seleccionar un vehículo."});
      return;
    }

    if(this.viajeForm.controls['idCiudadDesde']?.status.toString() === "INVALID"){
      Swal.fire({icon: "warning", text: "Debe seleccionar una ciudad desde."});
      return;
    }

    if(this.viajeForm.controls['idCiudadHasta']?.status.toString() === "INVALID"){
      Swal.fire({icon: "warning", text: "Debe seleccionar una ciudad hasta."});
      return;
    }


    this.spinner = true;
    const idViaje = this._viaje.idViaje;
    const idVehiculo = this.vehiculoSeleccionado.idVehiculo
    const cDesde = this.viajeForm.get("idCiudadDesde").value;
    const cHasta = this.viajeForm.get("idCiudadHasta").value;
    const fSalida = this.viajeForm.get("fechaSalida").value;

    const v = new ViajeDTO(idViaje, idVehiculo, cDesde, cHasta, fSalida);
    this.asignarViajeEvent.emit(v);
  }

  @Output() cancelarEvent = new EventEmitter();
  cancelar(): void {
    this.cancelarEvent.emit();
  };

  openModal(): void {
    if(!this.disButton){
      this.modal.show = true;

    }
  }

  recieveVehiculo($event): void{
    this.vehiculoSeleccionado = $event;
    this.modal.show = false;
  }

  private getMinMaxDate(days: number): string{
    const date = new Date();
    date.setDate(date.getDate() + days);
    const result = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${(date.getDate()).toString().padStart(2, "0")}`
    return result
  }

}
