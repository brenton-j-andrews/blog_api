let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
    date: { default: Date.now(), type: Date }
})

// Modify date value to desired format.
PostSchema.virtual('formatted_date')
.get(function() {
    console.log(this.date.toLocaleDateString('en-US'));
    return this.date.toLocaleString('en-US');
})

// Export model.
module.exports = mongoose.model('Post', PostSchema);