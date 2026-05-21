import { z } from "zod";

export const ambienteSchema = z.object({

  nombre: z.string()
    .min(1, "El nombre es obligatorio"),

  pisoId: z.number()

});