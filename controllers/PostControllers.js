const Post = require('../models/Post');
require('dotenv').config();

const { SECRET_AUTH_PASSWORD } = process.env;
const authorize = (password) => {
  return password === SECRET_AUTH_PASSWORD;
};

/* 
method: POST
endpoint: /api/posts?password=""
body: { username: String, content: String, img_url: ?String }
*/
exports.createPost = async (req, res) => {
  const { password } = req.query;
  if (!authorize(password)) res.status(403).send('Unauthorized: Incorrect Password')

  const { username, content, img_url } = req.body;

  const post = await Post.create(username, content, img_url);

  res.send(post);
};

/* 
method: GET
endpoint: /api/posts
body: None
*/
exports.listPosts = async (req, res) => {
  const users = await Post.list();
  res.send(users);
};

/* 
method: GET
endpoint: /api/posts/:idOrUsername
body: None
*/
exports.findPostsByIdOrUsername = async (req, res) => {
  const { idOrUsername } = req.params;
  let posts;
  if (isNaN(Number(idOrUsername))) {
    posts = await Post.findPostsByUsername(idOrUsername);
    if (!posts) return res.status(404).send(`Cannot find Posts by username ${idOrUsername}`);
  } else {
    posts = await Post.findPostById(idOrUsername);
    if (!posts) return res.status(404).send(`Cannot find Post with id ${idOrUsername}`);
  }

  res.send(posts);
};

/* 
method: DELETE
endpoint: /api/posts/:id?password=""
body: None
*/
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const { password } = req.query;
  if (!authorize(password)) return res.status(403).send('Unauthorized: Incorrect Password');

  const deletedPost = await Post.delete(id);
  if (!deletedPost) return res.status(404).send(`Cannot find Post with id ${id}`);
  res.send(`Deleted Post ${id} Successfully`);
}