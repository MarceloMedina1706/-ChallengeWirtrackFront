import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VehiculoDTO } from 'src/app/DTOs/VehiculoDTO';
import { TipoVehiculoService } from 'src/app/services/tipo-vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-select-vehiculo',
  templateUrl: './modal-select-vehiculo.component.html',
  styleUrls: ['./modal-select-vehiculo.component.css']
})
export class ModalSelectVehiculoComponent implements OnInit {

  public vehiculos: VehiculoDTO[];
  public vehiculosFilter: VehiculoDTO[];
  public tipos: any;
  public show: boolean

  constructor(private _tiposVehiculoService: TipoVehiculoService) { }

  ngOnInit(): void {
    this._tiposVehiculoService.obtenerTipos().subscribe(data => {
      if(data.codigo == 1){
        this.tipos = data.data;
      }else{
        Swal.fire({icon: "error", text: data.mensaje});
      }
    },
    err => {
      console.log(err)
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión"});
    });
  }

  @Output() selectVehiculoEvent =  new EventEmitter<VehiculoDTO>();
  selectVehiculo(ve: VehiculoDTO): void{
    this.selectVehiculoEvent.emit(ve);
  }


  recieveTipo($event): void{
    const value = $event;
    if(value === ""){
      this.vehiculosFilter = this.vehiculos;
    }else{
      this.vehiculosFilter = this.vehiculos.filter(v => v.idTipoVehiculo == value);
    }
  }

  closeModal(): void{
    this.vehiculosFilter = this.vehiculos;
    this.show = false;
  }



}
