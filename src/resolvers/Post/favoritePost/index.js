import mongoose from "mongoose";

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

async function likePost(parent, args, { models, requestor }, info) {
  const postId = new mongoose.Types.ObjectId(args.postId);
  console.log("like", postId, requestor);
  if (!requestor) {
    return false;
  }

  const newLike = new models.models.Likes({
    postId,
    userId: requestor._id,
  });

  console.log("new likes", newLike);

  const result = await newLike.save();
  console.log("like result", result);

  if (result._id) {
    await models.models.Post.updateOne(
      { _id: postId },
      { $inc: { likeCount: 1 } },
    );
  }

  return true;
}

async function unlikePost(parent, args, { models, requestor }, info) {
  console.log("unlike");
  const postId = new mongoose.Types.ObjectId(args.postId);
  console.log("postId", postId);
  const deleteOneResult = await models.models.Likes.deleteOne({
    postId,
    userId: requestor._id,
  });
  if (deleteOneResult.deletedCount > 0) {
    await models.models.Post.updateOne(
      { _id: postId },
      { $inc: { likeCount: -1 } },
    );
  }
  return true;
}

export { favoritePost };
