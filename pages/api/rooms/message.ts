import pusher from "helpers/pusher";
import apiHandler from "helpers/apiHandler";

const handler = async (req, res) => {
  const { roomId, userId, content } = req.body;
  await apiHandler(req, res, "POST", async () => {
    pusher.trigger(`room-${roomId}`, "message", {
      message: content,
      from: userId,
      type: "user",
      element: "chat",
    });
    res.json({ msg: "Message has been sent", status: 200 });
  });
};

export default handler;
