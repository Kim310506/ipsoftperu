import { prisma } from "../../config/prisma";

export const crearRiesgoService = async (
  data: any,
  file: any
) => {
    console.log("DATA:");
  console.log(data);

  console.log("FILE:");
  console.log(file);

  const codigo = `RIE-${Date.now()}`;

  const riesgo =
    await prisma.registroRiesgo.create({

      data: {

        codigo,

        sedeId:
          Number(data.sedeId),

        pabellonId:
          Number(data.pabellonId),

        pisoId:
          Number(data.pisoId),

        ambienteId:
          Number(data.ambienteId),

        categoria:
          data.categoria,

        riesgo:
          data.riesgo,

        probabilidad:
          Number(data.probabilidad),

        impacto:
          Number(data.impacto),

        nivel:
          Number(data.nivel),

        descripcion:
          data.descripcion,

        foto:
          file
            ? `/uploads/riesgos/${file.filename}`
            : null

      }

    });

  return riesgo;
};