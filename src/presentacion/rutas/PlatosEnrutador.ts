import { FastifyInstance } from "fastify";
import { PlatoControlador } from "../controladores/PlatoControlador";
import { PlatosCasosUsos } from "../../core/platos/aplicacion/PlatosCasosUso";

function platosEnrutador(app: FastifyInstance, platosControlador: PlatoControlador) {
    app.get('/platos', platosControlador.obtenerPlatos);
    app.get('/platos/:idPlato', platosControlador.obtenerPlatoPorId);
    app.post('/platos', platosControlador.crearPlato);
    app.put('/platos/:idPlato', platosControlador.actualizarPlato);
    app.delete('/platos/:idPlato', platosControlador.eliminarPlato);
}

export async function construirPlatosEnrutador(app: FastifyInstance) {
    const platoCasoUso = new PlatosCasosUsos();
    const platosControlador = new PlatoControlador(platoCasoUso);

    platosEnrutador(app, platosControlador);
}
