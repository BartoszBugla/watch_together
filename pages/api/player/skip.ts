import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import pusher from "helpers/pusher";
import ApiHandler from "helpers/apiHandler";
const handler = async (req, res) => {
  const { second, roomId } = req.body;
  await ApiHandler(req, res, "POST", async () => {
    pusher.trigger(`room-${roomId}`, "skip", second);
    await prisma.room.update({
      where: { id: roomId },
      data: { current_second: second },
    });
    await prisma.$disconnect();
    res.json({ msg: `Video skipped to ${second}`, status: 200 });
  });
};
export default handler;
