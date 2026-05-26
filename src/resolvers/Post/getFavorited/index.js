/*
    Check to see if a given post is liked by a given user
*/

import mongoose from "mongoose";

async function getFavorited(
  { _id: postId, userId },
  args,
  { requestor, models, loaders },
  info,
) {
  try {
    if (!requestor) {
      return false;
    }
    console.log("getFavorited", postId, requestor._id);
    const like = await models.models.Likes.findOne({
      postId,
      userId: requestor._id,
    }).exec();
    console.log("like", like);

    return like != null;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export { getFavorited };
