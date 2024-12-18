///////////////////////////////
// Imports
///////////////////////////////

require('dotenv').config();
const path = require('path');
const express = require('express');

// middleware imports
const logRoutes = require('./middleware/logRoutes');


// controller imports
const postControllers = require('./controllers/PostControllers');
const app = express();

// middleware
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON

///////////////////////////////
// Post Routes
///////////////////////////////

app.get('/api/posts', postControllers.listPosts);
app.get('/api/posts/:idOrUsername', postControllers.findPostsByIdOrUsername);

app.post('/api/posts', postControllers.createPost);
app.delete('/api/posts/:id', postControllers.deletePost);

///////////////////////////////
// Fallback Route
///////////////////////////////

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendStatus(404);
});


///////////////////////////////
// Start Listening
///////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});