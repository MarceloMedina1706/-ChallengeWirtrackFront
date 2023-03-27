export class CiudadDTO {
    idCiudad: number;
    nombreCiudad: string;
    pais: string;


    constructor(idCiudad: number, nombreCiudad: string, pais: string){
        this.idCiudad = idCiudad;
        this.nombreCiudad = nombreCiudad;
        this.pais = pais;
    }

}