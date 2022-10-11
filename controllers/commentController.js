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
   
    body('author', "Author name is required")
    .trim()
    .isLength({ min: 1}),

    body('text', "Comment text is required")
    .trim()
    .isLength({ min: 1}),

    // Process data.
    (req, res, next) => {
        console.log(req.body);
        // Used for returning data to form if errors in client.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ errors : errors.array() });
        }

        let comment = new Comment({
            author: req.body.author,
            text: req.body.text,
            postRef: req.params.id
        });

        comment.save(function(err, comment) {
            if (err) {
                return res.json(err);
            }

            return res.json(comment);
        })
    }
]