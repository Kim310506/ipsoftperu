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
      password
    } = req.body;

    const user = await prisma.user.findFirst({

      where: {

        correo,
        password

      }

    });

    if (!user) {

      return res.status(401).json({

        message: "Credenciales incorrectas"

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
