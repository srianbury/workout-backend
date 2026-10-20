async function getIsFollowing(parent, args, { models, requestor }, info) {
  try {
    console.log(parent, args, requestor);

    if (!parent || !requestor) {
      return false;
    }

    console.log(parent._id, requestor._id);

    const follows = await models.models.Follows.findOne({
      userId: requestor._id,
      followingUserId: parent._id,
    })
      .lean()
      .exec();

    return !!follows;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export { getIsFollowing };
