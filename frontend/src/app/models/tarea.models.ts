
export class TareaModel {
    _id:string;
    nombre: string;
    descripcion:string;
    usuario: string;
    disponible: boolean;

    constructor() {
        this.disponible = true;
    }
}

