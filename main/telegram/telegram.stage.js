import { Scenes } from 'telegraf';

import { startScene } from '../../core/start/index.js';
import { menuScene } from '../../core/menu/index.js';
import { categoriesScene } from '../../core/categories/index.js';
import { addCategoryScene } from '../../core/addCategory/index.js';
import { mailingScene } from '../../core/mailing/index.js';
import { addManagerScene } from '../../core/addManager/index.js';
import { contentsScene } from '../../core/contents/index.js';
import { deleteCategoryScene } from '../../core/deleteCategory/index.js';
import { addContentDescriptionScene } from '../../core/addContentDescription/index.js';
import { addContentDataScene } from '../../core/addContentData/index.js';
import { deleteContentScene } from '../../core/deleteContent/index.js';
import { changeContentScene } from '../../core/changeContent/index.js';
import { editContentDescriptionScene } from '../../core/editContentDescription/index.js'
import { editContentDataScene } from '../../core/editContentData/index.js';
import { deleteManagerScene } from '../../core/deleteManager/index.js';
import { shedulesScene } from '../../core/schedules/index.js';
import { sheduleScene } from '../../core/schedule/index.js';
import { timeScene } from '../../core/time/index.js';
import { timeSetDiapasoneScene } from '../../core/timeSetDiapasone/index.js';

export const stage = new Scenes.Stage([
  startScene, menuScene, categoriesScene,
  addCategoryScene, mailingScene, addManagerScene,
  contentsScene, deleteCategoryScene, addContentDescriptionScene,
  addContentDataScene, deleteContentScene, changeContentScene,
  editContentDescriptionScene, editContentDataScene, deleteManagerScene,
  shedulesScene, sheduleScene, timeScene, timeSetDiapasoneScene
]);
