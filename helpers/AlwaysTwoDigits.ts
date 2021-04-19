const alwaysTwoDigits = (number) => {
  let string = number;
  if (number < 10 && number > -10) string = "0" + number;
  return string;
};
export default alwaysTwoDigits;
