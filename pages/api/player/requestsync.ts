import type { NextApiRequest, NextApiResponse } from "next";
import pusher from "helpers/pusher";
import ApiHandler from "helpers/apiHandler";
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { roomId, to, from } = req.body;
  ApiHandler(req, res, "POST", async () => {
    pusher.trigger(`room-${roomId}`, "request-sync", { to, from });
    res.json({ msg: "Requsted for sync" });
  });
};
export default handler;
