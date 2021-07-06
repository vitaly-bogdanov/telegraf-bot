export const initSessionMiddleware = (ctx, next) => {
  ctx.session.messageIdList = [];
  ctx.props = {};
  return next();
};