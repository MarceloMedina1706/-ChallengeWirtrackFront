import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CiudadDTO } from '../DTOs/CiudadDTO';

type ResponseObtenerCiudades = {
  codigo: number,
  mensaje: string,
  data: CiudadDTO[],
}

type ResponseAgregarCiudades = {
  codigo: number,
  mensaje: string,
  data: CiudadDTO,
}


@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private httpClient: HttpClient) { }

  private _apiUrl = environment.urlApiCiudad;

  obtenerCiudades(): Observable<ResponseObtenerCiudades> {
    return this.httpClient.get<ResponseObtenerCiudades>(`${this._apiUrl}ListaCiudades`);
  }

  agregarCiudad(ciudad: CiudadDTO): Observable<ResponseAgregarCiudades> {
    return this.httpClient.post<ResponseAgregarCiudades>(`${this._apiUrl}AgregarCiudad`, ciudad);
  }

  editarCiudad(ciudad: CiudadDTO): Observable<ResponseAgregarCiudades> {
    return this.httpClient.put<ResponseAgregarCiudades>(`${this._apiUrl}EditarCiudad`, ciudad);
  }

  eliminarCiudad(ciudad: number): Observable<ResponseAgregarCiudades> {
    return this.httpClient.delete<ResponseAgregarCiudades>(`${this._apiUrl}EliminarCiudad/${ciudad}`);
  }

  eliminarCiudadViaje(ciudad: number): Observable<ResponseAgregarCiudades> {
    return this.httpClient.delete<ResponseAgregarCiudades>(`${this._apiUrl}EliminarCiudadViaje/${ciudad}`);
  }

  verificarCiudad(ciudad: number): Observable<ResponseAgregarCiudades> {
    return this.httpClient.get<ResponseAgregarCiudades>(`${this._apiUrl}VerificarCiudadViaje/${ciudad}`);
  }
}
