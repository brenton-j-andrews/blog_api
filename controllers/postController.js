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

        // Used for returning data to form if errors in client.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ errors : errors.array() });
        }

        let post = new Post({
            title: req.body.title,
            author: req.body.author,
            text: req.body.text,
        });

        post.save(function(err, post) {
            if (err) {
                return res.json(err);
            }

            return res.json(post);
        })
    }
]

// POST - Update selected post
exports.update_post = [
    
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
        
        // Used for returning data to form if errors in client.
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(400).send({ errors : errors.array() });
        }

        Post.findByIdAndUpdate(req.params.id, 
            {
                "title" : req.body.title,
                "author" : req.body.author,
                "text" : req.body.text,
            },

            function(err, result) {
                if (err) { 
                    return res.json(err); 
                } else {
                    return res.json(result);
                }
            }
        )

    }
]

// DELETE - Delete selected post.
exports.delete_post = function(req, res, next) {

    Post.deleteOne({ _id : req.params.id },
        function(err, result) {
            if (err) {
                return res.json(err);
            }
            return res.json({ 
                message: "Post has been deleted." 
            })
        }
    )
}