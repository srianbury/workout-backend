import { assert, expect } from "chai";
import * as postAPI from "./postAPI";

describe("post", () => {
  describe("query", () => {
    describe("get post by id", () => {
      it("returns a post that exists", async () => {
        const expectedResult = {
          data: {
            getPostByPostId: {
              postId: "63ca17f057ea1c6def195195",
              title: "Johnny's Workout Plan",
              shortDescription: "Johnny's Workout Plan",
              longDescription: "Johnny's Workout Plan",
              videoSource: "",
              createdAt: "2023-01-20T04:26:24.817Z",
              media: {
                photo: null,
                video: {
                  id: null,
                  source: null,
                },
              },
              user: {
                userId: "KcIjRo9svZX4PchXPljnl4EUpMH3",
                email: "bsunbury29+testt123@gmail.com",
                initials: "J",
                username: "JohnnyTest123",
                picture:
                  "https://yt3.googleusercontent.com/ytc/AL5GRJUrL3LhtjFNhESFkd-Hdg3jlagyELrWAKJ34Lj_jA=s176-c-k-c0x00ffffff-no-rj",
              },
              favorites: 1,
              favorited: false,
            },
          },
        };

        const result = await postAPI.getPostByPostId({
          postId: "63ca17f057ea1c6def195195",
        });
        expect(result.data).to.eql(expectedResult);
      });

      it("returns null for a post that does not exist", async () => {
        const expectedResult = {
          data: {
            getPostByPostId: null,
          },
        };

        const result = await postAPI.getPostByPostId({
          postId: "imaginary-id",
        });
        expect(result.data).to.eql(expectedResult);
      });

      it("returns null for a post that doesnt exist and the postId would cause a CastError without the try catch", async () => {
        const expectedResult = {
          data: {
            getPostByPostId: null,
          },
        };

        const result = await postAPI.getPostByPostId({
          postId: "63ca17f057ea1c6def19519",
        });
        expect(result.data).to.eql(expectedResult);
      });
    });

    describe("get Posts", () => {
      it("list of posts should not be empty and shape should look good", async () => {
        const result = await postAPI.getPosts({});
        assert.isAbove(result.data.data.getPosts.length, 0);

        const sample = result.data.data.getPosts[0];
        const expectedShapeExample = {
          postId: "642bb3e05fef020963875bd2",
          title: "The 2nd Cypress Workout!",
          shortDescription: "Creating this workout via cypress",
          longDescription:
            "1. Do\n2. Something\n3. Another workout more\n4. 500 pushups",
          videoSource: "https://www.youtube.com/watch?v=BQqzfHQkREo",
          createdAt: "2023-04-04T05:21:36.523Z",
          media: {
            photo: null,
            video: {
              source: "YOUTUBE",
              id: "BQqzfHQkREo",
            },
          },
          user: {
            userId: "KcIjRo9svZX4PchXPljnl4EUpMH3",
            email: "bsunbury29+testt123@gmail.com",
            initials: "J",
            username: "JohnnyTest123",
            picture: null,
          },
          favorites: 2,
          favorited: false,
        };

        assert.hasAllDeepKeys(sample, expectedShapeExample);
      });
    });
  });

  describe("mutation", () => {
    // TODO
  });
});
