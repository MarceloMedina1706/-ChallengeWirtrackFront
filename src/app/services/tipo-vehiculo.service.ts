import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoVehiculoDTO } from '../DTOs/TipoVehiculoDTO';


type ResponseObtenerTipos = {
  codigo: number;
  mensaje: string;
  data: TipoVehiculoDTO[]
}

type ResponseAgregarTipo = {
  codigo: number;
  mensaje: string;
  data: TipoVehiculoDTO
}


@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  constructor(private httpClient: HttpClient) { }

  private _apiUrl = environment.urlApiTiposVehiculo

  obtenerTipos(): Observable<ResponseObtenerTipos> {
    return this.httpClient.get<ResponseObtenerTipos>(`${this._apiUrl}ListaTiposVehiculo`);
  }

  agregarTipo(tipo: TipoVehiculoDTO): Observable<ResponseAgregarTipo> {
    return this.httpClient.post<ResponseAgregarTipo>(`${this._apiUrl}AgregarTipoVehiculo`, tipo);
  }

  editarTipo(tipo: TipoVehiculoDTO): Observable<ResponseAgregarTipo> {
    return this.httpClient.put<ResponseAgregarTipo>(`${this._apiUrl}EditarTipoVehiculo`, tipo);
  }

  eliminarTipo(idTipo: TipoVehiculoDTO): Observable<ResponseAgregarTipo> {
    return this.httpClient.delete<ResponseAgregarTipo>(`${this._apiUrl}EliminarTipoVehiculo/${idTipo}`);
  }
}
