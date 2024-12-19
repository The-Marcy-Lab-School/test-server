const knex = require('../db/knex');

class Post {
  static async list() {
    try {
      const query = `SELECT * FROM posts`;
      const result = await knex.raw(query);
      return result.rows;
    } catch (err) {
      console.warn(`Error Getting Posts ${err.message}`);
      return null;
    }
  }

  static async findPostById(post_id) {
    try {
      const query = `SELECT * FROM posts WHERE id = ?`;
      const result = await knex.raw(query, [post_id]);
      const rawPostData = result.rows[0];
      return rawPostData || null;
    } catch (err) {
      console.warn(`Error Finding Post By Id ${err.message}`);
      return null;
    }
  }

  static async findPostsByUsername(username) {
    try {
      const query = `SELECT * FROM posts WHERE username = ?`;
      const result = await knex.raw(query, [username]);
      const rawPostData = result.rows;
      return rawPostData || null;
    } catch (err) {
      console.warn(`Error Finding Posts By Username ${err.message}`);
      return null;
    }
  }

  static async create(username, content, img_url = null) {
    try {
      const query = `INSERT INTO posts (username, content, img_url)
      VALUES (?, ?, ?) RETURNING *`;
      const result = await knex.raw(query, [username, content, img_url]);
      const rawPostData = result.rows[0];
      return rawPostData;
    } catch (err) {
      console.warn(`Error Creating Post ${err.message}`);
      return null;
    }
  }

  static async delete(post_id) {
    try {
      const query = `DELETE FROM posts WHERE id = ? RETURNING *`;
      const result = await knex.raw(query, [post_id]);
      const rawPostData = result.rows[0];
      return rawPostData;
    } catch (err) {
      console.warn(`Error Deleting Post ${err.message}`);
      return null;
    }
  }

  static async deleteAll() {
    try {
      return knex('posts').del();
    } catch (err) {
      console.warn(err);
      return null;
    }
  }
}

// const test = async () => {
//   console.log(await Post.delete(3));
//   console.log(await Post.list());
// }

// test();

module.exports = Post;