import { getAuth } from "firebase-admin/auth";

async function signIn(parent, { token }, { models, firebaseApp }, info) {
  try {
    // TODO: change this to use requestor context instead of the token arg
    const auth = await getAuth(firebaseApp).verifyIdToken(token);
    const user = await models.models.User.findOne({ userId: auth.uid }).exec();

    if (!user) {
      throw new Error("ACCOUNT_NOT_FOUND");
    }

    const result = {
      ...user._doc,
      token,
    };

    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { signIn };
