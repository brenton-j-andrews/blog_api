var express = require('express');
var router = express.Router();

// Controller module import.
let postController = require("../controllers/postController");
let commentController = require("../controllers/commentController");

// Display all posts on GET from home page.
router.get('/posts', postController.get_posts);

// Display single post on GET from link.
router.get('/post/:id', postController.get_single_post);

// Create new post on POST from '/create_post' page/
router.post('/post/create_post', postController.post_create_post);

// Update selected post on POST from 
router.post('/post/:id', postController.update_post);

// Delete post 
router.delete('/post/:id/delete', postController.delete_post);

// COMMENT ROUTES.

// Display all comments on specific post.
router.get('/post/:id/comments', commentController.get_comments);

module.exports = router;