import { IPlatoRepositorio } from "../../dominio/repositorio/IPlatoRepositorio";
import { ejecutarConsulta } from "./ClientePostgres";
import { IPlato } from "../../dominio/IPlato";

export class PlatoRepositorio implements IPlatoRepositorio {
    async crearPlato(datosPlato: IPlato): Promise<string> {
        const columnas = Object.keys(datosPlato).map((key) => key.toLowerCase());
        const parametros: Array<string | number> = Object.values(datosPlato);
        const placeholders = columnas.map((_, i) => `$${i + 1}`).join(", ");

        const query = `
      INSERT INTO platos (${columnas.join(", ")})
      VALUES (${placeholders})
      RETURNING *  -- aquí Postgres genera el id automáticamente
    `;

        const respuesta = await ejecutarConsulta(query, parametros);
        return respuesta.rows[0].idplato;
    }

    async listarPlatos(limite?: number): Promise<IPlato[]> {
        let query = "SELECT * FROM platos";
        const valores: number[] = [];

        if (limite !== undefined) {
            query += " LIMIT $1";
            valores.push(limite);
        }

        const result = await ejecutarConsulta(query, valores);
        return result.rows;
    }

    async obtenerPlatoPorId(idPlato: string): Promise<IPlato | null> {
        const query = "SELECT * FROM platos WHERE idPlato = $1";
        const result = await ejecutarConsulta(query, [idPlato]);
        return result.rows[0] || null;
    }

    async actualizarPlato(id: string, datosPlato: IPlato): Promise<IPlato> {
        const columnas = Object.keys(datosPlato).map((key) => key.toLowerCase());
        const parametros = Object.values(datosPlato);
        const setClause = columnas.map((col, i) => `${col}=$${i + 1}`).join(", ");
        parametros.push(id);

        const query = `
      UPDATE platos
      SET ${setClause}
      WHERE idplato=$${parametros.length}
      RETURNING *;
    `;

        const result = await ejecutarConsulta(query, parametros);
        return result.rows[0];
    }

    async eliminarPlato(idPlato: string): Promise<void> {
        await ejecutarConsulta("DELETE FROM platos WHERE idplato = $1", [idPlato]);
    }
}
