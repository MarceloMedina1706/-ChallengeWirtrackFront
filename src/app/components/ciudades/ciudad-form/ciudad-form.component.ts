import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadDTO } from 'src/app/DTOs/CiudadDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudad-form',
  templateUrl: './ciudad-form.component.html',
  styleUrls: ['./ciudad-form.component.css']
})
export class CiudadFormComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  public ciudadForm: FormGroup;
  @Input() public spinner: boolean = false;

  ngOnInit(): void {
  }

  private _ciudad: CiudadDTO;
  public get ciudad() {
    return this._ciudad;
  }
  @Input() public set ciudad(value: CiudadDTO) {
    this._ciudad = value;
    const readonly = value.idCiudad != 0;

    const id = value?.idCiudad == 0 ? '' : value?.idCiudad;

    this.ciudadForm = this.fb.group({
      idCiudad: [{ value: id, disabled: readonly }, Validators.compose([Validators.required, Validators.min(0)])],
      nombreCiudad: [value?.nombreCiudad ?? '', Validators.compose([Validators.required, Validators.minLength(3)])],
      pais: [value?.pais ?? '', Validators.compose([Validators.required, Validators.minLength(3)])],
    },
    { validator: []});
  }



  @Output() agregarEvent = new EventEmitter<CiudadDTO>();
  onSave(): void{

    if(this.ciudadForm.controls['idCiudad']?.status.toString() === "INVALID"){
      Swal.fire({icon: "warning", text: "Ingrese una Id válida."});
      return;
    }

    if(this.ciudadForm.controls['nombreCiudad']?.status.toString() === "INVALID"){
      Swal.fire({icon: "warning", text: "Ingrese un nombre válido."});
      return;
    }

    if(this.ciudadForm.controls['pais']?.status.toString() === "INVALID"){
      Swal.fire({icon: "warning", text: "Ingrese un país válido."});
      return;
    }



    const id = this.ciudadForm.get('idCiudad')?.value;
    const nombreCiudad = this.ciudadForm.get('nombreCiudad')?.value ?? '';
    const pais = this.ciudadForm.get('pais')?.value ?? '';

    const c = new CiudadDTO(id, nombreCiudad, pais);
    //this.spinner = true;
    this.agregarEvent.emit(c);
  }

  @Output() cancelarEvent = new EventEmitter();  
  cancelar(): void{
    this.cancelarEvent.emit();
  }
}
