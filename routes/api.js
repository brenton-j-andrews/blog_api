var express = require('express');
var router = express.Router();

// Controller module import.
let postController = require("../controllers/postController");

// Display all posts on GET.
router.get('/posts', postController.home_page_get);

// Display single post details and comments on GET.
router.get('/post/:id', postController.article_page_get);

module.exports = router;

// api/post/63320a91595e80131ae053f2