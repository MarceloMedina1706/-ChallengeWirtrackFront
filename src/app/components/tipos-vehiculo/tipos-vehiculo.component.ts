import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoVehiculoDTO } from 'src/app/DTOs/TipoVehiculoDTO';
import { TipoVehiculoService } from 'src/app/services/tipo-vehiculo.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-tipos-vehiculo',
  templateUrl: './tipos-vehiculo.component.html',
  styleUrls: ['./tipos-vehiculo.component.css']
})
export class TiposVehiculoComponent implements OnInit {

  constructor(private tiposService: TipoVehiculoService) { }

  tiposVehiculo: TipoVehiculoDTO[];

  @ViewChild("modal") appModal: ModalComponent;

  ngOnInit(): void {
    this.obtenerTipos();
  }

  abrirModal(): void{
    this.appModal.titulo = "Agregar Tipo Vehículo."
    this.appModal.tipoVehiculo = new TipoVehiculoDTO(0, '');
    this.appModal.openModal(8);
  }

  abrirModalEditar(tipo: TipoVehiculoDTO): void{
    this.appModal.titulo = "Editar Tipo Vehículo."
    this.appModal.tipoVehiculo = tipo;
    this.appModal.openModal(8);
  }

  abrirModalEliminar(tipo: TipoVehiculoDTO): void{
    this.appModal.titulo = "Eliminar Tipo Vehículo."
    this.appModal.tipoVehiculo = tipo;
    this.appModal.openModal(9);
  }


  recieveTipo($event): void{
    const tipo = $event;
    if(tipo.idTipoVehiculo == 0){
      
      this.tiposService.agregarTipo(tipo).subscribe(data => {
        if(data.codigo == 1){
          Swal.fire({icon: "success", text: data.mensaje});
          this.tiposVehiculo.push(data.data);
        }else{
          Swal.fire({icon: "error", text: data.mensaje})
        }
        this.appModal.closeModal();
      }, 
      err => {
        console.log(err);
        Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
        this.appModal.closeModal();
      })


    }else{
      
      this.tiposService.editarTipo(tipo).subscribe(data => {
        if(data.codigo == 1){
          Swal.fire({icon: "success", text: data.mensaje});
          this.obtenerTipos();
        }else{
          Swal.fire({icon: "error", text: data.mensaje})
        }
        this.appModal.closeModal();
      }, 
      err => {
        console.log(err);
        Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
        this.appModal.closeModal();
      })


    }
  }


  recieveEliminar($event): void{
    const tipo = $event;
    this.tiposService.eliminarTipo(tipo).subscribe(data => {
      if(data.codigo == 1){
        Swal.fire({icon: "success", text: data.mensaje});
        this.obtenerTipos();

      }else if(data.codigo == 2){
        Swal.fire({icon: "info", text: data.mensaje});


      }else{
        Swal.fire({icon: "error", text: data.mensaje})
      }

      this.appModal.closeModal();

    }, err => {
      console.log(err);
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
      this.appModal.closeModal();
    });
  }


  obtenerTipos(): void{
    this.tiposService.obtenerTipos().subscribe(data=>{
      if(data.codigo == 1){
        this.tiposVehiculo = data.data;
      }else{
        Swal.fire({icon: "error", text: data.mensaje})
      }
    }, 
    err=>{
      console.log(err);
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."})
    });
  }

}
