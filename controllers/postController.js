// POST CONTROLLER 
let mongoose = require('mongoose');
let async = require('async');

let Post = require("../models/post");

// GET all posts for home page.
exports.get_posts = function(req, res, next) {

    Post.find()
    .populate('author')
    .exec( function (err, result) {
        if (err) {
            return next(err);
        }

        res.json(result);
    });
};