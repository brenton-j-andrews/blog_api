// POST CONTROLLER 
let mongoose = require('mongoose');
let async = require('async');

let Post = require('../models/post');


// // GET all post data.
// exports.post_data_GET = function(req, res, next) {

//     async.parallel({
//         posts: function(callback) {
//             Post.find()
//             .populate('author')
//             .exec(callback);
//         },

//         comments: function(callback) {
//             Comment.find({})
//             .exec(callback);
//         }

//     },  function(err, result) {
//             if (err) { 
//                 return next(err)
//             }
//             res.json(result);
//      })
// }

// // POST -> Create new comment on post.
// exports.comment_data_POST = function(req, res, next) {
//     console.log("hmmm");
// }