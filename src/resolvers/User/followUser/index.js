async function followUser(parent, { username }, { models, requestor }, info) {
  try {
    if (!requestor || !username) {
      return false;
    }

    const userToFollow = await models.models.User.findOne({ username })
      .lean()
      .exec();

    const newFollowing = new models.models.Follows({
      userId: requestor._id,
      followingUserId: userToFollow._id,
    });

    await newFollowing.save();

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export { followUser };
