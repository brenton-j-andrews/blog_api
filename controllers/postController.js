// POST CONTROLLER 
let mongoose = require('mongoose');
let async = require('async');
const { body, validationResult } = require('express-validator');

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

// GET single post for viewing.
exports.get_single_post = function(req, res, next) {
    Post.findById(req.params.id)
    .exec( function (err, result) {
        if (err) {
            return next(err);
        }

        res.json(result);
    })
}

// POST - Create post.
exports.post_create_post = [
    body('title', "Title is required")
    .trim()
    .isLength({ min: 1}),

    body('author', "Author name is required")
    .trim()
    .isLength({ min: 1}),

    body('text', "Post text is required")
    .trim()
    .isLength({ min: 1}),

    // Process data.
    (req, res, next) => {
        let persistant_data = req.body;
        console.log(persistant_data);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // console.log(errors);
            res.send("you got errors dude! Figure this out in a bit...");
        }

        let post = new Post({
            title: req.body.title,
            author: req.body.author,
            text: req.body.text,
            // date: req.body.date
        });

        post.save(function(err) {
            if (err) {
                return next(err);
            }

            res.redirect('/post/' + post._id);
        })
    }
]

// DELETE - Delete selected post.
exports.delete_post = function(req, res, next) {
    console.log(req.params.id);
    Post.deleteOne({ _id : req.params.id },
        function(err, result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/');
        }
    )
}