import { getAuth } from "firebase-admin/auth";

async function signUp(
  parent,
  args,
  { req, models, firebaseApp, requestor },
  info,
) {
  try {
    // ensure they don't already have an account
    if (requestor) {
      return {
        authenticationError: {
          type: "ACCOUNT_ALREADY_EXISTS_PLEASE_SIGN_IN",
          message: "An account was already found.  Please sign in.",
        },
      };
    }

    const token = req.headers.authorization;
    const auth = await getAuth(firebaseApp).verifyIdToken(token);

    const newUser = new models.models.User({
      authId: auth.uid,
      username: auth.uid, // temporary
      email: auth.email,
      picture: auth.picture,
    });

    await newUser.save();

    newUser.username = newUser._id.toString();

    await newUser.save();

    return {
      ...newUser._doc,
      token,
    };
  } catch (e) {
    console.log(e);
    return {
      authenticationError: {
        message: "An unexpected error occurred.",
      },
    };
  }
}

export { signUp };
