const knex = require('../db/knex');

class Post {
  static async list() {
    const query = `SELECT * FROM posts`;
    const result = await knex.raw(query);
    return result.rows;
  }

  static async findPostById(post_id) {
    const query = `SELECT * FROM posts WHERE id = ?`;
    const result = await knex.raw(query, [post_id]);
    const rawPostData = result.rows[0];
    return rawPostData || null;
  }

  static async findPostsByUsername(username) {
    const query = `SELECT * FROM posts WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawPostData = result.rows;
    return rawPostData || null;
  }

  static async create(username, content, img_url = null) {
    const query = `INSERT INTO posts (username, content, img_url)
      VALUES (?, ?, ?) RETURNING *`;
    const result = await knex.raw(query, [username, content, img_url]);
    const rawPostData = result.rows[0];
    return rawPostData;
  }

  static async delete(post_id) {
    const query = `DELETE FROM posts WHERE id = ? RETURNING *`;
    const result = await knex.raw(query, [post_id]);
    const rawPostData = result.rows[0];
    return rawPostData;

  }

  static async deleteAll() {
    return knex('posts').del();
  }
}

// const test = async () => {
//   console.log(await Post.delete(3));
//   console.log(await Post.list());
// }

// test();

module.exports = Post;