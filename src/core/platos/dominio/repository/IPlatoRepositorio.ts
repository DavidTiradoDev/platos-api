import { IPlato } from "../IPlato";

export interface IPlatoRepositorio {
    crearPlato(datosPlato: IPlato): Promise<string>;
    listarPlatos(limite?: number): Promise<IPlato[]>;
    obtenerPlatoPorId(idPlato: string): Promise<IPlato | null>;
    actualizarPlato(id: string, datosPlato: IPlato): Promise<IPlato>;
    eliminarPlato(id: string): Promise<void>;
}
