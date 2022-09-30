let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    author : {type: String, required: true},
    postRef : {type: Schema.Types.ObjectId, required: true, ref: 'Post'},
    commnet: {type: String, required: true},
    timestamp : {type: Date, required: true}
})

// Export model.
module.exports = mongoose.model('Comment', CommentSchema);