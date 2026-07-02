import { getAuth } from "firebase-admin/auth";

async function signIn(parent, args, { req, requestor }, info) {
  try {
    if (!requestor || !req?.headers?.authorization) {
      throw new Error("ACCOUNT_NOT_FOUND");
    }

    return {
      ...requestor._doc,
      token: req.headers.authorization,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export { signIn };
