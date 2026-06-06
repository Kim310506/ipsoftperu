import { Request, Response } from "express";

import { prisma } from "../../config/prisma";

/* ========================= */
/* LOGIN */
/* ========================= */

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      correo,
      password,
      modulo
    } = req.body;
console.log("BODY:", req.body);

    const user = await prisma.user.findFirst({

      where: {
        correo,
        password
      },
       include: {
    sede: true
  }

    });

    /* USUARIO NO EXISTE */
    if (!user) {

      return res.status(401).json({

        message: "Credenciales incorrectas"

      });

    }
/* VALIDAR MODULOS */

const modulosUsuario =
  (user.modulo || "")
    .split(",")
    .map(m => m.trim().toUpperCase());
    const rolesUsuario =
      (user.rol || "")
        .split(",")
        .map(r => r.trim().toUpperCase());
    const hasRole = (r: string) =>
      rolesUsuario.includes(r);
const moduloSolicitado =
  (modulo || "")
    .trim()
    .toUpperCase();

if (
  !modulosUsuario.includes(
    moduloSolicitado
  )
) {

  return res.status(403).json({
    message:
      "No tienes acceso a este módulo"
  });

}

/* SOLO PARA ADMIN */
if (moduloSolicitado === "ADMIN" && !hasRole("ADMIN")) {
  return res.status(403).json({
    message:
      "No tienes permisos de administrador"
  });

}
    res.json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Error en login"

    });

  }

};