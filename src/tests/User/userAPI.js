import axios from "axios";
import { TEST_API_URL } from "..";

async function user(variables) {
  return axios.post(TEST_API_URL, {
    query: `
    query($username: String!) {
        getUserByUsername(username: $username) {
          userId
          username
          initials
          email
          picture
        }
      }
    `,
    variables,
  });
}

export { user };
