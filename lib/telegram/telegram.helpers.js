export const sleepHelper = (ms) => {
  ms += new Date().getTime();
  while (new Date() < ms) { };
};