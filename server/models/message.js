const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: {type: String, required: true},
    fromUser: [{type: Schema.Types.ObjectId, ref: "User"}],
    toUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Message", MessageSchema);