/**
 * 
 * @param {string} diapasoneCandidate - 00:25-23:34, 10:25-13:34 ...
 */
export const diapasoneValidate = diapasoneCandidate => {
  const reg = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$');
  return !!(diapasoneCandidate.match(reg));
};