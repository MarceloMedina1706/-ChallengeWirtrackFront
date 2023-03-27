export class VehiculoDTO {
    idVehiculo: number;
    idTipoVehiculo: number;
    tipoVehiculo: string;
    modelo: string;
    marca: string;
    patente: string;


    constructor(IdVehiculo: number, idTipoVehiculo: number, TipoVehiculo: string, Modelo: string, Marca: string, Patente: string){
        this.idVehiculo = IdVehiculo;
        this.idTipoVehiculo = idTipoVehiculo;
        this.tipoVehiculo = TipoVehiculo;
        this.modelo = Modelo;
        this.marca = Marca;
        this.patente = Patente;
    }

}