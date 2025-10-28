import { IPlato } from "../dominio/IPlato";
import { IPlatoCasosUso } from "./IPlatoCasosUso";
import { Plato } from "../dominio/Plato";
import { PlatoDTO } from "../../../presentacion/esquemas/platoEsquema";

const platos: IPlato[] = [];

export class PlatosCasosUsos implements IPlatoCasosUso {

    // Mostrar los platos. GET
    async obtenerPlatos(): Promise<IPlato[]> {
        return platos;
    }

    // Obtener un solo plato. GET
    async obtenerPlatoPorId(idPlato: string): Promise<IPlato | null> {

        const plato = platos.find(p => p.idPlato === String(idPlato));
        return plato ?? null;
    }

    // Crear un nuevo plato. POST
    async crearPlato(plato: PlatoDTO): Promise<string> {
        const idPlato = crypto.randomUUID();
        const nuevoPlato = new Plato(plato, idPlato);

        await platos.push(nuevoPlato);
        return nuevoPlato.idPlato;
    }

    // Actualizar un plato existente. PUT
    async actualizarPlato(idPlato: string, platoActualizado: IPlato): Promise<IPlato | null> {
        const plato = platos.find(p => p.idPlato === idPlato);
        if (!plato) return null;

        if (platoActualizado.nombrePlato) {
            plato.nombrePlato = platoActualizado.nombrePlato;
        }

        if (platoActualizado.ingredienteAdicional !== undefined) {
            plato.ingredienteAdicional = platoActualizado.ingredienteAdicional;
        }

        return plato;
    }

    // Eliminar un plato. DELETE
    async eliminarPlato(idPlato: string): Promise<void> {
        const index = platos.findIndex(p => p.idPlato === idPlato);
        if (index !== -1) platos.splice(index, 1);
    }
}