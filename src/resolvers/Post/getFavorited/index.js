/*
    Check to see if a given post is liked by a given user
*/
async function getFavorited(
  { _id: postId, userId },
  args,
  { requestor, models, loaders },
  info
) {
  try {
    if (!requestor || !requestor.userId) {
      return false;
    }
    const requestorsFavorites = await loaders.postsFavoritedByRequestor.load(
      requestor.userId
    );
    if (!requestorsFavorites) {
      return false;
    }

    if (requestorsFavorites.has(postId.toString())) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

export { getFavorited };
