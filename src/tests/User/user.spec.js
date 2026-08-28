import { expect } from "chai";
import * as userAPI from "./userAPI";

describe("users", () => {
  describe("query", () => {
    it("returns a user when they exist", async () => {
      const expectedResult = {
        data: {
          getUserByUsername: {
            id: "630d68d435f47dfc068f1343",
            username: "brian",
            initials: "b",
            email: "bsunbury29@gmail.com",
            picture: "https://graph.facebook.com/2119280251792980/picture",
          },
        },
      };

      const result = await userAPI.user({ username: "brian" });
      expect(result.data).to.eql(expectedResult);
    });

    it("returns null when a user does not exist", async () => {
      const expectedResult = {
        data: {
          getUserByUsername: null,
        },
      };

      const result = await userAPI.user({ username: "billy bob" });
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe("mutation", () => {
    describe("authenticate", () => {
      /*
        TODO
        The authentication function takes a token which comes from Firebase
        Unsure how to automate this here, but we can automate it on the frontend
      */
    });
  });
});
