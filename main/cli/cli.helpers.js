export const getPassword = () => {
  const passwordIndex = process.argv.indexOf('password:');
  if (passwordIndex === -1) throw Error('Не указан password');
  return process.argv[passwordIndex+1];
};

export const getTelegramId = () => {
  const idIndex = process.argv.indexOf('id:');
  if (idIndex === -1) throw Error('Не указан id, для которого нужно создать пароль');
  return +process.argv[idIndex+1];
}

export const getH = () => {
  const hIndex = process.argv.indexOf('h:');
  if (hIndex === -1) throw Error('Не указаны часы');
  return process.argv[hIndex+1];
}

export const getM = () => {
  const mIndex = process.argv.indexOf('m:');
  if (mIndex === -1) throw Error('Не указаны минуты');
  return process.argv[mIndex+1];
}