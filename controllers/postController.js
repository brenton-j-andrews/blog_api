// POST CONTROLLER 

let mongoose = require('mongoose');

let User = require('../models/user');
let Post = require('../models/post');

// GET request for home page.
exports.home_page_get = function(req, res, next) {

    Post.find()
    .populate('author', 'username')

    .exec(function (err, result) {
        if (err) {
            return next(err);
        }

        res.json(result);
    });
}

// GET request for single article page.
exports.article_page_get = function (req, res, next) {
    Post.findById( req.params.id )
    .populate('author', 'username')

    .exec(function (err, result) {
        if (err) {
            return next(err);
        }

        res.json(result);
    });
}