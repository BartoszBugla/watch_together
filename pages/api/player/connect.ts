import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import pusher from "helpers/pusher";
import ApiHandler from "helpers/apiHandler";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await ApiHandler(req, res, "POST", async () => {
    const { roomId, userId } = req.body;
    const users = await prisma.room.findFirst({
      where: {
        id: roomId,
      },
    });
    const newArray = [...users.users, userId];
    const newRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        users: { set: newArray },
      },
    });
    await prisma.$disconnect();
    pusher.trigger(`room-${roomId}`, "user-connected", newArray);
    res.json({
      msg: `User with id:${userId} connected to room with id:  ${roomId}`,
      status: 200,
      room: newRoom,
    });
  });
};
export default handler;
