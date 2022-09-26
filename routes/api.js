var express = require('express');
var router = express.Router();

// Controller module import.
let controller = require("../controllers/api");

/* GET home page. */
router.get('/', controller.home_page_get);

module.exports = router;
