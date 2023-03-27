import { Component, OnInit, ViewChild } from '@angular/core';
import { ViajeDTO } from 'src/app/DTOs/ViajeDTO';
import { ViajeService } from 'src/app/services/viaje.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  constructor(private _viajeService: ViajeService) { }

  viajes: ViajeDTO[];
  viajesFiltrado: ViajeDTO[];

  filtroTipo: number = 0;
  filtroCiudadDestino: number = 0;
  filtroFechaSalida: string = "";

  ngOnInit(): void {
    this.getViajes();
  }


  getViajes(): void{
    this._viajeService.obtenerViajes().subscribe(data => {
      if(data.codigo === 1){
        this.viajes = data.data;
        this.viajesFiltrado = data.data;
      }else{
        Swal.fire({icon: "error", text: data.mensaje})
      }
    }, 
    err => {
      console.log(err);
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
    });
  }

  @ViewChild("modal") appModal: ModalComponent;
  abrirModal(): void{
    this.appModal.titulo = "Asignar viaje"
    this.appModal.viaje = new ViajeDTO(0, 0, 0, 0, new Date());
    this.appModal.repViaje = false;
    this.appModal.openModal(3);
  }

  onEliminar($event): void{
    this.appModal.titulo = "Eliminar viaje"
    this.appModal.viaje = $event;
    this.appModal.openModal(4);
  }

  receiveAsignar($event): void{
    const viaje = $event;
    if(viaje.idViaje == 0){

      this._viajeService.asignarViaje(viaje).subscribe(data => {
        if(data.codigo == 1){
          const v = data.data;
          const pronostico = v.pronostico;
          if(pronostico?.id != 0){
            this.appModal.closeModal();
            const fecha = viaje.fechaSalida?.toString().split("T")[0];
            this.appModal.icon = pronostico.icon;
            this.appModal.viajeFecha = fecha;
            this.appModal.pronostico = pronostico.description;
            this.appModal.viaje = v;
            this.appModal.openModal(5);
          
          }else{
            Swal.fire({icon: "success", text: data.mensaje});
            this.getViajes();
            this.appModal.closeModal();
          }
          //this.appModal.closeModal();
        }
      }, 
      err => {
        console.log(err);
        Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
      });

    }else{
      const fecha = `${viaje.fechaSalida}T00:00:00`;
      this._viajeService.reprogramarViaje(viaje.idViaje, fecha).subscribe(data => {
        if(data.codigo == 1){
          const v = data.data;
          const pronostico = v.pronostico;
          if(pronostico?.id != 0){
            this.appModal.closeModal();
            const fecha = viaje.fechaSalida?.toString().split("T")[0];
            this.appModal.icon = pronostico.icon;
            this.appModal.viajeFecha = fecha;
            this.appModal.pronostico = pronostico.description;
            this.appModal.viaje = v;
            this.appModal.openModal(5);
          
          }else{
            Swal.fire({icon: "success", text: data.mensaje});
            this.appModal.closeModal();
            this.getViajes();
          }
          // this.getViajes();
          // Swal.fire({icon: "success", text: data.mensaje});
        }else{
            Swal.fire({icon: "error", text: data.mensaje})
            this.appModal.closeModal();
            this.getViajes();
        }
        //this.appModal.closeModal();
      }, 
      err => {
        console.log(err);
        Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
      });
    }
    
    //this.appModal.closeModal();
  }

  eliminarViaje($event): void{
    const id = $event
    this._viajeService.eliminarViaje(id).subscribe(data => {
      if(data.codigo == 1){
        this.getViajes();
        Swal.fire({icon: "success", text: data.mensaje});
        this.appModal.closeModal();
      }else{
        this.getViajes();
        Swal.fire({icon: "error", text: data.mensaje});
        this.appModal.closeModal();
      }
    }, 
    err => {
      console.log(err);
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
    });
  }

  guargarViaje(): void{
    Swal.fire({icon: "success", text: "El viaje se guardó correctamente."});
    this.getViajes();
    this.appModal.closeModal();
  }

  filtroTipoVehi($event): void{

    const filtro = $event == "" ? 0 : $event;
    this.filtroTipo = filtro
    if($event != ""){
      this.viajesFiltrado = this.viajes.filter(v => v.vehiculo.idTipoVehiculo == filtro);
    }else{
      this.viajesFiltrado = this.viajes;
    }

    if(this.filtroCiudadDestino != 0 ){
      this.viajesFiltrado = this.viajesFiltrado.filter(v => v.idCiudadHasta == this.filtroCiudadDestino)
    }

    if(this.filtroFechaSalida != "" ){
      this.viajesFiltrado = this.viajesFiltrado.filter(v => v.fechaSalida.toString() == this.filtroFechaSalida);
    }

    if($event != ""){
      this.viajesFiltrado = this.viajesFiltrado.filter(v => v.vehiculo.idTipoVehiculo == $event);
    }
  }

  filtroDestino($event): void{
    const filtro = $event == "" ? 0 : $event;
    this.filtroCiudadDestino = filtro;

    if($event != ""){
      this.viajesFiltrado = this.viajesFiltrado.filter(v => v.idCiudadHasta == filtro);
    }else{
      this.viajesFiltrado = this.viajes;
    }

    if(this.filtroTipo != 0 ){
      this.viajesFiltrado = this.viajesFiltrado.filter(v => v.vehiculo.idTipoVehiculo ==this.filtroTipo);
    }

    if(this.filtroFechaSalida != "" ){
      this.viajesFiltrado = this.viajesFiltrado.filter(v => v.fechaSalida.toString() == this.filtroFechaSalida);
    }
    
  }

  filtroFecha($event): void{
    const filtro = $event == "" ? "" : `${$event}T00:00:00`;
    this.filtroFechaSalida = filtro;


    if($event != ""){
      this.viajesFiltrado = this.viajesFiltrado.filter(v => v.fechaSalida.toString() == filtro);
    }else{
      this.viajesFiltrado = this.viajes;
    }

    if(this.filtroTipo != 0 ){
      this.viajesFiltrado = this.viajesFiltrado.filter(v => v.vehiculo.idTipoVehiculo ==this.filtroTipo);
    }

    if(this.filtroCiudadDestino != 0 ){
      this.viajesFiltrado = this.viajesFiltrado.filter(v => v.idCiudadHasta == this.filtroCiudadDestino)
    }
    
  }

  reprogramar(viaje: ViajeDTO): void{
    this.appModal.titulo = "Reprogramar viaje"
    this.appModal.viaje = viaje;
    this.appModal.repViaje = true;
    this.appModal.openModal(3);
  }

  formatDateOnly(date: Date): string{

    return date?.toString().split("T")[0];;
  }
}
