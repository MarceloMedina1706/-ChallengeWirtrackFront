import { Component, OnInit, ViewChild } from '@angular/core';
import { CiudadDTO } from 'src/app/DTOs/CiudadDTO';
import { CiudadService } from 'src/app/services/ciudad.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  constructor(private ciudadService: CiudadService) { }

  ciudades: CiudadDTO[];
  accion: number = 1; // 1 agregar, 2 editar

  ngOnInit(): void {
    this.obtenerCiudades();
  }

  @ViewChild("modal") appModal: ModalComponent;
  abrirModal(): void{
    this.accion = 1;
    this.appModal.ciudad = (new CiudadDTO(0, '', ''));
    this.appModal.titulo = "Agregar Ciudad"
    this.appModal.openModal(6);
  }

  abrirModalEditar(ciudad: CiudadDTO): void{
    this.accion = 2;
    this.appModal.ciudad = ciudad;
    this.appModal.titulo = "Editar Ciudad"
    this.appModal.openModal(6);
  }

  abrirModalEliminar(ciudad: CiudadDTO): void{
    this.appModal.titulo = "Eliminar Ciudad";
    this.appModal.ciudad = ciudad;
    this.appModal.openModal(7);
  }

  recieveCiudad($event): void{
    const ciudad = $event;
    if(this.accion == 1){
      this.ciudadService.agregarCiudad(ciudad).subscribe(data => {
        if(data.codigo == 1){
          this.appModal.setSpinner(false);
          this.appModal.closeModal();
          this.ciudades.push(ciudad);
        }else if(data.codigo == 2){
          this.appModal.setSpinner(false)
            Swal.fire({
              icon: "info",
              title: "Cuidado",
              html: data.mensaje
            });
        }else{
          Swal.fire({icon: "error", text: data.mensaje});
        }
      },
      err => {
        console.log(err)
        Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión"});
      });
    }else{
      this.ciudadService.editarCiudad(ciudad).subscribe(data => {
        if(data.codigo == 1){
          this.appModal.setSpinner(false);
          this.appModal.closeModal();
          this.obtenerCiudades();
        }else{
          Swal.fire({icon: "error", text: data.mensaje});
        }
      },
      err => {
        console.log(err)
        Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión"});
      });
    }
  }

  recieveEliminar($event): void{
    const idCiudad = $event;
    this.ciudadService.verificarCiudad(idCiudad).subscribe(data => {
      if(data.codigo == 1){
        const anyViaje = data.data;
        if(!anyViaje){
          this.eliminarCiudad(idCiudad);
        }else{
          Swal.fire({
            title: 'Esta ciudad tiene viajes asignados',
            text: "¿Queres eliminarlo de todos modos?. Los viajes serán eliminados.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.eliminarCiudadViaje(idCiudad);
            }else{
              this.appModal.setSpinner(false);
              this.appModal.closeModal()
            }
          })
        }
      }else{
        Swal.fire({icon: "error", text: data.mensaje});
      }
    },
    err => {
      console.log(err)
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión"});
    });
  }

  obtenerCiudades(): void{
    this.ciudadService.obtenerCiudades().subscribe(data => {
      if(data.codigo == 1){
        this.ciudades = data.data;
      }else{
        Swal.fire({icon: "error", text: data.mensaje});
      }
    },
    err => {
      console.log(err)
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión"});
    }
    );
  }

  eliminarCiudad(idCiudad: number): void{
    this.ciudadService.eliminarCiudad(idCiudad).subscribe(data => {
      if(data.codigo === 1){
        Swal.fire({
          icon: "success",
          text: data.mensaje
        });
        this.ciudades = this.ciudades.filter(c => c.idCiudad !== idCiudad);
      }else{
        Swal.fire({icon: "error", text: data.mensaje});
      }
      this.appModal.setSpinner(false);
      this.appModal.closeModal()
    },
    err => {
      console.log(err)
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión"});
    })
  }

  eliminarCiudadViaje(idCiudad: number): void{
    this.ciudadService.eliminarCiudadViaje(idCiudad).subscribe(data => {
      if(data.codigo === 1){
        Swal.fire({
          icon: "success",
          text: data.mensaje
        });
        this.ciudades = this.ciudades.filter(c => c.idCiudad !== idCiudad);
      }else{
        Swal.fire({icon: "error", text: data.mensaje});
      }
      this.appModal.setSpinner(false);
      this.appModal.closeModal()
    },
    err => {
      console.log(err)
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión"});
    })
  }

}
