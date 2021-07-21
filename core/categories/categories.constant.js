export const CATEGORIES_ACTION_NAME = 'categories';
import { CONTENTS_ACTION_NAME } from '../contents/index.js';

export const ACTION = { 
  BACK: 'menu', 
  ADD_CATEGORY: 'add-category', 
  DELETE: 'delete-category',
  VIEW: CONTENTS_ACTION_NAME,
  RENAME: 'rename-category'
};