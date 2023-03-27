export class TipoVehiculoDTO {
    idTipoVehiculo: number;
    descripcion: string;

    constructor(idTipoVehiculo: number, descripcion: string){
        this.idTipoVehiculo = idTipoVehiculo;
        this.descripcion = descripcion;
    }
}