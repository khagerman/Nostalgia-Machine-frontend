import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class NostalgiaApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${NostalgiaApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  // todo missing getall routes???, data
  // Individual API routes
  ///user routes
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, "delete");
    return res;
  }
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }
  ///decade routes
  static async getDecades() {
    let res = await this.request(`decade/`, {}, "get");
    return res.decades;
  }
  static async getDecade(id) {
    let res = await this.request(`decade/${id}`, {}, "get");
    return res.decade;
  }
  ///post routes
  static async getPost(id) {
    let res = await this.request(`posts/${id}`);
    return res.post;
  }
  static async postPost(data) {
    let res = await this.request(`posts`, data, "post");
    return res.post;
  }
  static async patchPost(id, data) {
    let res = await this.request(`posts/${id}`, data, "patch");
    return res.post;
  }
  static async deletePost(id) {
    let res = await this.request(`posts/${id}`, {}, "delete");
    return res;
  }
  static async postComment(id, data) {
    let res = await this.request(`posts/${id}/comments`, data, "post");
    return res.comment;
  }
  static async patchComment(id, data, commentid) {
    let res = await this.request(
      `posts/${id}/comments/${commentid}`,
      data,
      "patch"
    );
    return res.comment;
  }
  static async deleteComment(id, data, commentid) {
    let res = await this.request(
      `posts/${id}/comments/${commentid}`,
      data,
      "patch"
    );
    return res.comment;
  }
  // static async postPost(data) {
  //   let res = await this.request(`posts/`, data, "post");
  //   return res.post;
  // }
  static async like(username, id) {
    await this.request(`users/${username}/favorite/${id}`, {}, "post");
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  static async unlike(username, id) {
    await this.request(`users/${username}/favorite/${id}`, {}, "delete");
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  static async userLikes(username) {
    let res = await this.request(`users/${username}/favorite`, {}, "get");
    return res;
  }
}

// for now, put token ("testuser" / "password" on class)
// NostalgiaApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNjM4NDg3MjY0fQ.hZ6aUMBcrVhFHtk9updl1XMVfk57JQoay4msPCVcS4M";

export default NostalgiaApi;
