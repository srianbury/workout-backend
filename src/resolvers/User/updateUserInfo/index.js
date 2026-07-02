import { getAuth } from "firebase-admin/auth";

async function updateUserInfo(
  parent,
  { userInfo },
  { req, models, requestor },
  info,
) {
  try {
    if (!requestor) {
      // TODO: add more logic here to say why it failed
      return {
        success: false,
        message: "Could not verify your account.",
      };
    }

    // get a fresh copy of the user
    const user = await models.models.User.findOne({ _id: requestor._id });

    if (userInfo.username) {
      user.username = userInfo.username;
    }

    await user.save();
    return {
      success: true,
      user: {
        accessToken: req.headers.authorization, // we're just returning the access token b/c we're going to reauth on the client side to prevent
        // holding the user state in multiple places
      },
    };
  } catch (e) {
    // add handler to return a special message in the username is already taken
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}

export { updateUserInfo };
