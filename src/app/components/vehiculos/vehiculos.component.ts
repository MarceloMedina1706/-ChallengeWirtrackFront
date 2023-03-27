import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoDTO } from 'src/app/DTOs/VehiculoDTO';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  public vehiculos: VehiculoDTO[];
  tituloModal: string = "";

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    this.vehiculoService.obtenerVehiculos().subscribe(data => {
      this.vehiculos = data.data;
    });
  }

  @ViewChild("modal") appModal: ModalComponent;
  abrirModal(): void{
    this.appModal.vehiculo = (new VehiculoDTO(0, 0, '', '', '', ''));
    this.appModal.titulo = "Agregar Vehículo"
    this.appModal.openModal(1);
  }
 
  abrirModalEditar(id: number): void{
    const vehiculo = this.vehiculos.filter(v => v.idVehiculo === id)[0];
    this.appModal.vehiculo = vehiculo;
    this.appModal.titulo = "Editar Vehículo"
    this.appModal.openModal(1);
  }

  abrirModalEliminar(id: number): void{
    const vehiculo = this.vehiculos.filter(v => v.idVehiculo === id)[0];
    this.appModal.vehiculo = vehiculo;
    this.appModal.titulo = "Eliminar Vehículo"
    this.appModal.openModal(2);
  }


  receiveAgregar($event): void{
    let vehiculo = $event;

    if(vehiculo.idVehiculo === 0){
      this.vehiculoService.saveVehiculo(vehiculo).subscribe(
        data => {
          if(data.codigo === 1){
            Swal.fire({
              icon: "success",
              text: data.mensaje
            });
            this.vehiculos.push(data.data);
            this.appModal.setSpinner(false);
            this.appModal.closeModal()
          }else if(data.codigo === 2){
            this.appModal.setSpinner(false)
            Swal.fire({
              icon: "info",
              title: "Cuidado",
              html: data.mensaje
            });
          }else{
            Swal.fire({icon: "error", text: data.mensaje})
          }
        }, 
        err => {
          console.log(err);
          Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
          this.appModal.closeModal();
        }
      );
    }else{
      this.vehiculoService.editarVehiculo(vehiculo).subscribe(
        data => {
          if(data.codigo === 1){
            
            Swal.fire({
              icon: "success",
              text: data.mensaje
            });
            this.vehiculoService.obtenerVehiculos().subscribe(data2 => {
              if(data2.codigo === 1){
                this.vehiculos = data2.data;
              }else{
                Swal.fire({
                  icon: "error",
                  text: data2.mensaje
                });
              }
            });
          }else{
            Swal.fire({icon: "error", text: data.mensaje})
          }
          this.appModal.setSpinner(false);
          this.appModal.closeModal()
        }, 
        err => {
          console.log(err);
          Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
          this.appModal.closeModal();
        }
      );
    }

    
  }

  receiveEliminar($event): void{
    const idVehiculo = $event;

    this.vehiculoService.verificarVehiculoViaje(idVehiculo).subscribe(data => {
      if(data.codigo == 1){
        const anyViaje = data.data;
        if(!anyViaje){
          this.eliminar(idVehiculo);
        }else{
          Swal.fire({
            title: 'Este vehículo tiene viajes asignados',
            text: "¿Queres eliminarlo de todos modos?. Los viajes serán eliminados.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.eliminarVV(idVehiculo);
            }else{
              this.appModal.setSpinner(false);
              this.appModal.closeModal()
            }
          })
        }
      }else{
        Swal.fire({icon: "error", text: data.mensaje})
      }
    }, 
    err => {
      console.log(err);
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
      this.appModal.closeModal();
    });

    
  }

  eliminar(idVehiculo: number): void{
    this.vehiculoService.eliminarVehiculo(idVehiculo).subscribe(
      data => {
        if(data.codigo === 1){
          Swal.fire({
            icon: "success",
            text: data.mensaje
          });
          this.vehiculos = this.vehiculos.filter(v => v.idVehiculo !== idVehiculo);
        }else{
          Swal.fire({icon: "error", text: data.mensaje})
        }
        this.appModal.setSpinner(false);
        this.appModal.closeModal()
      }, 
      err => {
        console.log(err);
        Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
        this.appModal.closeModal();
      }
    )
  }

  eliminarVV(idVehiculo: number): void{
    this.vehiculoService.eliminarVehiculoViaje(idVehiculo).subscribe(
      data => {
        if(data.codigo === 1){
          Swal.fire({
            icon: "success",
            text: data.mensaje
          });
          this.vehiculos = this.vehiculos.filter(v => v.idVehiculo !== idVehiculo);
        }else{
          Swal.fire({icon: "error", text: data.mensaje})
        }
        this.appModal.setSpinner(false);
        this.appModal.closeModal()
      }, 
      err => {
        console.log(err);
        Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión."});
        this.appModal.closeModal();
      }
    )
  }

}
