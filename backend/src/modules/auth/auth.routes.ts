import { Router } from "express";
import { prisma } from "../../config/prisma";

const router = Router();

router.post("/login", async (req, res) => {

try {
const { correo, password } = req.body;

const user = await prisma.user.findFirst({
  where: {
    correo,
    password
  },
   include: {
    sede: true
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
  message: "Error servidor"
});
}

});

export default router;
