import { FastifyRequest, FastifyReply, FastifyError } from "fastify";
import { z, ZodError } from 'zod';
import { IPlatoCasosUso } from "../../core/platos/aplicacion/IPlatoCasosUso";
import { CrearPlatoEsquema, PlatoDTO } from "../esquemas/platoEsquema";
import { IPlato } from "../../core/platos/dominio/IPlato";

export class PlatoControlador {
    constructor(private platosCasosUso: IPlatoCasosUso) { }

    // Lógica para manejar la respuesta de los metodos.
    obtenerPlatos = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const platosEncontrados = await this.platosCasosUso.obtenerPlatos();

            if (platosEncontrados.length === 0) {
                return reply.code(404).send({
                    mensaje: 'No se han encontrado platos'
                });
            }

            return reply.code(200).send({
                mensaje: 'Platos encontrados correctamente.',
                platos: platosEncontrados,
                totalPlatos: platosEncontrados.length
            });
        } catch (error) {
            return reply.code(500).send({
                mensaje: 'Error al obtener los datos.',
                error: `El error ocurrido para encontrar los platos es: ${error}`
            });
        };
    };

    obtenerPlatoPorId = async (
        request: FastifyRequest<{ Params: { idPlato: string } }>,
        reply: FastifyReply) => {
        try {
            const platoEncontrado = await this.platosCasosUso.obtenerPlatoPorId(request.params.idPlato);

            if (platoEncontrado === null) {
                return reply.code(404).send({
                    mensaje: 'Plato no encontrado'
                });
            }

            return reply.code(200).send({
                mensaje: 'Plato encontrado',
                plato: platoEncontrado
            });
        } catch (err) {
            return reply.code(500).send({
                mensaje: 'Error al obtenr los datos',
                error: `El error ocurrido para encontrar el plato es: ${err}`
            })
        }
    };

    crearPlato = async (request: FastifyRequest<{ Body: PlatoDTO }>, reply: FastifyReply) => {
        try {
            const nuevoPlato = CrearPlatoEsquema.parse(request.body);
            const idNuevoPlato = await this.platosCasosUso.crearPlato(nuevoPlato);

            return reply.code(200).send({
                mensaje: 'El plato se ha creado correctamente.',
                idNuevoPlato: idNuevoPlato,
            });
        } catch (err) {
            if (err instanceof ZodError) {
                return reply.code(400).send({
                    mensaje: "Error crear un nuevo plato",
                    error: err.issues[0]?.message || "Error desconocido",
                });
            };
            return reply.code(500).send({
                mensaje: 'Error al crear el nuevo plato.',
                error: err instanceof ZodError ? err.message : String(err),
            });
        }
    };

    actualizarPlato = async (request: FastifyRequest<{ Params: { idPlato: string }, Body: IPlato }>, reply: FastifyReply) => {
        try {
            const { idPlato } = request.params;
            const platoActualizado = await this.platosCasosUso.actualizarPlato(idPlato, request.body);

            if (!platoActualizado) {
                return reply.code(404).send({
                    mensaje: 'El plato no se ha encontrado.'
                });
            }

            return reply.code(200).send({
                mensaje: 'Orden actualizada.',
                plato: platoActualizado
            });
        } catch (err) {
            return reply.code(500).send({
                mensaje: 'Error al actualizar la orden.',
                error: err instanceof ZodError ? err.message : String(err),
            });
        }
    };

    eliminarPlato = async (request: FastifyRequest<{ Params: { idPlato: string } }>, reply: FastifyReply) => {
        try {
            if (!request.params.idPlato) {
                reply.code(404).send({
                    mensaje: "El ID del plato es inválido"
                });
            }
            const plato = this.platosCasosUso.eliminarPlato(request.params.idPlato);
            if (!plato) {
                return reply.code(404).send({
                    mensaje: 'Plato no encontrado.'
                });
            }
            return reply.code(200).send({
                mensaje: 'Plato eliminado correctamente.'
            });
        } catch (err) {
            return reply.code(500).send({
                mensaje: 'Error al eliminar el plato.',
                error: err instanceof ZodError ? err.message : String(err)
            });
        }
    };
}