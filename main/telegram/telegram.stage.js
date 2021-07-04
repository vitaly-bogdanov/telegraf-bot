import { Scenes } from 'telegraf';

import { startScene } from '../../core/start/index.js';
import { menuScene } from '../../core/menu/index.js';
import { categoriesScene } from '../../core/categories/index.js';
import { addCategoryScene } from '../../core/addCategory/index.js';
import { mailingScene } from '../../core/mailing/index.js';
import { addManagerScene } from '../../core/addManager/index.js';
import { contentsScene } from '../../core/contents/index.js';

export const stage = new Scenes.Stage([
  startScene, menuScene,
  categoriesScene, addCategoryScene,
  mailingScene, addManagerScene,
  contentsScene
]);