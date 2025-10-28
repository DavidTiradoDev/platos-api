import { PlatoDTO } from "../../../presentacion/esquemas/platoEsquema";
import { IPlato } from "../dominio/IPlato";

export interface IPlatoCasosUso {
    obtenerPlatos(): Promise<IPlato[]>;
    obtenerPlatoPorId(idPlato: string): Promise<IPlato | null>;
    crearPlato(plato: PlatoDTO): Promise<string>;
    actualizarPlato(idPlato: string, platoActualizado: IPlato): Promise<IPlato | null>;
    eliminarPlato(idPlato: string): Promise<void>;
}