import { z } from "zod";

export const CrearPlatoEsquema = z.object({
    nombrePlato: z
        .string()
        .nonempty('El nombre es obligatorio')
        .min(10)
        .max(50),
    ingredienteAdicional: z
        .string()
        .optional()
        .transform((val) => val ?? null),
});

export type PlatoDTO = z.infer<typeof CrearPlatoEsquema>;
