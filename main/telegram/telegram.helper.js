export const clearMessageIdListInSessionHelper = (ctx) => {
  ctx.session.messageIdList.forEach(msg => ctx.deleteMessage(msg));
  ctx.session.messageIdList = [];
};

export const saveMessageIdInSessionFromQueryHelper = (ctx) => {
  ctx.session.messageIdList.push(ctx.message.message_id);
};

export const saveMessageIdInSessionFromReplyHelper = async (ctx, messagePromise) => {
  const message = await messagePromise;
  ctx.session.messageIdList.push(message.message_id);
  return ctx;
};