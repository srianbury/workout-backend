async function getPostsFavoritesCount(
  { _id: postId },
  args,
  { loaders },
  info
) {
  try {
    const favoriteCounts = await loaders.postsFavoritesCounts.load(postId);
    if (!favoriteCounts) {
      return 0;
    }

    const { favorites } = favoriteCounts;
    if (favorites === null || favorites === undefined) {
      return 0;
    }
    return favorites;
  } catch (e) {
    return 0;
  }
}

export { getPostsFavoritesCount };
