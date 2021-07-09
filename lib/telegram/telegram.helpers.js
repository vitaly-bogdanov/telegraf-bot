export const sleepHelper = (ms) => {
  ms += new Date().getTime();
  while (new Date() < ms) { };
};


export const getRandomElemetFromArray = (array) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};
