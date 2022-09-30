var express = require('express');
var router = express.Router();

// Controller module import.
let postController = require("../controllers/postController");

// Fetch all post data.
router.get('/posts', postController.post_data_get);

module.exports = router;