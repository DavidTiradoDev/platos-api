import { ICitasMedicas } from "../../dominio/entidades/citasMedicas/ICitasMedicas.js";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";


export class ObtenerCitasMedicasCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(): Promise<ICitasMedicas[]> {
        return await this.repositorio.obtenerCitasMedicas();
    }
}