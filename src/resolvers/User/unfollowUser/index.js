async function unfollowUser(parent, { username }, { models, requestor }, info) {
  try {
    if (!requestor || !username) {
      return false;
    }

    const userToUnfollow = await models.models.User.findOne({ username })
      .lean()
      .exec();

    const result = await models.models.Follows.deleteOne({
      userId: requestor._id,
      followingUserId: userToUnfollow._id,
    });

    const resp = result?.deletedCount == 1;
    console.log({ result, resp });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export { unfollowUser };
