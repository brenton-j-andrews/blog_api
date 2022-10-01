let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    author : {type: String, required: true},
    text: {type: String, required: true},
    date: { default: Date.now(), type: Date, required: true },
    postRef : {type: Schema.Types.ObjectId, required: true, ref: 'Post'},
})

// Modify date value to desired format.
CommentSchema.virtual('formatted_date')
.get(function() {
    console.log(this.date.toLocaleDateString('en-US'));
    return this.date.toLocaleString('en-US');
})

// Export model.
module.exports = mongoose.model('Comment', CommentSchema);