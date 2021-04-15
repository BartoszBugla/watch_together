import Cookies from "cookies";
export default (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);
  let id = cookies.get("id");

  if (!id) {
    id = Math.floor(Math.random() * 100);
    cookies.set("id", id);
  }
  return id;
};
