import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const newRoom = await prisma.room.findFirst({
        where: { id: req.body.id },
      });
      res.json({ msg: "Success", newRoom });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
