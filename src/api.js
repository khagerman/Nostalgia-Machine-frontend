import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.

 *
 */

class NostalgiaApi {
  //token stored here
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

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
  // comment routes
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
  static async deleteComment(id, commentid) {
    let res = await this.request(
      `posts/${id}/comments/${commentid}`,
      {},
      "delete"
    );
    return res.comment;
  }
  // like/unlike routes
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
  // featured posts
  static async getNewest() {
    let res = await this.request(`featured/new`, {}, "get");
    return res;
  }
  static async getMostLiked() {
    let res = await this.request(`featured/loved`, {}, "get");
    return res;
  }
}

export default NostalgiaApi;
