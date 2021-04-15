const Pusher = require("pusher");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const pusher = new Pusher({
  appId: "1186162",
  key: "cd9121d850b869bd73fa",
  secret: "992af5b349f0a719ec4a",
  cluster: "eu",
  useTLS: true,
});
const handler = async (req, res) => {
  console.log(req.body.id);
  pusher.trigger(`room-${req.body.id}`, "seturl", req.body.url);
  await prisma.room.update({
    where: { id: req.body.id },
    data: { current_video: req.body.url },
  });
  res.json("Url updated");
};
export default handler;
