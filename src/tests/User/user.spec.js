import { expect } from "chai";
import * as userAPI from "./userAPI";

describe("users", () => {
  describe("query", () => {
    it("returns a user when they exist", async () => {
      const expectedResult = {
        data: {
          getUserByUsername: {
            userId: "PCXwV8I0kUS7nqWNuivVybAcaHN2",
            email: "bsunbury29@gmail.com",
            initials: "b",
            username: "brian",
            picture:
              "https://yt3.googleusercontent.com/ytc/AL5GRJUHsXC3Id7gSqICSMSXP83FGp_G8uD1rAn2rm1tpg=s176-c-k-c0x00ffffff-no-rj",
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
