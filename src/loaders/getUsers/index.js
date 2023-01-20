async function getUsers(userIds, models) {
  const users = await models.models.User.find({
    userId: { $in: userIds },
  }).exec();

  let userMap = {};
  for (const user of users) {
    userMap[user.userId] = user;
  }

  return userIds.map((key) => userMap[key]);
}

export { getUsers };
