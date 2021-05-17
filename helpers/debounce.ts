function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      //@ts-ignore
      fn.apply(this, arguments);
    }, ms);
  };
}
export default debounce;
