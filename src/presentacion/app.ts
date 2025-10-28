import Fastify from "fastify";
import { construirPlatosEnrutador } from "./rutas/PlatosEnrutador";

const app = Fastify({ logger: true });

app.register(
    async (appInstance) => {
        construirPlatosEnrutador(appInstance);

    },
    { prefix: '/api' },
);

export const startServer = () => {
    try {
        app.listen({ port: 3080 });
        app.log.info('El servidor está corriendo...');
    } catch (err) {
        app.log.error(`Error al ejecutar el servidor: ${err}`);
    };
};
