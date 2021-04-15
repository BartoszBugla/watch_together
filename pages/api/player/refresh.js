const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1186162",
  key: "cd9121d850b869bd73fa",
  secret: "992af5b349f0a719ec4a",
  cluster: "eu",
  useTLS: true,
});
export default function (req, res) {
  try {
    pusher.trigger("main", "stop", false);
    res.json("es");
  } catch (error) {
    console.log(error);
  }
  //   pusher.trigger("main", "play", req.data);
}
