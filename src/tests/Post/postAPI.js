import axios from "axios";
import { TEST_API_URL } from "..";

async function getPostByPostId(variables) {
  return axios.post(TEST_API_URL, {
    query: `
    query($postId: ID!) {
        getPostByPostId(postId: $postId) {
            postId,
            title,
            shortDescription,
            longDescription,
            videoSource,
            createdAt,
            media {
                photo
                video {
                id
                source
                }
            },
            user {
                userId,
                email,
                initials,
                username,
                picture
            }
            favorites,
            favorited,
        }
      }
    `,
    variables,
  });
}

async function getPosts(variables) {
  return axios.post(TEST_API_URL, {
    query: `
      query {
        getPosts {
          postId
          title
          shortDescription
          longDescription
          videoSource
          createdAt
          media {
            photo
            video {
              source
              id
            }
          }
          user {
            userId
            email
            initials
            username
            picture
          }
          favorites
          favorited
        }
      }
    `,
    variables,
  });
}

export { getPostByPostId, getPosts };
