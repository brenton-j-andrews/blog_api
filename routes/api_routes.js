var express = require('express');
var router = express.Router();

// Controller module import.
let postController = require("../controllers/postController");

// Display all posts on GET from home page.
router.get('/posts', postController.get_posts);

// Display single post on GET from link.
router.get('/post/:id', postController.get_single_post);


module.exports = router;