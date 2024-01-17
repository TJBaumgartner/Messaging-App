const User = require('../models/user')
const asyncHandler = require("express-async-handler");
const Message = require('../models/message')

exports.message = asyncHandler(async (req,res) => {
    const user = await User.findOne({_id: req.params.id})
    if(user == null){
        return res.sendStatus(400).json('No users found')
    }
    res.json(user)
})
exports.messageSend = asyncHandler(async (req,res) => {
    // const [recipient, sender] = await User.find([
    //     {_id: req.body.recipient},
    //     {_id: req.body.sender},
    // ])
    // console.log(recipient)
    // console.log(sender)
    const [recipient, sender] = await Promise.all([
        User.findOne({_id: req.body.recipient}),
        User.findOne({_id: req.body.sender})
    ])
    if(recipient == null || sender == null){
        res.sendStatus(403).json('Message Failed to Send')
    }
    const message = new Message({
        message: req.body.message,
        fromUser: req.body.recipient,
        toUser: req.body.sender
    })
    await message.save()
    res.status(200).json('Message Sent')
})