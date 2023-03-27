import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { VehiculoDTO } from 'src/app/DTOs/VehiculoDTO';
import { TipoVehiculoService } from 'src/app/services/tipo-vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-tipo-vehiculo',
  templateUrl: './select-tipo-vehiculo.component.html',
  styleUrls: ['./select-tipo-vehiculo.component.css']
})
export class SelectTipoVehiculoComponent implements OnInit {

  constructor(private _tiposVehiculoService: TipoVehiculoService) { }

  public tipos: any;
  private _editar = false;
  private _selectValue: number;

  @ViewChild("select") select: HTMLSelectElement;

  ngOnInit(): void {
    this._tiposVehiculoService.obtenerTipos().subscribe(data => {
      if(data.codigo == 1){
        this.tipos = data.data;
        if(this._editar){
          if(data.data.length > 0){
            this.selectEvent.emit(data.data[0].idTipoVehiculo);
          }else{
            this.selectEvent.emit(0)
          }
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

  @Output() selectEvent =  new EventEmitter<number>();
  onChangeSelect($event): void{
    const value = $event.target.value;
    this.selectEvent.emit(value);
  }


  public get editar() { return this._editar;}
  @Input() public set editar(value: boolean){
   
    this._editar = value;
  }

  public get selectValue() { return this._selectValue;}
  @Input() public set selectValue(value: number){
    this._selectValue = value;
  }

  

}
