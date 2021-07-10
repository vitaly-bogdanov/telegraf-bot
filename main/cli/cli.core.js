import { getPassword, getTelegramId } from './cli.helpers.js';
import { cliService } from './cli.service.js';
import { COMMAND } from './cli.constant.js';

export const cliCore = async () => {
  (async () => {
    switch (process.argv[2]) {
      case COMMAND.SET_ADMIN_ROLE:
        const password = getPassword();
        const telegramId = getTelegramId();
        await cliService.setAdminRole(telegramId, password);
        break;
        
      //...
      case COMMAND.HELP:
        console.log(`yarn ${COMMAND.SET_ADMIN_ROLE} --id <your-id> --password <your-password> - зарегистрировать админ аккаунт`);
        break;
      default:
        throw Error('Command error')
    }
  })()
    .catch(e => {
      throw e;
    }).finally(async () => {
      await cliService.prismaService.$disconnect();
    });
};
