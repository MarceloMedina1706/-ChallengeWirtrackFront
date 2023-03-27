import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CiudadDTO } from 'src/app/DTOs/CiudadDTO';
import { CiudadService } from 'src/app/services/ciudad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-ciudades',
  templateUrl: './select-ciudades.component.html',
  styleUrls: ['./select-ciudades.component.css']
})
export class SelectCiudadesComponent implements OnInit {

  constructor(private _ciudadService: CiudadService) { }

  ciudades: CiudadDTO[] = []

  ngOnInit(): void {
  
    this._ciudadService.obtenerCiudades().subscribe(data => {
      if(data.codigo === 1){
        this.ciudades = data.data;
      }else{
        Swal.fire({icon: "error", text: data.mensaje});
      }
    },
    err => {
      console.log(err)
      Swal.fire({icon: "error", text: "Ha ocurrido un error de conexión"});
    });
  }


  @Output() selectEvent = new EventEmitter<number>();
  onSelectCiudad($event): void{
    const value = $event.target.value;
    this.selectEvent.emit(value);
  }

}
