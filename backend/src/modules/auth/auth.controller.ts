import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

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

    const moduloSolicitado = (modulo || "")
      .trim()
      .toUpperCase();

    // Buscar todos los usuarios con ese correo y contraseña
    const users = await prisma.user.findMany({
      where: {
        correo,
        password
      },
      include: {
        sede: true
      }
    });

    // No existe ningún usuario con ese correo y contraseña
    if (users.length === 0) {
      return res.status(401).json({
        message: "Credenciales incorrectas"
      });
    }

    // Buscar el usuario que tenga acceso al módulo solicitado
    const user = users.find(u => {
      const modulos = (u.modulo || "")
        .split(",")
        .map(m => m.trim().toUpperCase());

      return modulos.includes(moduloSolicitado);
    });

    // Existe el correo y contraseña, pero no tiene acceso al módulo
    if (!user) {
      return res.status(403).json({
        message: "No tienes acceso a este módulo"
      });
    }

    /* VALIDAR ROLES */
    const rolesUsuario = (user.rol || "")
      .split(",")
      .map(r => r.trim().toUpperCase());

    const hasRole = (rol: string) =>
      rolesUsuario.includes(rol.toUpperCase());

    /* SOLO PARA ADMIN */
    if (
      moduloSolicitado === "ADMIN" &&
      !hasRole("ADMIN")
    ) {
      return res.status(403).json({
        message: "No tienes permisos de administrador"
      });
    }

    return res.json(user);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Error en login"
    });

  }
};