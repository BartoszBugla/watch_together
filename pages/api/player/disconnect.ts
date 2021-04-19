import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import pusher from "helpers/pusher";
import ApiHandler from "helpers/apiHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { roomId, userId } = req.body;
  await ApiHandler(req, res, "POST", async () => {
    const { users } = await prisma.room.findFirst({
      where: {
        id: roomId,
      },
    });
    const newArray = users.filter((user) => user != userId);

    const newRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        users: {
          set: newArray,
        },
      },
    });

    await prisma.$disconnect();
    pusher.trigger(`room-${roomId}`, "user-disconnected", newArray);
    res.json({
      msg: `User with id:${userId} disconnted from room with id:  ${roomId}`,
      status: 200,
      room: newRoom,
    });
  });
};
export default handler;
