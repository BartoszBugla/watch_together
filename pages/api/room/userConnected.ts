import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { users } = await prisma.room.findFirst({
        where: { id: req.body.roomId },
        select: {
          users: true,
        },
      });
      const newRoom = await prisma.room.update({
        where: { id: req.body.roomId },
        data: {
          users: { set: [...users, req.body.host] },
        },
      });
      res.json({ msg: "Success", room: newRoom });
    } catch (error) {
      console.log(error);
    }
  }
};
export default handler;
