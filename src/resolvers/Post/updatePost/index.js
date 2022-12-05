import { getAuth } from "firebase-admin/auth";
import { extractVideoInformation } from "../utils";

async function updatePost(parent, args, { models, firebaseApp }, info) {
  const {
    token,
    postId,
    title,
    shortDescription,
    longDescription,
    videoSource,
  } = args;

  let auth;
  try {
    auth = await getAuth(firebaseApp).verifyIdToken(token);
  } catch (e) {
    throw Error("Not authorized.");
  }
  if (!auth) {
    throw Error("Not authorized.");
  }

  const user = await models.models.User.findOne({ userId: auth.uid }).exec();
  if (!user) {
    throw Error("Not authorized.");
  }

  let post;
  try {
    post = await models.models.Post.findById(postId).exec();
  } catch (e) {
    throw Error("Post not found.");
  }
  if (!post) {
    throw Error("Post not found.");
  }

  if (post.userId != auth.uid) {
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
    user,
  };
}

export { updatePost };
