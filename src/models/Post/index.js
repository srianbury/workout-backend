import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: String,
    title: String,
    shortDescription: String,
    longDescription: String,
    videoSource: String,
    likeCount: {
      type: Number,
      deafult: 0,
      min: 0,
    },
    media: {
      video: {
        source: String,
        id: String,
      },
      photo: String,
    },
  },
  { timestamps: true },
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export { Post };

/*

Example:

{
	_id: ObjectId("6382608c4e99402b3352ead2"),
	userId: 'PCXwV8I0kUS7nqWNuivVybAcaHN2',
	title: "Not Chris Hemsworth's Workout Explained By His Personal Trainer | Train Like a Celebrity | Men's Health",
	shortDescription: "Chris Hemsworth's full body workout",
	longDescription: 'Warm Up\n' +
	  '10 rounds each - 20s On / 10s Off\n' +
	  '1. Bear Crawl\n' +
	  '2. Bodyweight Squat\n' +
	  '\n' +
	  'The Workout\n' +
	  '8 Weighted Exercises for 8 Reps & 3 Core Exercises (Repeat Circuit 3 Times)\n' +
	  '1. Weighted Burpee\n' +
	  '2. Curl & Press\n' +
	  '3. Goblet Squat\n' +
	  '4. Standing Tricep Extension\n' +
	  '5. Reverse Lunge Curl\n' +
	  '6. Lat Raise, Front Raise, Upright Row\n' +
	  '7,8,9. Plank Punch Out, Plank Pulse, Plank Pike',
	media: { video: { source: 'YOUTUBE', id: 'Kuv0xThzxrU' } },
	likeCount: 1,
	createdAt: ISODate("2022-11-26T18:53:00.749Z"),
	updatedAt: ISODate("2022-12-02T05:31:57.331Z"),
	__v: 0,
	videoSource: 'https://www.youtube.com/watch?v=Kuv0xThzxrU'
}

*/
