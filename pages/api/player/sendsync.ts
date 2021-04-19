import type { NextApiRequest, NextApiResponse } from "next";
import pusher from "helpers/pusher";
import ApiHandler from "helpers/apiHandler";
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { roomId, seconds, to } = req.body;
  ApiHandler(req, res, "POST", async () => {
    pusher.trigger(`room-${roomId}`, "receive-sync", { seconds, to });
    res.json({ msg: "sending  sync" });
  });
};
export default handler;
