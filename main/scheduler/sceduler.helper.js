import dotenv from 'dotenv';

dotenv.config();

export const getTodaysNumberHelper = () => {
  process.env.TZ = process.env.SCHEDULER_TIME_ZONE;
  return new Date().getDay();
};

export const getRandomElemetFromArray = (array) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

export function randomIntFromInterval(min,max) {
  let rand = +min - 0.5 + Math.random() * (+max - +min + 1);
  return Math.round(rand) + 0;
};

export const getRandomIntFromIntervalHoursAdnMinutes= (value) => {
  let timeDiapasone = value.split('-');
  let firsTime = timeDiapasone[0].split(':');
  let firsTimeHours = firsTime[0];
  let firsTimeMinutes = firsTime[1];
  let lastTime = timeDiapasone[1].split(':');
  let lastTimeHours = lastTime[0];
  let lastTimeMinutes = lastTime[1];
  let randomHours = randomIntFromInterval(firsTimeHours, lastTimeHours);
  let randomMinutes = randomIntFromInterval(firsTimeMinutes, lastTimeMinutes);
  return { randomHours, randomMinutes };
};