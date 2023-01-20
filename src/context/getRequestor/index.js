import { getAuth } from "firebase-admin/auth";

async function getRequestor(request, firebaseApp, models) {
  try {
    if (!request || !request.headers || !request.headers.authorization) {
      console.log("No request token found.");
      return null;
    }

    if (!firebaseApp) {
      console.log("No firebaseApp found.");
      return null;
    }

    if (!models || !models.models || !models.models.User) {
      console.log("No User model found.");
      return null;
    }

    let auth;
    try {
      auth = await getAuth(firebaseApp).verifyIdToken(
        request.headers.authorization
      );
    } catch (e) {
      console.log("Token authentication failed.");
      return null;
    }

    if (!auth) {
      console.log("Auth user not found.");
      return null;
    }

    const requestor = await models.models.User.findOne({
      userId: auth.uid,
    }).exec();
    return requestor;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export { getRequestor };
