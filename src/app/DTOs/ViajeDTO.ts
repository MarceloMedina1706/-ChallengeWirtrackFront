import { PronosticoDTO } from "./PronosticoDTO";
import { VehiculoDTO } from "./VehiculoDTO";

export class ViajeDTO {
  idViaje: number;
  idVehiculo: number;
  idCiudadDesde: number;
  idCiudadHasta: number;
  fechaSalida: Date;

  vehiculo: VehiculoDTO;
  ciudadDesde: string;
  ciudadHasta: string;

  pronostico: PronosticoDTO;

  constructor(
    idViaje: number,
    idVehiculo: number,
    idCiudadDesde: number,
    idCiudadHasta: number,
    fechaSalida: Date
  ) {
    this.idViaje = idViaje;
    this.idVehiculo = idVehiculo;
    this.idCiudadDesde = idCiudadDesde;
    this.idCiudadHasta = idCiudadHasta;
    this.fechaSalida = fechaSalida;
  }
}
