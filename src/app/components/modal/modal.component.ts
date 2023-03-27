import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CiudadDTO } from 'src/app/DTOs/CiudadDTO';
import { TipoVehiculoDTO } from 'src/app/DTOs/TipoVehiculoDTO';
import { VehiculoDTO } from 'src/app/DTOs/VehiculoDTO';
import { ViajeDTO } from 'src/app/DTOs/ViajeDTO';
import { VehiculoFormComponent } from '../vehiculos/vehiculo-form/vehiculo-form.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  
  @ViewChild('modalVehiculoForm') modalVehiculoForm: ElementRef;
  @ViewChild('modalDatosVehiculo') modalDatosVehiculo: ElementRef;
  @ViewChild('modalAsignarViaje') modalAsignarViaje: ElementRef;
  @ViewChild('modalSeleccionarVehiculo') modalSeleccionarVehiculo: ElementRef;
  @ViewChild('modalDatosViaje') modalDatosViaje: ElementRef;
  @ViewChild('modalAdvertenciaViaje') modalAdvertenciaViaje: ElementRef;
  @ViewChild('modalCiudadForm') modalCiudadForm: ElementRef;
  @ViewChild('modalDatosCiudad') modalDatosCiudad: ElementRef;
  @ViewChild('modalAgregarTipo') modalAgregarTipo: ElementRef;
  @ViewChild('modalDatosTipo') modalDatosTipo: ElementRef;


  public vehiculos: VehiculoDTO[];
  public vehiculo: VehiculoDTO;
  public viaje: ViajeDTO;
  public viajeFecha: string;
  public pronostico: string;
  public icon: string = "";

  public ciudad: CiudadDTO;
  public tipoVehiculo: TipoVehiculoDTO;

  public repViaje: boolean;
  public titulo: string;
  public spinner: boolean = false;

  constructor(public modal: NgbModal) {}

  ngOnInit(): void {}

  openModal(idModal: number): void {
    switch (idModal) {
      case 1:
        this.modal.open(this.modalVehiculoForm);
        break;
      case 2:
        this.modal.open(this.modalDatosVehiculo);
        break;
      case 3:
        this.modal.open(this.modalAsignarViaje, { size: 'lg' });
        break;
      case 4:
        this.modal.open(this.modalDatosViaje);
        break;
      case 5:
        this.modal.open(this.modalAdvertenciaViaje);
        break;
      case 6:
        this.modal.open(this.modalCiudadForm);
        break;
      case 7:
        this.modal.open(this.modalDatosCiudad);
        break;
      case 8:
        this.modal.open(this.modalAgregarTipo);
        break;
      case 9:
        this.modal.open(this.modalDatosTipo);
        break;
    }
  }

  closeModal(): void {
    this.modal.dismissAll();
  }

  setSpinner(value: boolean){
    this.spinner = value;
  }

  @Output() agregarEvent = new EventEmitter<VehiculoDTO>();
  receiveAgregar($event): void {
    const vehiculo = $event;
    this.spinner = true;
    this.agregarEvent.emit(vehiculo);
  }

  @Output() eliminarEvent = new EventEmitter<number>();
  eliminarVehiculo(): void {
    this.spinner = true;
    this.eliminarEvent.emit(this.vehiculo.idVehiculo);
  }

  @Output() asignarViajeEvent = new EventEmitter();
  receiveAsignar($event): void {
    this.spinner = true;
    this.asignarViajeEvent.emit($event);
  }

  @Output() selecVehiculoEvent = new EventEmitter();
  selectVehiculo(ve: VehiculoDTO): void{
    console.log(ve)
  }

  @Output() eliminarViajeEvent = new EventEmitter<number>();
  eliminarViaje(): void {
    
 //console.log(this.viaje.idVehiculo);
    this.spinner = true;
    this.eliminarViajeEvent.emit(this.viaje.idViaje);
  }

  @Output() reproViajeEvent = new EventEmitter<ViajeDTO>();
  reproViaje(): void {
    this.spinner = true;
    this.reproViajeEvent.emit(this.viaje);
  }

  @Output() guardarViajeEvent = new EventEmitter();
  guargarViaje(): void {
    this.spinner = true;
    this.guardarViajeEvent.emit();
  }

  @Output() agregaCiduadrEvent = new EventEmitter<CiudadDTO>();
  agregaCiudad($event): void {
    const ciudad = $event;
    this.spinner = true;
    this.agregaCiduadrEvent.emit(ciudad);
  }

  @Output() eliminarCiudadEvent = new EventEmitter<number>();
  eliminarCiudad(): void {
    this.spinner = true;
    this.eliminarCiudadEvent.emit(this.ciudad.idCiudad);
  }

  @Output() agregaTipoEvent = new EventEmitter<TipoVehiculoDTO>();
  agregarTipo($event): void {
    const tipo = $event;
    this.agregaTipoEvent.emit(tipo);
  }

  @Output() eliminarTipoEvent = new EventEmitter<number>();
  eliminarTipo(): void {
    this.spinner = true;
    this.eliminarTipoEvent.emit(this.tipoVehiculo.idTipoVehiculo);
  }

  formatDate(date: Date): string{
    return date.toString().split("T")[0];
  }
}
