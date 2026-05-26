import { getAuth } from "firebase-admin/auth";
import { extractVideoInformation } from "../utils";

async function createPost(parent, args, { models, firebaseApp }, info) {
  try {
    const { token, title, shortDescription, longDescription, videoSource } =
      args;
    const auth = await getAuth(firebaseApp).verifyIdToken(token);
    const user = await models.models.User.findOne({ userId: auth.uid }).exec();

    if (!user) {
      // TODO: FINISH
      return {
        authenticationError: {
          type: "NOT_LOGGED_IN_EXCEPTION",
          message: "Please sign in to create a post.",
        },
      };
    }

    let media = {};
    const videoInfo = extractVideoInformation(videoSource);
    if (videoInfo) {
      media.video = videoInfo;
    }

    const newPost = new models.models.Post({
      userId: auth.uid,
      title,
      shortDescription,
      longDescription,
      videoSource,
      media,
    });

    await newPost.save();
    const result = {
      ...newPost._doc,
      user,
    };
    return result;
  } catch (e) {
    return null;
  }
}

export { createPost };
