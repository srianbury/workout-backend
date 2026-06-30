import { getAuth } from "firebase-admin/auth";
import { extractVideoInformation } from "../utils";

async function createPost(
  parent,
  args,
  { models, firebaseApp, requestor },
  info,
) {
  try {
    const { title, shortDescription, longDescription, videoSource } = args;

    if (!requestor) {
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
      authorId: requestor._id,
      title,
      shortDescription,
      longDescription,
      videoSource,
      media,
    });

    await newPost.save();
    const result = {
      ...newPost._doc,
      user: requestor,
    };
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export { createPost };
