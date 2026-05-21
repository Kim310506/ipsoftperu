import { Router } from "express";
import { prisma } from "../../../config/prisma";

const router = Router();

/* ========================= */
/* LISTAR */
/* ========================= */

router.get("/", async (req, res) => {

  try {

    const users = await prisma.user.findMany({
      orderBy: {
        id: "desc"
      }
    });

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al listar usuarios"
    });

  }

});

/* ========================= */
/* CREAR */
/* ========================= */

router.post("/", async (req, res) => {

  try {

    const {
      nombre,
      correo,
      password,
      rol,
      modulo,
      sedeId
    } = req.body;

    const user = await prisma.user.create({
      data: {
        nombre,
        correo,
        password,
        rol,
        modulo,
        sedeId
      }
    });

    res.json({
      message: "Usuario creado",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al crear usuario"
    });

  }

});

/* ========================= */
/* EDITAR */
/* ========================= */

router.put("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const {
      nombre,
      correo,
      rol
    } = req.body;

    const user = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: {
        nombre,
        correo,
        rol
      }
    });

    res.json({
      message: "Usuario actualizado",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al editar usuario"
    });

  }

});

/* ========================= */
/* ELIMINAR */
/* ========================= */

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      message: "Usuario eliminado"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al eliminar usuario"
    });

  }

});

export default router;