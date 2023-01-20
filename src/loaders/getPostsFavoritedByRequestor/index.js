async function getPostsFavoritedByRequestor(keys, models, requestor) {
  const usersFavorites = await models.models.UserFavorites.findOne({
    userId: requestor._id,
  });
  if (!usersFavorites) {
    return null;
  }

  const { favorites } = usersFavorites;
  if (!favorites) {
    return null;
  }

  return [favorites];
}

export { getPostsFavoritedByRequestor };
