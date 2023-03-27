import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PronosticoDTO } from '../DTOs/PronosticoDTO';
import { ViajeDTO } from '../DTOs/ViajeDTO';


type ResponseAsignarViajes = {
  codigo: number,
  mensaje: string,
  data: ViajeDTO
}

type ResponseObtenerViajes = {
  codigo: number,
  mensaje: string,
  data: ViajeDTO[]
}

type ResponsePronostico = {
  codigo: number,
  mensaje: string,
  data: PronosticoDTO
}

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private httpClient: HttpClient) { }

  private _apiUrl = environment.urlApiViajes;

  obtenerViajes(): Observable<ResponseObtenerViajes> {
    return this.httpClient.get<ResponseObtenerViajes>(`${this._apiUrl}ListaViajes`);
  }

 
  varificarPronostico(idCiudad: number, fecha: Date):  Observable<ResponsePronostico> {
    return this.httpClient.get<ResponsePronostico>(`${this._apiUrl}VerificarPronostico/${idCiudad}/${fecha}`);
  }

  asignarViaje(viaje: ViajeDTO): Observable<ResponseAsignarViajes> {
    return this.httpClient.post<ResponseAsignarViajes>(`${this._apiUrl}AsignarViaje`, viaje);
  }

  reprogramarViaje(idViaje: number, fecha: string){
    const json = {
      idViaje,
      fecha
    }
    return this.httpClient.put<ResponseAsignarViajes>(`${this._apiUrl}ReprogramarViaje`, json);
  }

 eliminarViaje(idViaje: number){
    return this.httpClient.delete<ResponseAsignarViajes>(`${this._apiUrl}EliminarViaje/${idViaje}`);
  }
}
