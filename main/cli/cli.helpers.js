export const getPassword = () => {
  const passwordIndex = process.argv.indexOf('--password');
  if (passwordIndex === -1) throw Error('Не указан password');
  return process.argv[passwordIndex+1];
};

export const getTelegramId = () => {
  const idIndex = process.argv.indexOf('--id');
  if (idIndex === -1) throw Error('Не указан id, для которого нужно создать пароль');
  return +process.argv[idIndex+1];
}