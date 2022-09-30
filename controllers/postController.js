// POST CONTROLLER 
let mongoose = require('mongoose');
let async = require('async');

let User = require('../models/user');
let Post = require('../models/post');
let Comment = require('../models/comments'); 

// GET all post data.
exports.post_data_get = function(req, res, next) {

    async.parallel({
        posts: function(callback) {
            Post.find()
            .populate('author')
            .exec(callback);
        },

        comments: function(callback) {
            Comment.find({})
            .exec(callback);
        }

    },  function(err, result) {
            console.log(err);
            if (err) { 
                return next(err)
            }
            res.json(result);
     })
}

    // Post.find()
    // .populate('author', 'username')

    // .exec(function (err, result) {
    //     if (err) {
    //         return next(err);
    //     }

    //     res.json(result);
    // });
