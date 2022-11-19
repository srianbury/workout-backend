async function getPosts(parent, args, { models }, info) {
  return await models.models.Post.find({}, null, { sort: { createdAt: -1 } });
}

export { getPosts };
