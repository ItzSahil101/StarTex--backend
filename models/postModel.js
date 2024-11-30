const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    owners: {
        type: String, ref: "user"
    },
    url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("posts", postSchema)