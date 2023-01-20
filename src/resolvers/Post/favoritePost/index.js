async function favoritePost(parent, args, context, info) {
  switch (args.operation) {
    case "LIKE":
      return await likePost(parent, args, context, info);
    case "UNLIKE":
      return await unlikePost(parent, args, context, info);
    default:
      return false;
  }
}

async function likePost(parent, { postId }, { models, requestor }, info) {
  if (!requestor) {
    return false;
  }

  // Update list of Post favoriters
  const filter = { postId };
  const postFavoritedBy = await models.models.PostFavoritedBy.findOne(filter);
  if (!postFavoritedBy) {
    const newPostFavoritedBy = new models.models.PostFavoritedBy({
      postId,
      favoritedBy: {
        [requestor.userId]: {},
      },
      favorites: 1,
    });

    await newPostFavoritedBy.save();
  } else {
    if (!postFavoritedBy.favoritedBy.has(requestor.userId)) {
      const update = {
        $set: { [`favoritedBy.${requestor.userId}`]: {} },
        $inc: { favorites: 1 },
      };
      const options = { upsert: true };
      await models.models.PostFavoritedBy.findOneAndUpdate(
        filter,
        update,
        options
      );
    }
  }

  // Update the list of posts liked by the user
  await models.models.UserFavorites.findOneAndUpdate(
    { userId: requestor._id },
    {
      $set: { [`favorites.${postId}`]: {} },
    },
    { upsert: true }
  );

  return true;
}

async function unlikePost(parent, { postId }, { models, requestor }, info) {
  const filter = { postId };
  const postFavoritedBy = await models.models.PostFavoritedBy.findOne(filter);
  if (postFavoritedBy && postFavoritedBy.favoritedBy.has(requestor.userId)) {
    const update = {
      $unset: { [`favoritedBy.${requestor.userId}`]: {} },
      $inc: { favorites: -1 },
    };
    const options = { upsert: true };
    await models.models.PostFavoritedBy.findOneAndUpdate(
      filter,
      update,
      options
    );
  }

  await models.models.UserFavorites.findOneAndUpdate(
    { userId: requestor._id },
    {
      $unset: { [`favorites.${postId}`]: {} },
    },
    { upsert: true }
  );

  return true;
}

export { favoritePost };
