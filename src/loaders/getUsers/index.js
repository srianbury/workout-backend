import mongoose from "mongoose";

/**
 * ids: [ObjectId]
 */
async function getUsers(ids, models) {
  const users = await models.models.User.find({
    _id: { $in: ids },
  }).exec();

  let userMap = {};
  for (const user of users) {
    userMap[user._id.toString()] = user;
  }

  return ids.map((id) => userMap[id.toString()]);
}

/**
 * ids [ObjectId("6a14e2fcb142cdce1c94229a"),  ObjectId("697540fdfeb77739d3f5f302")]
 * userMap = {
 *   '6a14e2fcb142cdce1c94229a': {}
 * }
 */

export { getUsers };
