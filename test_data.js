#! /usr/bin/env node

console.log("hmmm");

// TO EXECUTE, USE THE SCRIPT BELOW:
// node test_data "mongodb+srv://brenton-andrews:user1234@cluster0.cbcpcvl.mongodb.net/?retryWrites=true&w=majority";

let userArgs = process.argv.slice(2);


var async = require('async')

let mongoose = require('mongoose');
let mongoDB = userArgs[0];

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

var Post = require('./models/post')
var User =  require('./models/user');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let posts = [];
let users = [];

function userCreate(username, password, isAdmin, cb) {

    let user = new User({
        username,
        password,
        isAdmin
    })

    user.save(function(err) {

        if (err) {
            cb(err, null);
            return;
        }

        users.push(user);
        cb(null, user);
    }) 
}

function postCreate(author, title, postContent, timeStamp, cb) {

    let post = new Post({
        author: author,
        title: title,
        postContent: postContent,
        timestamp: timeStamp
    })

    post.save(function(err) {
        if (err) {
            cb(err, null);
            return;
        }

        posts.push(post);
        cb(null, post);
    }) 
}

function createUsers(cb) {

    async.series([
        function(callback) {
            userCreate("Brenton Andrews", "itsSecret", true, callback);
        },

        function(callback) {
            userCreate("Coconut", "bark", false, callback);
        }
    ], cb)
}

function createPosts(cb) {
    
    async.series([
        function(callback) {
            postCreate(users[0], 
                "My latest post!", 
                "This is a simple test post", 
                Date.now(),
                callback
                );
        },

        function(callback) {
            postCreate(users[0],
                "Another fantastic post",
                "This is fascinating!",
                Date.now(),
                callback
                )
        }
    ], cb)
}

async.series([
    createUsers,
    createPosts
])
