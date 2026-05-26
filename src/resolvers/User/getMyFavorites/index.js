async function getMyFavorites(parent, args, { models, requestor }, info) {
  if (!requestor) {
    return [];
  }

  const likes = await models.models.Likes.find({ userId: requestor._id })
    .sort({ createdAt: -1 })
    .lean();

  const postIds = likes.map((like) => like.postId);
  const posts = await models.models.Post.find({ _id: { $in: postIds } }).lean();

  const postMap = new Map(posts.map((post) => [post._id.toString(), post]));

  return likes.map((like) => ({
    post: postMap.get(like.postId.toString()),
    favoritedAt: like.createdAt,
  }));
}

export { getMyFavorites };
