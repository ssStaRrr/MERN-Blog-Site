const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    tag: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("Post",postSchema);