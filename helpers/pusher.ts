const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1186162",
  key: "cd9121d850b869bd73fa",
  secret: "992af5b349f0a719ec4a",
  cluster: "eu",
  useTLS: true,
});
export default pusher;
