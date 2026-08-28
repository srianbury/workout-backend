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
              title:
                "17-min HIIT Bodyweight Workout With Chris Hemsworth NEW!!",
              shortDescription:
                "17-min HIIT Bodyweight Workout With Chris Hemsworth",
              longDescription:
                "No equipment? No worries. Now you can work out anytime, anywhere with Chris Hemsworth and his trainer, Luke Zocchi. \n\nWe call this the ‘bodyweight cardio blast’ for good reason - it has the best body weight exercises to boost your home cardio workout. It’s an intense HIIT training session that builds strength and cardio fitness – plus a fair amount of grit. \n\nThis is a progressive cardio workout with only 5 moves, 2 sets, and 3 rounds. Each round you’ll get in as many reps as possible (ARAP). As you progress, Chris and Luke challenge you to kick it up a gear with an extra level of intensity. \n\nTrust us, you’ll feel the burn long after the workout ends. \n\nWARNING: This advanced bodyweight workout is high-intensity all the way through and it is not designed for fitness beginners. Listen to your body, know your limits, and rest when needed. \n\nLet us know how you go in the comments below. 👇\n\n_______\n\nWorkout breakdown \n0:00 Intro\n\n00:10 ROUND 1 (2 sets)\n00:14 Squats\n00:49 Mountain Climbers\n01:20 Reverse Lunges \n01:47 Walkouts\n02:13 Running on the Spot / Sit thrus\n02:43 Repeat for SET 2\n\n05:47 ROUND 2 (2 sets)\n05:52 Squat pulse\n06:17 Mountain Climbers\n06:50 Jump Lunges \n07:20 Walkouts + Push-up\n07:53 Running on the Spot / Sit thrus\n08:16 Repeat for SET 2\n\n11:19 ROUND 3 (2 sets)\n11:26 Squat Jump\n11:58 Oblique Twists\n12:23 Burpee + Push-up \n12:50 Bear Crawl\n13:28 Sit thrus\n13:55 Repeat for SET 2\n\n16:17 Workout = complete!\n\n_______\n\nWant a bigger challenge? Gain access to over 3000 more workouts, recipes and meditations with Chris Hemsworth’s expert team 👉 https://centr.fit/FREETRIAL\n\n SUBSCRIBE to find some of our favorite workouts, recipes and meditations every week 👉 https://centr.fit/Subscribe\n\nTry Chris Hemsworth's fitness app free for 7 days at Centr.com",
              videoSource: "https://www.youtube.com/watch?v=Hz93uPOekBQ",
              createdAt: "2023-01-20T04:26:24.817Z",
              media: {
                photo: null,
                video: {
                  id: "Hz93uPOekBQ",
                  source: "YOUTUBE",
                },
              },
              user: {
                id: "637c629893318bd8a5a7a571",
                email: "bsunbury29+testt123@gmail.com",
                initials: "J",
                username: "JohnnyTest123",
                picture: null,
              },
              favorites: 0,
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
          postId: "6a4c6ff5f38f268e17f854d0",
          title: "I updated the title!",
          shortDescription: "Creating this workout via cypress",
          longDescription:
            "1. Do\n2. Something\n3. Another workout more\n4. 500 pushups",
          videoSource: "2026-07-07T03:18:13.222Z",
          media: {
            video: {
              source: "YOUTUBE",
              id: "muxy-ByHmpA",
            },
            photo: null,
          },
          user: {
            id: "637c629893318bd8a5a7a571",
            email: "bsunbury29+testt123@gmail.com",
            initials: "J",
            username: "JohnnyTest123",
            picture: null,
          },
          favorites: 0,
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
