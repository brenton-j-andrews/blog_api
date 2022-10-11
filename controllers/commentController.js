// COMMENT CONTROLLER 
let mongoose = require('mongoose');
let async = require('async');
const { body, validationResult } = require('express-validator');

let Comment = require("../models/comments");
const { json } = require('express/lib/response');


// GET all comments for specified post.
exports.get_comments = function(req, res, next) {
    Comment.find()
    .sort([["date", "descending"]])
    .exec(function (err, results) {
        if (err) {
            return next(err);
        }

        let comments = results.filter(comment => comment.postRef === req.params.id);
        return res.json(comments);
    })
}

// POST - new comment on post.
exports.create_comment = [

]