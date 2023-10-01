async function getMyFavorites(parent, args, { models, requestor }, info) {
  if (!requestor) {
    return [];
  }
  const userIdFilter = { userId: requestor._id };
  const userFavorites = await models.models.UserFavorites.findOne(userIdFilter);
  const favorites = userFavorites.favorites;
  const findManyFilter = {
    _id: {
      $in: [...favorites.keys()],
    },
  };
  const favoritedPosts = await models.models.Post.find(findManyFilter).exec();

  return favoritedPosts
    .map((post) => ({
      post,
      favoritedAt: favorites.get(post._id.toString()).favoritedAt,
    }))
    .sort((a, b) =>
      a.favoritedAt > b.favoritedAt ? -1 : a.favoritedAt < b.favoritedAt ? 1 : 0
    );
}

export { getMyFavorites };
