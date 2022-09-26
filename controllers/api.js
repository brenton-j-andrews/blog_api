// WEBSITE CONTROLLER PAGE.

let mongoose = require('mongoose');

let User = require('../models/user');
let Post = require('../models/post');

// GET request for home page.
exports.home_page_get = function(req, res, next) {
    Post.find()
    .populate('author')
    .exec(function (err, output) {
        if (err) {
            return next(err);
        }

        console.log(output);
    });
}