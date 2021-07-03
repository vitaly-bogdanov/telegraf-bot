export const initSessionMiddleware = (ctx, next) => {
  ctx.session.messageIdList = [];
  return next();
};