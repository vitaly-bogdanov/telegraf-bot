import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from './bcrypt.constant.js';

export const getHashHelper = (value) => bcrypt.hashSync(password, SALT_ROUNDS);
export const isHashComparedHelper = (value, hashValue) => bcrypt.compareSync(value, hashValue);