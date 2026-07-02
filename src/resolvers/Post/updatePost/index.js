import { getAuth } from "firebase-admin/auth";
import { extractVideoInformation } from "../utils";

async function updatePost(parent, args, { models, requestor }, info) {
  const { postId, title, shortDescription, longDescription, videoSource } =
    args;

  let post;
  try {
    post = await models.models.Post.findById(postId).exec();
  } catch (e) {
    throw Error("Post not found.");
  }
  if (!post) {
    throw Error("Post not found.");
  }

  if (!post.authorId.equals(requestor._id)) {
    throw Error("Not authorized.");
  }

  if (title) {
    post.title = title;
  }

  if (shortDescription) {
    post.shortDescription = shortDescription;
  }

  if (longDescription) {
    post.longDescription = longDescription;
  }

  if (videoSource) {
    post.videoSource = videoSource;
  }

  if (videoSource) {
    let media = {};
    const videoInfo = extractVideoInformation(videoSource);
    if (videoInfo) {
      media.video = videoInfo;
    }
    post.media = media;
  }

  await post.save();
  return {
    ...post._doc,
    user: requestor,
  };
}

export { updatePost };
