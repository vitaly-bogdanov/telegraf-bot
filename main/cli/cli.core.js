import fs from 'fs';
import dotenv from 'dotenv';

import { getPassword, getTelegramId, getH, getM } from './cli.helpers.js';
import { cliService } from './cli.service.js';
import { COMMAND } from './cli.constant.js';

dotenv.config();

export const cliCore = async () => {
  (async () => {
    switch (process.argv[2]) {
      case COMMAND.SET_ADMIN_ROLE:
        const password = getPassword();
        const telegramId = getTelegramId();
        await cliService.setAdminRole(telegramId, password);
        break;

      case COMMAND.SET_SCHEDULER_TIME:
        const h = getH();
        const m = getM();
        const config = JSON.parse(fs.readFileSync(`./main/cli/cli.config.json`, 'utf-8'))
        config['init-time'] = `${h}:${m}`;
        fs.writeFileSync(`./main/cli/cli.config.json`, JSON.stringify(config));
        break;
      //...
      case COMMAND.HELP:
        console.log(`npm run ${COMMAND.SET_ADMIN_ROLE} id: <your-id> password: <your-password> - зарегистрировать админ аккаунт`);
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
