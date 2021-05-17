import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import pusher from "helpers/pusher";
import ApiHandler from "helpers/apiHandler";
const handler = async (req, res) => {
  const { roomId, url } = req.body;

  await ApiHandler(req, res, "POST", async () => {
    pusher.trigger(`room-${roomId}`, "seturl", url);

    await prisma.room.update({
      where: { id: roomId },
      data: { current_video: url },
    });

    res.json({ msg: `Url updated t${url}`, status: 200 });
  });
};
export default handler;
