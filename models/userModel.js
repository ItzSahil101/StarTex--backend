const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    posts: [
        {type: mongoose.Schema.Types.ObjectId, ref: "user"}
    ]
})

module.exports = mongoose.model("user", userSchema)