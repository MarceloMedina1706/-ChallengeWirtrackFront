import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { VehiculoDTO } from '../DTOs/VehiculoDTO';

type ResponseObtenerVehiculos = {
  codigo: number;
  mensaje: string | null;
  data: VehiculoDTO[] | null;

}

type ResponseAgregarVehiculos = {
  codigo: number;
  mensaje: string | null;
  data: VehiculoDTO | null;

}

type ResponseVerificar = {
  codigo: number;
  mensaje: string | null;
  data: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private httpClient: HttpClient) { }

  private _apiUrl = environment.urlApiVehiculos;


  obtenerVehiculos(): Observable<ResponseObtenerVehiculos> {
    return this.httpClient.get<ResponseObtenerVehiculos>(`${this._apiUrl}ListaVehiculos`);
  }

  obtenerVehiculosNoAsginado(): Observable<ResponseObtenerVehiculos> {
    return this.httpClient.get<ResponseObtenerVehiculos>(`${this._apiUrl}ListaVehiculosNoAsignado`);
  }

  editarVehiculo(vehiculo: VehiculoDTO): Observable<ResponseAgregarVehiculos> {
   
    return this.httpClient.put<ResponseAgregarVehiculos>(`${this._apiUrl}EditarVehiculo`, vehiculo);
  }

  saveVehiculo(vehiculo: VehiculoDTO): Observable<ResponseAgregarVehiculos> {
    return this.httpClient.post<ResponseAgregarVehiculos>(`${this._apiUrl}AgregarVehiculo`, vehiculo);
  }

  eliminarVehiculo(idVehiculo: number): Observable<ResponseAgregarVehiculos> {
    return this.httpClient.delete<ResponseAgregarVehiculos>(`${this._apiUrl}EliminarVehiculo/${idVehiculo}`);
  }

  eliminarVehiculoViaje(idVehiculo: number): Observable<ResponseAgregarVehiculos> {
    return this.httpClient.delete<ResponseAgregarVehiculos>(`${this._apiUrl}EliminarVehiculoViaje/${idVehiculo}`);
  }

  verificarVehiculoViaje(idVehiculo: number): Observable<ResponseVerificar> {
    return this.httpClient.get<ResponseVerificar>(`${this._apiUrl}VerificarVehiculoViaje/${idVehiculo}`);
  }
}
