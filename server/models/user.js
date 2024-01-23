const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    bio: {type: String, required: true},
    about: {type: String, required: true},
});

// UserSchema.virtual("url").get(function () {
//     return `/users/${this.id}`;
// });

module.exports = mongoose.model("User", UserSchema);