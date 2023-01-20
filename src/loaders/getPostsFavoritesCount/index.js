async function getPostsFavoritesCount(postIds, models) {
  const postFavoritesMeta = await models.models.PostFavoritedBy.find({
    postId: { $in: postIds },
  }).exec();

  let postFavoritesMetaMap = {};
  for (const postMeta of postFavoritesMeta) {
    postFavoritesMetaMap[postMeta.postId] = postMeta;
  }

  return postIds.map((key) => postFavoritesMetaMap[key] || {});
}

export { getPostsFavoritesCount };
